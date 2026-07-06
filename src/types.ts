export interface Site {
  name: string
  email: string
  numPostsOnHomePage: number
  numProjectsOnHomePage: number
}

export interface Metadata {
  title: string
  description: string
}

export type Socials = {
  name: string
  href: string
}[]

export interface Product {
  key: string
  name: string
  tagline: string
  href: string
  repoURL: string
  demoURL?: string
  tags: string[]
  note?: string
}
