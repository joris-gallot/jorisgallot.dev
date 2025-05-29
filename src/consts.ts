import type { Metadata, Site, Socials } from '@types'

export const SITE: Site = {
  year: 2025,
  name: 'Joris Gallot',
  email: 'joris.gallot18@gmail.com',
  numPostsOnHomePage: 3,
  numWorksOnHomePage: 1,
  numProjectsOnHomePage: 3,
}

export const HOME: Metadata = {
  description: 'Joris \s personal website, showcasing my work, blog, and projects.',
}

export const BLOG: Metadata = {
  title: 'Blog',
  description: 'A collection of articles on topics I am passionate about.',
}

export const WORK: Metadata = {
  title: 'Work',
  description: 'Where I have worked and what I have done.',
}

export const PROJECTS: Metadata = {
  title: 'Projects',
  description: 'A collection of my projects, with links to repositories and demos.',
}

export const SOCIALS: Socials = [
  {
    name: 'github',
    href: 'https://github.com/joris-gallot',
  },
]
