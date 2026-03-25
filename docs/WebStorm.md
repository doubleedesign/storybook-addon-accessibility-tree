# WebStorm dev notes

## Syntax highlighting

Some regexes for using the [Better Highlights](https://plugins.jetbrains.com/plugin/14892-better-highlights) plugin to tweak syntax highlighting in Vitest unit tests:

```regexp
getBy[A-Za-z]+|findBy[A-Za-z]+|queryBy[A-Za-z]+
```
Testing Library query methods.

```regexp
mock[A-Za-z]+(?=\s*=\s*vi\.fn\(\))|mock[A-Za-z]+(?=\s*=\s*vitest\.fn\(\))
```
Mock function declarations. Must start with `mock` and be assigned to `vi.fn()` or `vitest.fn()`. Should not capture something like `mockData = {}`.

```regexp
\b(describe|it|expect)(?=\()
```
Describe, it, and expect keywords.