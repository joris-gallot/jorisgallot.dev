---
title: "typestep"
description: "Simplifies JavaScript to TypeScript migration with incremental changes"
date: "Jun 1 2025"
repoURL: "https://github.com/joris-gallot/typestep"
---

## Project Overview

**Typestep** is a CLI tool designed to help teams progressively adopt TypeScript in existing JavaScript projects. When migrating large codebases, running `tsc` for the first time can reveal hundreds of type errors—far too many to fix at once without disrupting development.

Typestep solves this problem by enabling an **incremental migration strategy**:

1. **Prevent regression** - Ensure new code follows TypeScript rules
1. **Catalog existing errors** - Creates a config file that tracks all current type issues
1. **Enforce immediately** - Lets you add TypeScript checking to CI without breaking builds

## Configuration Flexibility

Typestep offers powerful configuration options through its `typestep.config.ts` file:

```typescript
import type { TypestepConfig } from 'typestep'

export default {
  ignoredFiles: {
    // Ignore all errors in this file
    'src/legacy-api-client.ts': true,
    'src/components/UserDashboard.tsx': {
      // Ignore only specific error codes in this file
      ignoredTsErrorCodes: ['TS2339', 'TS2345']
    },
    // Use functions for dynamic filtering
    'src/utils/date-formatter.ts': ({ error }) => {
      return error.includes('Property does not exist')
    }
  },
  // Global error codes to ignore in all files
  ignoredTsErrorCodes: ['TS2322'],
} satisfies TypestepConfig
```

This approach gives you precise control over your migration strategy while keeping your CI pipeline running smoothly.

## Learn More

For a detailed walkthrough showing how to use Typestep in a real project, including code examples and step-by-step migration strategy, read my blog post:

[Introducing Typestep: TypeScript Migration, One Step at a Time](/blog/typestep)
