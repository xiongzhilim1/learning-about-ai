# Learning About AI

A three-volume educational site on AI engineering, built with React + Vite.

## The Three Volumes

| Volume | Discipline | Focus |
|--------|-----------|-------|
| 1 | Prompt Engineering | Crafting effective single prompts — 5 tenets, 8 modules |
| 2 | Context Engineering | Curating what the model sees per turn — 12 tenets, 6 approaches |
| 3 | Harness Engineering | Engineering the system around the model — 7 tenets, 9 modules |

Each volume builds on the previous. You cannot meaningfully engineer a context window if you cannot write a clean prompt; you cannot engineer a harness if you cannot engineer a single turn.

## Stack

- **React 19** + **wouter** (routing)
- **Vite** (build)
- **Tailwind CSS v4** + **shadcn/ui**
- **Framer Motion** (animations)
- **Fraunces** (headings) + **Source Sans 3** (body) + **Fira Code** (mono)

## Development

```bash
npm install
npm run dev
```

## Deployment

Configured for Vercel — push to `main` to deploy.
