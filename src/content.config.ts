import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const stripIndex = ({ entry }: { entry: string }) => entry.replace(/\/index\.md$/, '')

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog', generateId: stripIndex }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    repoURL: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects', generateId: stripIndex }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    repoURL: z.string().optional(),
    demoURL: z.string().optional(),
  }),
})

export const collections = { blog, projects }
