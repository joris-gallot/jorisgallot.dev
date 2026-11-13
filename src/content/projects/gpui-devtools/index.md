---
title: "gpui-devtools"
description: "Inspect and debug GPUI applications"
date: "Nov 07 2026"
repoURL: "https://github.com/joris-gallot/gpui-devtools"
---

## Overview

**gpui-devtools** is an inspector for [GPUI](https://gpui.rs) applications, written in Rust. It adds an element picker, layout information, source locations, computed values and style details, plus a Keyboard tab showing the focus state, key contexts, available actions and recent keystrokes.

## Install

```toml
[features]
devtools = [
  "dep:gpui-devtools",
  "gpui/inspector"
]

[dependencies]
gpui = { package = "gpui-pre", version = "0.3" }
gpui-devtools = { version = "0.6", optional = true }
```

## Use

```rust
app.run(|cx| {
    #[cfg(feature = "devtools")]
    gpui_devtools::init(cx);
});
```

Toggle the inspector with `cmd-alt-i` on macOS and `ctrl-alt-i` elsewhere.
