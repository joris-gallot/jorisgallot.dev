import type { Metadata, Product, Site, Socials } from '@types'

export const SITE: Site = {
  name: 'Joris Gallot',
  email: 'joris.gallot18@gmail.com',
  numPostsOnHomePage: 3,
  numProjectsOnHomePage: 3,
}

export const HOME = {
  title: 'Home',
  description: 'Joris\'s personal website, showcasing his products, open-source projects, and articles.',
} as const satisfies Metadata

export const BLOG = {
  title: 'Blog',
  description: 'A collection of articles on topics I am passionate about.',
} as const satisfies Metadata

export const PROJECTS = {
  title: 'Projects',
  description: 'A collection of my projects, with links to repositories and demos.',
} as const satisfies Metadata

export const PRODUCTS: Product[] = [
  {
    name: 'Reviu',
    tagline: 'Keyboard-first desktop Git client. Review your AI agent\'s code before you push, then take it to merge.',
    href: 'https://reviu.dev',
    tags: ['Rust', 'GPUI', 'Git'],
    note: 'Free + Pro',
  },
  {
    name: 'Kinora',
    tagline: 'A dashboard for your Playwright tests across projects and over time, with an embedded trace viewer.',
    href: 'https://kinora.dev',
    tags: ['TypeScript', 'Playwright'],
    note: 'Cloud + live demo',
  },
]

export const SOCIALS: Socials = [
  {
    name: 'github',
    href: 'https://github.com/joris-gallot',
  },
]
