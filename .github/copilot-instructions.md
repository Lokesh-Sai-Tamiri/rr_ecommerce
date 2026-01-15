# 🚀 Copilot Instructions – Radiant Research E-commerce Website

## Project Overview

A **Next.js 15.3+ TypeScript application** for a **clinical research testing laboratory**.  
Built with **Material-UI 7**, **Redux Toolkit**, and **Clerk authentication**.  
Supports a **multi-layout system**, **internationalization (i18n)**, **custom theming**, and an **AWS-backed API stack**.

---

## 🏗 Architecture

### Multi-Layout System

Three distinct layouts using **Next.js 15 route groups**:

- **`(dashboard)/`** → `MainLayout` with sidebar navigation + `AuthGuard` wrapper
- **`(minimal)/`** → `MinimalLayout` for auth pages (login/register)
- **`(simple)/`** → `SimpleLayout` with header/footer (public pages)

✅ Example: `src/app/(dashboard)/sample-page/page.tsx` → automatically wrapped with `MainLayout` + authentication.

---

### Provider Architecture

All providers stack in `src/store/ProviderWrapper.tsx` in this order:

1. `ClerkProvider` (authentication)
2. Redux `Provider` (state management)
3. `ConfigProvider` → `UserProvider` → `CustomerModalProvider` (business contexts)
4. `ThemeCustomization` (MUI theme + animations)
5. `Locales` → `NavigationScroll` (utilities)
6. `JWTProvider` (**current auth**) – can swap with Firebase/Auth0/Cognito/Supabase by changing `APP_AUTH` in `src/config.ts` and updating imports
7. `CartProvider` (shopping cart state)
8. `Notistack` (global notifications)

💡 **Copilot Tip**: When switching providers, always confirm both `APP_AUTH` and `ProviderWrapper.tsx` are updated.

---

### Path Aliases

- `baseUrl: "src"` in `tsconfig.json` → imports are project-rooted:

```ts
import Loader from "ui-component/Loader"; // ✅
```

instead of:

```ts
import Loader from "../../../ui-component/Loader"; // ❌
```

---

## 🛠 Development Workflow

### Local Development

```bash
yarn dev          # Dev server (http://localhost:3000)
yarn build        # Production build
yarn start        # Run production build
yarn lint         # Run ESLint (permissive ruleset)
yarn lint:fix     # Auto-fix linting issues
```

### Docker Development

```bash
docker-compose -f docker-compose-dev.yml up  # Dev runs on port 4343, hot reload enabled
```

- **Production**: Uses `Dockerfile_prod`, AWS ECR, and CodeDeploy (`deploy_scripts/application-start.s`)

---

### Environment Variables

Required in `.env` (see `src/config.ts` for mapping):

- **Clerk Auth**:

  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

- **MySQL**:

  - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`

- **AWS S3**:

  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`

- **Optional**: Firebase, Auth0, Cognito, Supabase (if switching auth providers)

---

## 🎨 Code Conventions

- **TypeScript**: Permissive (`strict: false`, `any` allowed) → keep code flexible
- **Prettier**:

  - Max line length = 140
  - Single quotes
  - No trailing commas

- **Client Components**: `'use client'` → needed for hooks/contexts
- **Server Components**: Default in `app/` (no directive needed)
- **Layouts**: Must live inside `(dashboard)`, `(minimal)`, `(simple)` route groups

---

### Theme & Styling

- Typography variants: `heroLarge`, `heroMedium`, `heroSmall`, `subtitleLarge`, `subtitleMedium`
- Responsive fonts: `getResponsiveFontSizes()`
- SCSS themes: `src/scss/_theme[1-6].module.scss`
- Animations: Defined in `ThemeCustomization` (e.g., `fadeInUp`)

---

## 🔌 API & Data Flow

### Backend Integration

- **Pages Router APIs** (`src/pages/api/`):

  - `submit-study.ts` → Uploads PDFs to S3 + saves to MySQL
  - `get-studies.ts` → Retrieves user quotations with pagination
  - `delete-study.ts` → Deletes from MySQL + S3
  - See `src/pages/api/studies-api-usage.md`

- **App Router APIs** (`src/app/api/`):
  - `news/route.ts` → Example GET endpoint
  - `user/metadata/route.ts` → Clerk metadata (GET/POST)
  - `quotation/route.ts` → Quotation generation

✅ **Copilot Standard**:

- Use **App Router API (`app/api/`) for new endpoints** unless legacy compatibility is required.
- Use **SWR** for client-side data fetching.

---

### Database Schema

- MySQL schema auto-migrated via `submit-study.ts`
- Tables:
  - `studies` → user quotations/study requests (JSON columns for guidelines)
- Parse JSON with `parseJsonSafely()` utility

---

### External Services

- **AWS S3**: PDF storage (via `@aws-sdk/client-s3`)
- **Clerk**: User metadata (via `src/utils/clerkMetadata.ts`)
- **Puppeteer**: PDF generation in Docker

---

## 🚧 Common Pitfalls

1. **Don’t enable `reactStrictMode`** → breaks chart rendering
2. Always use **`src/` path imports**, not relative paths
3. When **switching auth**, update both `APP_AUTH` and providers
4. Watch out for **Pages Router vs App Router API confusion**
5. **MySQL JSON parsing** requires `parseJsonSafely()`
6. **Contexts/hooks** need `'use client'`

---

## 📘 Clarified Questions (with Answers)

1. **Should we document the quotation PDF generation workflow (quotation-server.js + templates)?**  
   ✅ Yes – create `docs/quotation-workflow.md`. Include:

   - Input (study data)
   - Template engine (Handlebars/Pug)
   - Puppeteer rendering steps
   - S3 upload + DB update

2. **Are there specific i18n conventions for adding new languages beyond `src/utils/locales/`?**  
   ✅ Convention:

   - Add language JSON in `src/utils/locales/[lang].json`
   - Register in `Locales.tsx`
   - Ensure `next.config.js` includes the new locale
   - Add translations for **menu items**, **errors**, and **study forms**

3. **What’s the preferred pattern for new API endpoints?**  
   ✅ Use **App Router API (`src/app/api/`)** moving forward.  
   Pages Router APIs remain for legacy S3/MySQL workflows only.

---

## 🔧 MCP (Model Context Protocol) Integration

Copilot should use **MCP servers** to enhance development:

### Available MCP Servers

1. **Context7** (`@upstash/context7-mcp`)

   - Use for: Fetching up-to-date library documentation and code examples
   - When to use: When working with external libraries, need API references, or implementing features with third-party packages
   - Examples: Next.js APIs, Material-UI components, Redux Toolkit patterns

2. **Brave Search** (`@modelcontextprotocol/server-brave-search`)

   - Use for: Real-time web searches for latest documentation, Stack Overflow solutions, and current best practices
   - When to use: When facing errors not documented locally, researching new features, or finding contemporary solutions
   - API Key: Configured and ready to use

3. **Sequential Thinking** (`@modelcontextprotocol/server-sequential-thinking`)

   - Use for: Complex problem-solving that requires step-by-step reasoning
   - When to use: Debugging multi-step workflows, architectural decisions, or complex feature implementations
   - Examples: Quotation workflow optimization, auth provider migration planning

4. **shadcn/ui** (`@jpisnice/shadcn-ui-mcp-server`)

   - Use for: Accessing shadcn/ui component library documentation and patterns
   - When to use: Building new UI components, especially if considering alternatives to Material-UI
   - Note: Current project uses Material-UI, but shadcn patterns can inform component design

5. **Apify** (`apify/apify-mcp-server`)
   - Use for: Web scraping, automation, and data retrieval tasks
   - When to use: Need to extract data from external sources, automate web interactions, or integrate third-party data
   - Examples: Market research data, competitor analysis, external API integration testing

### MCP Usage Guidelines

✅ **Always use MCP servers when:**

- Implementing new features with unfamiliar libraries
- Debugging errors that aren't documented in the project
- Researching current best practices for Next.js 15, TypeScript, or Material-UI
- Need real-time information about API changes or deprecations
- Planning complex architectural changes

✅ **Preferred MCP workflow:**

1. **Context7** → Get official library documentation first
2. **Brave Search** → Find real-world examples and solutions if docs aren't sufficient
3. **Sequential Thinking** → Break down complex problems systematically
4. **Apify** → Automate data collection when needed for testing or features

💡 **Rule for Copilot**: When debugging or extending features, always check if an MCP server can provide live context instead of relying on static assumptions. Prioritize Context7 for library docs, Brave Search for recent solutions, and Sequential Thinking for complex reasoning.

---
