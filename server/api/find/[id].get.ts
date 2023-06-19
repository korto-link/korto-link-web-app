import { D1Database } from '@cloudflare/workers-types'
import { FindUrlBody, Link } from '../../../types/link'
import { wait } from '../../../utils'

async function findLink(link: FindUrlBody, db: D1Database) {
    const statement = db.prepare("SELECT url FROM links WHERE id = ?").bind(link.id)

    return await statement.first<Link>()
}

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV === 'production') {
        try {
            const body = event.context.params as FindUrlBody
            const { cloudflare } = event.context
    
            const DB: D1Database = cloudflare.env.DB
            const link = await findLink(body, DB)
    
            if (link) {
                return {
                    url: link.url
                }
            } else {
                setResponseStatus(event, 404)

                return {
                    url: null,
                    message: 'Invalid ID'
                }
            }
        } catch (exception) {
            event.context.sentry.captureException(exception)

            setResponseStatus(event, 500)
            return {
                message: 'Something wrong happened'
            }
        }
    } else {
        await wait(1000)

        // SUCCESS
        return {
            url: `http://localhost:3000`
        }

        // NOT FOUND
        // setResponseStatus(event, 404)

        // return {
        //     url: null,
        //     message: 'Invalid ID'
        // }
    }
})