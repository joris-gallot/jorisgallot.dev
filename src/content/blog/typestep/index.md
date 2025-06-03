---
title: "Introducing Typestep"
description: "TypeScript Migration, One Step at a Time"
date: "Jun 1 2025"
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
} satisfies TypestepConfig
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
2. Ensured new code can't introduce _new_ type errors

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
◐ Processing tsc output file
ℹ 219 errors ignored

ERROR  The following files were ignored in the config but had no errors in the tsc output:

 ╭────────────────────────────────────────╮
 │                                        │
 │  src/utils/dates.ts                    │
 │  src/api/types.ts                      │
 │                                        │
 ╰────────────────────────────────────────╯
```

### Transparent Error Reporting

Typestep simply passes through the original TypeScript errors for files that aren't in your ignore list:

```
◐ Processing tsc output file
ℹ 219 errors ignored

ERROR  Found 1 error in 1 file:


 ╭───────────────────────╮
 │                       │
 │  src/router/index.ts  │
 │                       │
 ╰───────────────────────╯

src/router/index.ts(30,7): error TS2322: Type 'number' is not assignable to type 'string'.
```

For non-ignored files, Typestep works exactly like TypeScript, simply displaying errors as they are.

## Conclusion

Typestep is fundamentally a simple but powerful comparison tool with flexible configuration options. It doesn't reinvent TypeScript checking or create its own type system - it just makes the existing TypeScript compiler more manageable during migration.

By leveraging Typestep, teams can embrace TypeScript migration without the all-or-nothing approach that often derails adoption efforts. Start your TypeScript journey one step at a time.

For more details on configuration options and advanced usage, check out the [Typestep repository](https://github.com/joris-gallot/typestep).
