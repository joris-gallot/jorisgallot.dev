---
title: "oxlint-migration-inspector"
description: "A visual tool to migrate incrementally from ESLint flat config to Oxlint"
date: "Mar 03 2026"
repoURL: "https://github.com/joris-gallot/oxlint-migration-inspector"
---

## Overview

A fork of ESLint's [config-inspector](https://github.com/eslint/config-inspector), reworked to help teams move from an ESLint flat config to [Oxlint](https://oxc.rs) one step at a time.

It discovers every `eslint.config.{js,mjs,cjs,ts,mts,cts}` in a workspace and computes migration coverage across three scenarios:

- **native** - no JS plugins, nursery rules, or type-aware rules
- **default** - JS plugins enabled
- **max** - JS plugins, nursery, and type-aware rules enabled

Each ESLint rule is classified by migration status (`native_default`, `via_js_plugins`, `requires_nursery`, `requires_type_aware`, `not_implemented`, `unsupported`, `off_only`), so you can see exactly what Oxlint already covers and what still needs ESLint. Command previews using `@oxlint/migrate` turn that picture into a concrete, incremental migration path.
