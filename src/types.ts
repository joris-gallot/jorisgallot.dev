export interface Site {
  name: string
  title: string
  description: string
  email: string
  availability: string
}

export interface Metadata {
  title: string
  description: string
}

export type Socials = {
  name: string
  href: string
}[]

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  key: string
  name: string
  tagline: string
  href: string
  repoURL?: string
  demoURL?: string
  specs: ProductSpec[]
}
