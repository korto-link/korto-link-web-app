export type Link = {
    id: string
    url: string
}

export type CreateLinkBody = Omit<Link, "id">
export type FindLinkBody = Omit<Link, "id">
export type FindUrlBody = Omit<Link, "url">