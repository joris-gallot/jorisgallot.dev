---
title: "portcall"
description: "Run local dev servers in the background, on fixed ports, with logs coding agents can read"
date: "Nov 06 2026"
repoURL: "https://github.com/joris-gallot/portcall"
---

## Overview

**portcall** is a CLI that runs a project's dev servers detached, each on a fixed port, and keeps their logs on disk. When several apps run at once, it keeps ports apart and stops coding agents from starting a second `pnpm dev`, losing track of the one they started, or missing the backend error behind a failing request.

```sh
portcall status                 # what runs, on which port
portcall up                     # start what is not running, wait for the ports
portcall logs server --errors   # the error behind that 500, with its stack trace
portcall restart web
portcall ports                  # every project's ports, and conflicts between them
```

## Install

```sh
npm i -g portcall
```

## Configure

A `portcall.json` at the project root:

```json
{
  "$schema": "https://unpkg.com/portcall/schema.json",
  "name": "myapp",
  "services": {
    "server": { "command": "pnpm dev:server", "port": 3000 },
    "web": {
      "command": "pnpm dev:web",
      "port": 5173,
      "env": { "VITE_API_URL": "http://localhost:{ports.server}" }
    },
    "db": { "port": 5432 }
  }
}
```

Each command gets `PORT` set to its service's port. A service without `command` is external (a database in Docker, a tunnel): portcall only checks that its port answers. With `"worktrees": true`, each git worktree gets its own port offset so several checkouts can run side by side.

## With coding agents

`portcall agents` prints a section to paste into `AGENTS.md` / `CLAUDE.md`. Agents then check `portcall status` instead of guessing, start servers with `portcall up`, which never starts a second copy, and read `portcall logs --errors` instead of asking you to copy the terminal.
