import type { Metadata, Site, Socials } from '@types'

export const SITE: Site = {
  name: 'Joris Gallot',
  email: 'joris.gallot18@gmail.com',
  numPostsOnHomePage: 3,
  numProjectsOnHomePage: 3,
}

export const HOME = {
  title: 'Home',
  description: 'Joris \s personal website, showcasing my projects and articles.',
} as const satisfies Metadata

export const BLOG = {
  title: 'Blog',
  description: 'A collection of articles on topics I am passionate about.',
} as const satisfies Metadata

export const PROJECTS = {
  title: 'Projects',
  description: 'A collection of my projects, with links to repositories and demos.',
} as const satisfies Metadata

export const SOCIALS: Socials = [
  {
    name: 'github',
    href: 'https://github.com/joris-gallot',
  },
]
