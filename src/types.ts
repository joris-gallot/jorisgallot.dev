export interface Site {
  year: number
  name: string
  email: string
  numPostsOnHomePage: number
  numWorksOnHomePage: number
  numProjectsOnHomePage: number
}

export interface Metadata {
  title?: string
  description: string
}

export type Socials = {
  name: string
  href: string
}[]
