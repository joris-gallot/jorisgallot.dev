import type { Metadata, Product, Site, Socials } from '@types'

export const SITE: Site = {
  name: 'Joris Gallot',
  title: 'Joris Gallot · Software engineer',
  description: 'Independent software engineer building developer tools and SaaS products. Creator of Reviu and Kinora. Available for freelance work in TypeScript, Vue and Rust.',
  email: 'hi@jorisgallot.dev',
  availability: 'Available for freelance work',
}

export const UMAMI = {
  src: 'https://analytics.jorisgallot.dev/j.js',
  websiteId: '1e174065-2889-4ddd-a3ab-17c88bdbefa4',
}

export const BLOG = {
  title: 'Writing',
  description: 'Notes on building developer tools, TypeScript and Rust.',
} as const satisfies Metadata

export const PROJECTS = {
  title: 'Open source',
  description: 'Open-source projects by Joris Gallot: developer tooling in TypeScript and Rust.',
} as const satisfies Metadata

export const PRODUCTS: Product[] = [
  {
    key: 'reviu',
    name: 'Reviu',
    tagline: 'Keyboard-first desktop Git client. Review your AI agent\'s code before you push, then take it to merge.',
    href: 'https://reviu.dev',
    repoURL: 'https://github.com/reviu-dev/reviu',
    specs: [
      { label: 'Stack', value: 'Rust · GPUI' },
      { label: 'Platform', value: 'macOS' },
      { label: 'Model', value: 'Free + Pro' },
    ],
  },
  {
    key: 'kinora',
    name: 'Kinora',
    tagline: 'A dashboard for your Playwright tests across projects and over time, with an embedded trace viewer.',
    href: 'https://kinora.dev',
    repoURL: 'https://github.com/Kinora-dev/kinora',
    demoURL: 'https://demo.kinora.dev',
    specs: [
      { label: 'Stack', value: 'TypeScript · Playwright' },
      { label: 'Platform', value: 'Web' },
      { label: 'Model', value: 'Cloud' },
    ],
  },
]

export const SOCIALS: Socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/joris-gallot',
  },
]
