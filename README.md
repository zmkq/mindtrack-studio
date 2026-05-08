<div align="center">
  <img src="https://github.com/user-attachments/assets/70687615-c797-47e9-a041-02203155ac04" alt="MindTrack Studio Hero" style="border-radius: 12px; width: 100%; object-fit: cover; height: 350px; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5);">
</div>

<br>

<h1 align="center" style="font-size: 3.5rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0;">MindTrack Studio</h1>

<p align="center" style="font-size: 1.25rem; color: #a1a1aa; font-weight: 300; margin-top: 10px;">
  <em>A state-of-the-art, lightweight psychology content platform.</em><br>
  Built with precision, elegant architecture, and a museum-quality aesthetic.
</p>
<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/18177602-224a-487d-a42e-84f9a3f5649d" />

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
</p>

<br>

## ✧ About The Studio

**MindTrack Studio** is a full-stack Next.js open-source platform tailored for modern psychology content, providing an ecosystem for mental wellness tracking, robust administrative workflows, and engagement analytics. 

The architecture combines an elegant React & TSX frontend with Node.js route handlers and Prisma-backed data models.

> **Disclaimer:** The demo content is purely educational and product-oriented. It does not provide therapy, diagnosis, crisis support, or medical advice.

---

## ✦ Core Features

MindTrack is divided into sleek user-facing experiences and powerful administrative interfaces.

### 👤 User Experience
- **Library (`/app`):** User-facing micro-exercise library tailored for mental wellness.
- **Reflection Helper (`/app/reflection`):** A rule-based reflection workflow for active tracking and mindfulness.

### 🛡️ Administrative Powerhouse
- **Content CMS (`/admin/content`):** A beautiful administrative panel for curating psychology micro-exercises.
- **Analytics (`/admin/analytics`):** Real-time engagement analytics dashboards visualized with Recharts.
- **QA & Tracker (`/admin/qa`):** Integrated QA and bug tracker with severity and status tagging.

### ⚙️ Technical Architecture
- **Auth:** Cookie-based local role switcher with AWS Cognito integration architecture.
- **Data:** Prisma ORM backed by SQLite (local development) with seeded, realistic psychology demo data.
- **UI System:** shadcn/Radix UI primitives wrapped in a custom Tailwind CSS dark-mode aesthetic.

---

## ⚡ Quick Start

Experience the studio locally in just a few commands.

### 1. Install Dependencies
Fast, deterministic installs powered by Bun:
```bash
bun install
```

### 2. Initialize the Ecosystem
Generate the Prisma client, migrate the SQLite schema, and seed the interactive demo data:
```bash
bun run setup
```
*(Alternatively, run manually: `bun run db:generate`, `bun run db:migrate`, `bun run db:seed`)*

### 3. Launch the Studio
Fire up the local development server:
```bash
bun run dev
```
Explore the studio at [http://localhost:3000](http://localhost:3000).

---

## 📂 Architecture & Structure

A high-end platform demands an immaculate codebase structure.

| Directory | Purpose |
| :--- | :--- |
| `app/` | Next.js App Router pages and Node.js API route handlers |
| `components/` | Thin client islands and shadcn UI primitives |
| `lib/services/` | Core business logic (content, analytics, QA, reflection) |
| `lib/schemas.ts` | Shared Zod validation for rock-solid type safety |
| `prisma/` | Data model, migrations, and realistic seed sequences |

---

## 🌌 Future Horizons

MindTrack is constantly evolving. The roadmap includes:

- [ ] **AWS Cognito Integration:** Replace local role cookies with robust JWT sessions.
- [ ] **GitHub API Sync:** Real-time issue tracking sync for the QA dashboard.
- [ ] **Notion API Connection:** Streamlined editorial review and content planning.
- [ ] **AI-Powered Reflection:** Upgrade the rule-based helper to an LLM workflow with safety guardrails.
- [ ] **Production DB:** Seamless transition from SQLite to Postgres.
- [ ] **CI/CD:** Automated testing and integration pipelines via GitHub Actions.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/9e5390c4-5bbc-4650-9901-25d4bb056032" alt="MindTrack Studio Footer" style="border-radius: 8px; width: 100%; object-fit: cover; opacity: 0.8;">
  <p style="color: #a1a1aa; font-size: 0.9rem;">
    Designed and built with passion.<br>
    © 2026 MO.
  </p>
</div>
