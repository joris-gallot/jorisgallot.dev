---
title: "Introducing Typestep"
description: "TypeScript Migration, One Step at a Time"
date: "Mar 18 2025"
repoURL: "https://github.com/joris-gallot/typestep"
---

Migrating a JavaScript codebase to TypeScript can be daunting — especially when working with large or legacy projects, running `tsc` for the first time can flood your terminal with hundreds of type errors.
The ideal way forward? An **incremental migration strategy** — gradually introducing type safety without blocking development.

This is where **Typestep** comes in.

> **Typestep** is a CLI tool designed to help teams progressively adopt TypeScript by letting you track, isolate, and ignore specific errors or files — and then reduce them step by step.

---

## A Real-World Migration Story

Let's walk through a concrete example of migrating an existing JavaScript project to TypeScript using Typestep.

### Initial TypeScript Setup

After adding TypeScript to our project and creating a basic `tsconfig.json`, we're ready to see where we stand:

```bash
tsc --noEmit
```

Opening our log file reveals the harsh reality: **247 type errors** across 38 files. Far too many to fix in one go, especially with a looming release deadline.

### Initialize Typestep

Rather than reverting or abandoning our TypeScript efforts, we use Typestep to catalog these errors:

```bash
# Move TypeScript output to a log file
tsc --noEmit > tsc-output.log || true # continue even if it errors

# Initialize Typestep config
npx typestep init tsc-output.log
```

This creates a `typestep.config.ts` file that looks something like this:

```typescript
import type { TypestepConfig } from 'typestep'

export default {
  ignoredFiles: {
    'src/api/client.ts': {
      ignoredTsErrorCodes: ['TS2339', 'TS2345', 'TS2571']
    },
    'src/components/Dashboard.tsx': {
      ignoredTsErrorCodes: ['TS2322', 'TS2769', 'TS7006']
    },
    'src/utils/formatting.ts': {
      ignoredTsErrorCodes: ['TS2366', 'TS2532']
    },
    // ... 35 more files with their specific error codes
  },
} satisfies TypestepConfig;
```

### Incorporate into CI Pipeline

Now we can add TypeScript checking to our CI pipeline without breaking it:

```bash
# Run TypeScript (continue even if it errors)
tsc --noEmit > tsc-output.log || true

# Let Typestep filter the errors
typestep run tsc-output.log
```

Since all current errors are registered in the config, our build passes successfully. We've achieved two crucial things:
1. Added TypeScript to our project
2. Ensured new code can't introduce *new* type errors

### Incremental Progress

Our team starts tackling TypeScript issues in manageable chunks:

- Week 1: Fixed utility functions in `src/utils/dates.ts`
- Week 2: Migrated API client interfaces in `src/api/types.ts`

After each fix, we run:

```bash
tsc --noEmit > tsc-output.log || true
typestep run tsc-output.log
```

Typestep automatically detects that these files no longer have errors and suggests removing them from the ignore list:

```
✅ The following files no longer have errors and can be removed from ignoredFiles:
  - src/utils/dates.ts
  - src/api/types.ts

Run 'typestep update tsc-output.log' to update your config file automatically.
```

### Updating the Config

We update our config to stop ignoring the fixed files:

```bash
typestep update tsc-output.log
```

Our `typestep.config.ts` is now automatically updated, with two fewer files in the `ignoredFiles` array. From now on, if anyone introduces a type error in these files, the CI will fail - gradually expanding our type-safe codebase.

### Track Migration Progress

Typestep includes a simple reporting command to track our migration progress:

```bash
typestep status
```

Output:
```
TypeScript Migration Status:
✅ Type-safe files: 12 (31.6%)
🔶 Ignored files: 26 (68.4%)
📊 Total files: 38
```

Over time, we see the percentage of type-safe files steadily increase as we systematically work through our technical debt.

---
