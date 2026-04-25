---
title: "TanStack Query patterns for caching and UI performance"
description: "Simple query-key and stale-time decisions that noticeably improve perceived speed."
date: "2025-03-24"
readTime: "4 min read"
tag: "React"
slug: "tanstack-query-caching-performance"
locale: "en"
featured: false
---

TanStack Query helped me remove a lot of manual loading-state code and unnecessary refetching.

The biggest impact came from stable query keys and realistic stale times. Not every request needs instant revalidation.

I also separate list and detail caches to keep updates targeted. Users get faster screens, and the codebase stays easier to reason about.
