---
title: "schematype"
description: "Convert JSON Schema to TypeScript type declarations at Rust speed"
date: "Jun 1 2025"
repoURL: "https://github.com/joris-gallot/schematype"
---

## Project Overview

**Schematype** is a library that converts JSON Schema and OpenAPI specifications to TypeScript type declarations. Built with Rust, it offers blazing-fast parsing and transformation capabilities that outperform JavaScript-based alternatives.

## Key Features

The library offers a straightforward API with powerful capabilities:

```typescript
import { schemaToType } from '@schematype/core'

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    age: { type: 'number' },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' }
      }
    }
  },
  required: ['id', 'name']
}

const tsType = schemaToType(userSchema, { name: 'User' })
console.log(tsType)
// Outputs:
// export type User = {
//   id: string;
//   name: string;
//   age?: number;
//   address?: {
//     street?: string;
//     city?: string;
//   };
// };
```

schematype supports a comprehensive set of JSON Schema features including:

- All primitive types (`string`, `number`, `boolean`, etc.)
- Complex compositions (`anyOf`, `oneOf`, `allOf`)
- Nested objects and arrays
- Schema references (`$ref`)
- Enums and constants
- Property descriptions (as JSDoc comments)

## OpenAPI Support

Beyond simple JSON Schema, schematype can process entire OpenAPI specifications:

```typescript
import { openApiToTypes } from '@schematype/core'

const result = openApiToTypes(apiSpecification)

// Result contains types for all paths and components
console.log(result.paths[0])
// {
//   path: "/users/{id}",
//   method: "get",
//   pathParameters: "{\n  id: string;\n}",
//   responses: {
//     "200": "{\n  id: string;\n  name: string;\n}"
//   }
// }
```

This makes it ideal for maintaining type safety across API boundaries in full-stack TypeScript applications.

## Flexible Integration

Schematype's API is flexible enough to handle various use cases:

- Use `schemaToType` for custom scripts and individual schema conversion
- Use `openApiToTypes` for complete API type generation with endpoint interfaces

Whether you need to process a single schema or an entire API specification, Schematype provides the right level of abstraction.
