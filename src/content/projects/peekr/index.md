---
title: "peekr"
description: "Self-hosted, real-time Docker log viewer"
date: "May 26 2026"
repoURL: "https://github.com/joris-gallot/peekr"
---

## Overview

**peekr** is a self-hosted, real-time Docker log viewer. It runs as a single container: the frontend is embedded into the Rust binary (via rust-embed), so one image serves the whole app. Mount the Docker socket and peekr reads your containers' logs live.

## Run

```sh
docker run -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock peekr
```

Then open `http://localhost:8080`. The bind address is configurable through `PEEKR_ADDR` (default `0.0.0.0:8080`).
