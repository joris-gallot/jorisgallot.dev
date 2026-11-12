import type { Metadata, Product, Site, Socials } from '@types'

export const SITE: Site = {
  name: 'Joris Gallot',
  title: 'Joris Gallot · Software engineer',
  description: 'Independent software engineer building apps and open source projects. Creator of Reviu, Kinora, Glanou and Skrib. Available for freelance work.',
  email: 'hi@jorisgallot.dev',
  availability: 'Available for freelance work',
}

export const UMAMI = {
  src: 'https://sonar.jorisgallot.dev/script.js',
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
    tagline: 'The review app for code your agent writes. Watch sessions, review every diff, send comments back, then ship with real Git.',
    href: 'https://reviu.dev',
    repoURL: 'https://github.com/reviu-dev/reviu',
    specs: [
      { label: 'Stack', value: 'Rust · GPUI' },
      { label: 'Platform', value: 'macOS · Linux · Windows' },
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
  {
    key: 'glanou',
    name: 'Glanou',
    tagline: 'A daily general-knowledge app in French. A few new questions a day, short explanations, and spaced repetition so you remember.',
    href: 'https://glanou.com',
    specs: [
      { label: 'Stack', value: 'TypeScript · Vue · Swift' },
      { label: 'Platform', value: 'Web · iOS' },
      { label: 'Model', value: 'Free + Plus' },
    ],
  },
  {
    key: 'skrib',
    name: 'Skrib',
    tagline: 'A macOS language tutor. Select any text, hit a shortcut, and Skrib corrects it in your notch and tells you why, so you learn as you write.',
    href: 'https://skrib.app',
    specs: [
      { label: 'Stack', value: 'Swift · SwiftUI' },
      { label: 'Platform', value: 'macOS' },
      { label: 'Model', value: 'One-time' },
    ],
  },
]

export const SOCIALS: Socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/joris-gallot',
  },
]
