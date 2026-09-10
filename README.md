# KiddyCody

<img src="public/kiddycody-logo.svg" alt="KiddyCody" width="320" />

**Big ideas start with a little code.**

An animated, responsive landing page for KiddyCody's coding classes. Built with React, TypeScript, Vite, Tailwind CSS, and Three.js. The production build is a static frontend that can be hosted on Vercel, Render, AWS Amplify, or another static host.

| Course | Ages |
| --- | --- |
| Scratch | 7–14 |
| Python | 14–20 |
| C programming | 14–20 |

## Contents

- [Run locally](#run-locally)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Edit the website](#edit-the-website)
- [Create the private GitHub repository](#create-the-private-github-repository)
- [Deploy to Vercel](#deploy-to-vercel)
- [Deploy to Render](#deploy-to-render)
- [Deploy to AWS](#deploy-to-aws)
- [Current hosting and custom domains](#current-hosting-and-custom-domains)
- [Future paid courses](#future-paid-courses)
- [Troubleshooting](#troubleshooting)

## Features and current scope

- Interactive Three.js hero built around the KiddyCody logo, with pointer movement and a Remix control.
- Animation pause control, reduced-motion support, and a logo fallback if WebGL is unavailable.
- Course information dialogs, language tabs, FAQs, and responsive navigation.
- WhatsApp inquiries and an Instagram link.
- Locally bundled fonts and SVG brand assets.

This version has no business backend, database, student accounts, checkout, or private lesson storage. The code examples display illustrative output; they do not execute arbitrary Python, C, or Scratch programs. The inquiry buttons open WhatsApp.

## Run locally

Install [Node.js](https://nodejs.org/en/download) with npm. Use **Node 24.x** to match the deployment configuration. Node 22.13 or newer within the 22.x line is also accepted by this project.

Extract the downloaded ZIP. Open a terminal inside the `kiddycody-website` folder, where `package.json` is located:

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal, usually [http://localhost:5173](http://localhost:5173). Changes to source files update the page during development. Press **Ctrl+C** to stop the server.

If you already use nvm, run `nvm install` and `nvm use` in this folder first. No `.env` file or API keys are required.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the dependency versions recorded in `package-lock.json`. |
| `npm run dev` | Start the local development server. |
| `npm run typecheck` | Check TypeScript without creating a build. |
| `npm run build` | Check TypeScript, then generate the production site in `dist/`. |
| `npm run preview` | Serve an existing production build locally, usually on port 4173. |

Before deploying, run:

```bash
npm run build
npm run preview
```

Open [http://localhost:4173](http://localhost:4173), or the URL printed by the terminal. The preview command is for checking the build locally. Hosting providers serve the generated `dist/` files directly; they do not need a continuously running Node process for this version.

## Project structure

| Path | Responsibility |
| --- | --- |
| `index.html` | Document title, description, social metadata, favicon, and app entry point. |
| `src/main.tsx` | React startup and font/style imports. |
| `src/App.tsx` | Page sections, course content, contact links, and interactions. |
| `src/coding-world.tsx` | Three.js scene, animation lifecycle, and fallback. |
| `src/globals.css` | Theme, layout, responsive styling, and animation. |
| `src/components/ui/` | Shared dialog, accordion, tabs, and button primitives. |
| `src/lib/utils.ts` | Shared CSS class utilities. |
| `public/` | Original and prepared SVG logo assets and favicon. |
| `vendor/` | Vendored shadcn stylesheet and its license notice. |
| `vite.config.ts` | Vite build configuration and the `@/` source alias. |
| `vercel.json` | Vercel build and output settings. |
| `render.yaml` | Render Static Site Blueprint. |
| `amplify.yml` | AWS Amplify build specification. |

Commit the source, configuration, assets, and `package-lock.json`. Dependency downloads and generated builds are excluded by `.gitignore`.

## Edit the website

| Change | Where to edit |
| --- | --- |
| Headlines, course descriptions, ages, FAQs | `src/App.tsx` |
| WhatsApp number and inquiry message | `whatsapp` helper in `src/App.tsx`; also update the no-JavaScript link in `index.html`. |
| Instagram profile | `instagram` constant in `src/App.tsx` |
| Colors, typography, spacing, mobile layout | `src/globals.css` |
| 3D blocks and motion | `src/coding-world.tsx` |
| Logo and favicon | Files in `public/` |
| Search/social title and description | `index.html` |

Current contact links are WhatsApp **+961 81 954 659** and Instagram **[@kiddycody.academy](https://www.instagram.com/kiddycody.academy/)**.

## Create the private GitHub repository

The intended repository is `mahdi-alkak-1/kiddycody-website`. These instructions create it; the presence of this README does not mean the remote repository already exists.

### Option A: GitHub website

1. Sign in to GitHub as **mahdi-alkak-1** and open [New repository](https://github.com/new).
2. Name it **kiddycody-website** and select **Private**.
3. Create an empty repository without adding a README, license, or `.gitignore`; this project already contains the files it needs.
4. From the extracted project folder, run:

```bash
git init -b main
git add .
git commit -m "Add KiddyCody website and deployment documentation"
git remote add origin https://github.com/mahdi-alkak-1/kiddycody-website.git
git push -u origin main
```

Complete GitHub's authentication prompt using your own account. If Git requests a name or email for the commit, configure your own Git identity first.

### Option B: GitHub CLI

With [GitHub CLI](https://cli.github.com/) installed, authenticate with `gh auth login`, then check `gh auth status` shows **mahdi-alkak-1**. From a fresh extracted project folder, run:

```bash
git init -b main
git add .
git commit -m "Add KiddyCody website and deployment documentation"
gh repo create mahdi-alkak-1/kiddycody-website --private --source=. --remote=origin --push
```

Use one option only. If the repository already exists, use its existing clone or remote instead of creating it again. See the [official `gh repo create` reference](https://cli.github.com/manual/gh_repo_create).

After upload, another computer can get the project with:

```bash
git clone https://github.com/mahdi-alkak-1/kiddycody-website.git
cd kiddycody-website
npm ci
npm run dev
```

A private GitHub repository restricts source-repository access. The visibility of a deployed website is configured separately with its hosting provider.

## Deploy to Vercel

1. Open [Vercel](https://vercel.com/new), connect GitHub, and grant access to the private repository.
2. Import `mahdi-alkak-1/kiddycody-website`.
3. Use the settings below and deploy. The included `vercel.json` supplies the build settings.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Repository root |
| Node.js version | 24.x |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None required |

Vercel provides a deployment URL. With the Git integration connected, subsequent pushes can trigger new deployments. Add your domain in the Vercel project's domain settings and follow the DNS records shown there.

Official documentation: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) · [Build configuration](https://vercel.com/docs/builds/configure-a-build).

## Deploy to Render

In the [Render dashboard](https://dashboard.render.com/), choose **New → Static Site**, connect the private repository, and use:

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | Repository root |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Node version | `NODE_VERSION=24` |
| Start command | Not needed for a Static Site |

Alternatively, create a Blueprint from the repository to use the included `render.yaml`. Render gives the deployed site an `onrender.com` address and supports custom domains.

Official documentation: [Static Sites](https://render.com/docs/static-sites) · [Blueprint configuration](https://render.com/docs/blueprint-spec) · [Node version](https://render.com/docs/node-version).

## Deploy to AWS

Use **AWS Amplify Hosting** for this frontend. The included `amplify.yml` selects Node 24, installs packages, builds the site, and publishes `dist/`.

1. Open [AWS Amplify](https://console.aws.amazon.com/amplify/) and start a new hosting app.
2. Connect GitHub and authorize access to the private repository.
3. Select `kiddycody-website` and the `main` branch.
4. Check that Amplify uses the repository's `amplify.yml`, with `dist` as the output directory.
5. Deploy, then use the URL Amplify provides. Add your custom domain through Amplify's domain settings when ready.

This deployment uses frontend hosting only; the project does not require an Amplify backend or an EC2 server.

If you later need direct control over AWS infrastructure, the same `dist/` assets can be served through S3 and CloudFront. That infrastructure is not provisioned by this project.

Official documentation: [Deploy a Vite site](https://docs.amplify.aws/gen1/javascript/deploy-and-host/frameworks/deploy-vite-site/) · [Build settings](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html).

## Current hosting and custom domains

The original published site is [kiddycody.housamkak.chatgpt.site](https://kiddycody.housamkak.chatgpt.site).

As checked on **10 September 2026**, it is managed by **ChatGPT Sites**, using a **Cloudflare Workers** deployment. It is currently restricted to its owner. This is managed serverless hosting; there is no dedicated VPS or SSH server for this project. No application database or object-storage binding is configured.

To use a domain with that existing deployment, open the Site's settings, choose **Add domain**, and add the exact DNS records Sites supplies at your domain provider. The domain points to the existing hosting. Site sharing/access is a separate setting, so connecting a domain does not by itself make an owner-only site public.

This repository is a portable React/Vite export of that design. It replaces the Sites-specific server wrapper with a static frontend build. It contains no Sites credentials and needs no Sites runtime to run. Publishing or editing this repository does not automatically update the original ChatGPT Site; Vercel, Render, and Amplify deployments are separate until you connect their Git integrations.

Official documentation: [ChatGPT Sites and custom domains](https://learn.chatgpt.com/docs/sites).

## Future paid courses

The page can grow into a course platform. Student accounts, payment verification, enrollment records, protected lessons, and progress tracking require additional services. A future backend should verify purchases and access; a hidden frontend link cannot protect paid course content. Keep payment secrets and private credentials on the server.

The current frontend can remain on Vercel, Render, or Amplify while a separate backend is introduced. No payment or enrollment implementation is included in this version.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm` is not recognized | Install Node.js, then reopen your terminal. |
| Node engine/version error | Use Node 24.x, or a supported Node 22.x version described above. |
| `npm ci` cannot find the lockfile | Open the project folder containing both `package.json` and `package-lock.json`. |
| Port 5173 is occupied | Open the alternative URL Vite prints, or run `npm run dev -- --port 5174`. |
| Blank page after opening `index.html` directly | Use `npm run dev`; source files need Vite to compile them. |
| A host asks for an output folder | Enter `dist`, generated by `npm run build`. |
| The private repo is missing in a hosting dashboard | Grant that host's GitHub integration access to this repository. |
| 3D is unavailable on a device | The page uses the logo fallback; check WebGL/hardware acceleration if you want 3D. |
| New URL paths return 404 | This version uses one page and anchor links. If you later add a router, configure that host's SPA fallback rules. |

Third-party dependencies keep their own licenses. Preserve the license notice bundled under `vendor/` and the notices distributed with dependencies.
