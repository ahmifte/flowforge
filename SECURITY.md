# Security Policy

## Reporting a vulnerability

Please report security issues privately rather than opening a public issue.

- Email: security@example.com
- Or use GitHub's private vulnerability reporting on this repository.

I aim to acknowledge reports within 72 hours.

## Handling of API keys

flowforge never stores user API keys on the server. Keys live in the browser's `localStorage` and are sent per-request only. If you find code that logs or persists a key server-side, treat it as a vulnerability and report it.
