import { D1Database } from '@cloudflare/workers-types'
import {nanoid} from 'nanoid/non-secure'
import { CreateLinkBody, FindLinkBody, Link } from '../../types/link'
import { wait } from '../../utils'

async function createLink(link: CreateLinkBody, db: D1Database) {
    await db.prepare("INSERT INTO links VALUES(?,?)").bind(nanoid(), link.url).run()
}

async function findLink(link: FindLinkBody, db: D1Database) {
    const statement = db.prepare("SELECT id FROM links WHERE url = ?").bind(link.url)

    return await statement.first<Link>()
}

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV === 'production') {
        try {
            const body = await readBody<{
                url: string
            }>(event)
            const { cloudflare } = event.context
    
            const DB: D1Database = cloudflare.env.DB
            const link = await findLink(body, DB)
    
            if (link) {
                return {
                    url: `https://${getRequestHost(event)}/l/${link.id}`
                }
            } else {
                await createLink(body, DB)
                const link = await findLink(body, DB)
                
                return {
                    url: `https://${getRequestHost(event)}/l/${link.id}`
                }
            }
        } catch (exception) {
            return exception
        }
    } else {
        await wait(1000)
        return {
            url: `http://${getRequestHost(event)}/l/${nanoid()}`
        }
    }
})