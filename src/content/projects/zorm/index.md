---
title: "Zorm"
description: "A minimalist, type-safe ORM powered by Zod"
date: "Jun 1 2025"
repoURL: "https://github.com/joris-gallot/zorm"
---

## Project Overview

**Zorm** is a minimalist ORM powered by Zod that allows you to define and manipulate entities in a simple and type-safe way. When working with databases in TypeScript applications, ensuring type safety across your data layer can be challenging—especially when dealing with complex relationships.

Zorm solves these problems with a **schema-first approach**:

1. **Type-safe schema definition** - Define your entities using Zod schemas
2. **Intuitive relation management** - Support for one-to-one, one-to-many, and many-to-many relationships 
3. **Fully typed query builder** - Autocomplete and type inference for entities and their relationships

## Key Features

Zorm offers a powerful set of features while maintaining a minimal API:

```typescript
import { defineEntity, defineQueryBuilder } from '@zorm-ts/core'
import { z } from 'zod'

// Define your entities with Zod schemas
const User = defineEntity(
  'user',
  z.object({
    id: z.number(),
    email: z.string().email(),
    age: z.number(),
    isAdmin: z.boolean()
  })
)

const Post = defineEntity(
  'post',
  z.object({
    id: z.number(),
    title: z.string(),
    userId: z.number(),
  })
)

// Create relationships between entities
const { user: userQuery } = defineQueryBuilder([User, Post], ({ many }) => ({
  user: {
    posts: many(Post, {
      reference: Post.fields.userId,
      field: User.fields.id,
    }),
  }
}))

// Type-safe queries with automatic relation inference
const usersWithPosts = userQuery.query()
  .where(user => user.email.endsWith('@example.com'))
  .with({ posts: true })
  .get()
```

This approach provides full type safety and runtime validation throughout your data layer.

## Framework Integration

Zorm integrates seamlessly with popular frontend frameworks through dedicated integration packages:

- **SolidJS**: `@zorm-ts/solidjs`
- **Svelte**: `@zorm-ts/svelte`
- **Vue**: `@zorm-ts/vue`

Each integration provides framework-specific reactivity, making Zorm a perfect companion for your full-stack TypeScript applications.
