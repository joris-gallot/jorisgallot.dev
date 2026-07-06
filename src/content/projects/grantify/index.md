---
title: "grantify"
description: "Lightweight, framework-agnostic RBAC and permission management toolkit"
date: "Nov 02 2025"
repoURL: "https://github.com/joris-gallot/grantify"
---

## Overview

**Grantify** is a lightweight, framework-agnostic access-control toolkit with a simple, fully typed API for managing permissions. You declare a set of permissions, then define one rule per permission as a typed predicate over the current user and optional context.

## Usage

```typescript
import { createGrantify } from '@grantify/core'

const { defineRule } = createGrantify({
  permissions: ['post:create', 'post:edit', 'post:delete'] as const,
  user: { id: 1, isAdmin: false },
})

const grantify = defineRule('post:create', user => user.id === 1)
  .defineRule('post:edit', (user, ctx: { isOwner: boolean } | undefined) =>
    Boolean(user.isAdmin || ctx?.isOwner))
  .defineRule('post:delete', async () => await Promise.resolve(true))
  .build()
```

Permissions are declared `as const`, so rule names and their context types are checked at compile time.
