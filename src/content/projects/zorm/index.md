---
title: "zorm"
description: "A minimalist, type-safe ORM powered by Zod"
date: "May 12 2025"
repoURL: "https://github.com/joris-gallot/zorm"
---

## Project Overview

**Zorm** is a minimalist data normalization ORM powered by Zod, not an SQL ORM, it allows you to define and manipulate entities in a simple and type-safe way. When working with complex data structures in TypeScript applications, ensuring type safety and maintaining relationships across your data layer can be challenging.

**What Zorm offers**:

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

One of the significant challenges in developing Zorm was creating a core ORM system that remains completely framework-agnostic while still providing reactive capabilities. This architecture allows Zorm to be adapted to virtually any frontend framework through lightweight adapter packages.

The core functionality is isolated in `@zorm-ts/core`, with framework-specific bindings currently available for:

- **SolidJS**: `@zorm-ts/solidjs`
- **Svelte**: `@zorm-ts/svelte`
- **Vue**: `@zorm-ts/vue`

Each integration package handles the specific reactivity system of its framework, allowing developers to use Zorm with their preferred tools without compromising on type safety or performance. This modular approach also makes it straightforward to extend support to additional frameworks in the future.
