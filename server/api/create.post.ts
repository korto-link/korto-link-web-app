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

const secretKey = useRuntimeConfig().turnstile.secretKey
const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const verifyTurnstileToken = async (token: string): Promise<{success: boolean}> => {
  return await $fetch(endpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
}

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV === 'production') {
        try {
            const body = await readBody<{
                url: string,
                captcha: string
            }>(event)

            if (!(await verifyTurnstileToken(body.captcha)).success) {
                setResponseStatus(event, 422)
                return {
                    message: 'Invalid captcha'
                }
            }

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
            event.context.sentry.captureException(exception)

            setResponseStatus(event, 500)
            return {
                message: 'Something wrong happened'
            }
        }
    } else {
        await wait(1000)
        return {
            url: `http://${getRequestHost(event)}/l/${nanoid()}`
        }
    }
})