---
title: "rtsc"
description: "A small experimental TypeScript-to-JavaScript compiler written in Rust"
date: "Jun 1 2025"
repoURL: "https://github.com/joris-gallot/rtsc"
---

## Project Overview

**rtsc** is my experimental TypeScript-to-JavaScript compiler written in Rust. Unlike my other projects, this is not a production-ready library but rather a personal exploration into compiler design and implementation—my first attempt at building a compiler from scratch.

This project allowed me to dive deep into:

1. **Lexical analysis** - Breaking source code into tokens
2. **Syntax parsing** - Constructing an abstract syntax tree (AST)
3. **Basic type checking** - Validating TypeScript type annotations
4. **Code generation** - Transforming TypeScript into JavaScript

## Current Capabilities

While still in the experimental stage, rtsc can handle:

- Basic TypeScript syntax parsing
- Variable declarations with type annotations
- Primitive type checking
- JavaScript output generation

## Challenges and Insights

Building rtsc has provided valuable insights into:

- The complexity of type systems and type inference
- Performance considerations in parsing and code generation
- The elegance of Rust's pattern matching for handling AST nodes
- Error reporting and recovery strategies in compilers

This project continues to be a playground for learning compiler techniques and deepening my understanding of both TypeScript and Rust, even though it's not intended for production use.
