# Ethixweb — Enterprise Digital Agency Platform

Ethixweb is a modern, high-performance web agency platform engineered with Next.js 14 App Router, TypeScript, Tailwind CSS, MongoDB Atlas, and Cloudinary. It features a public-facing conversion engine, a dynamic Content Management System (CMS), and a protected Administrator CRM for lead and enquiry pipeline management.

---

## 🔗 Live URLs & Performance Metrics

- **Live Production URL**: [https://ethixweb-xi.vercel.app/](https://ethixweb-xi.vercel.app/)
- **Public GitHub Repository**: [https://github.com/kapildev3006/Ethixweb-assignment](https://github.com/kapildev3006/Ethixweb-assignment)
- **Mobile PageSpeed Performance**: **97 / 100**
- **Desktop PageSpeed Performance**: **100 / 100**

---

## 🇮🇳 India-First Design Rationale

Ethixweb is purpose-built to accelerate digital transformation for Indian enterprises, startups, and high-growth SMEs:

1. **Conversion Architecture Tailored for Indian Businesses**: Streamlined intake funnels with transparent INR budget brackets (`₹1,00,000 – ₹5,00,000+`) and direct scoping workflows.
2. **Optimized for Diverse Indian Network Realities**: Engineered with lightweight DOM architecture, modern CSS, dynamic imports, and responsive image compression ensuring sub-second visual rendering even on tiered 4G/5G mobile networks.
3. **High-Trust Corporate Aesthetics**: Premium modern typography, dark-mode accents, glassmorphic card designs, and clear technical competency signals built to resonate with Indian founders, CTOs, and marketing leaders.
4. **Resilient Communication Channels**: Intelligent contact routing with fallback to direct in-page forms, ensuring zero lead leakage.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) & Glassmorphic Design Tokens
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose 8](https://mongoosejs.com/)
- **Media CDN**: [Cloudinary](https://cloudinary.com/) with server-side SDK streaming
- **Authentication**: Stateless HMAC-SHA256 JWT tokens with `HttpOnly` secure cookies & salted bcrypt password hashing
- **Validation**: [Zod](https://zod.dev/) schemas for API payloads and form inputs
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Lucide React Icons

---

## 🏛️ System Architecture

### 1. Dynamic MongoDB CMS
Content across the application is driven by MongoDB Atlas collections:
- `pagecontents`: Dynamic hero headlines, statistics, mission copy, and call-to-actions.
- `services`: Modular capability catalog with feature breakdowns and deliverable timelines.
- `casestudies`: Visual portfolio showcases with client metrics and technical deliverables.
- `testimonials`: Verified client endorsements with ratings, client roles, and avatars.
- `sitesettings`: Centralized company metadata, support emails, and social profiles.

### 2. MongoDB Intake Funnel & Leads CRM
- Contact inquiries submitted through `/contact` pass through Zod schema validation and anti-spam detection (honeypot fields and velocity checks).
- Inquiries are directly written to MongoDB Atlas in the `leads` collection with client metadata (IP address, user agent, timestamps).
- The admin dashboard provides search, category filtering, pipeline status updates (`New`, `Contacted`, `Qualified`, `Converted`, `Archived`), and note logging.

### 3. Secure Administrator Authentication
- Administrator credentials are saved and verified with salted `bcrypt` hashes in the MongoDB `admins` collection.
- Upon successful login via `/api/admin/auth/login`, an HMAC-SHA256 JWT is signed with `AUTH_SECRET` and delivered strictly via an `HttpOnly`, `SameSite=Lax`, `Secure` cookie (`ethix_admin_token`).
- Tokens are never exposed in the JSON response payload, preventing cross-site scripting (XSS) token exfiltration.
- Protected `/admin/*` views and `/api/admin/*` endpoints are guarded by Next.js Edge Middleware and server-side authentication extractors.

---

## 📁 Project Structure

```text
Ethixweb/
├── public/
│   └── assets/
│       └── ethixweb-logo.webp      # Preserved high-res brand logo & favicon
├── src/
│   ├── app/
│   │   ├── (public pages)
│   │   │   ├── about/page.tsx      # Company story, leadership, values
│   │   │   ├── contact/page.tsx    # Interactive enquiry submission form
│   │   │   ├── privacy/page.tsx    # Privacy policy
│   │   │   ├── services/page.tsx   # Capabilities & catalog
│   │   │   ├── terms/page.tsx      # Terms of service
│   │   │   └── page.tsx            # Home landing page
│   │   ├── admin/
│   │   │   ├── leads/page.tsx      # Lead pipeline CRM table
│   │   │   ├── login/page.tsx      # Secure administrator login
│   │   │   ├── settings/page.tsx   # Global site metadata settings
│   │   │   ├── website/            # Visual CMS editors
│   │   │   │   ├── about/          # About page editor
│   │   │   │   ├── contact/        # Contact page editor
│   │   │   │   ├── home/           # Hero, stats, & CTA editor
│   │   │   │   ├── services/       # Services catalog editor
│   │   │   │   ├── testimonials/   # Client review editor
│   │   │   │   └── work/           # Portfolio & case studies editor
│   │   │   ├── layout.tsx          # Responsive admin shell & sidebar
│   │   │   └── page.tsx            # Main CRM metrics dashboard
│   │   └── api/
│   │       ├── admin/
│   │       │   ├── auth/           # Login, logout, session verification
│   │       │   ├── leads/          # Lead retrieval, filtering, status updates
│   │       │   ├── settings/       # Site settings configuration
│   │       │   ├── upload/         # Cloudinary asset upload stream
│   │       │   └── website/        # CMS persistence for pages & collections
│   │       └── enquiry/            # Public contact enquiry ingestion
│   ├── components/                 # Reusable UI, Layout, Home, Services, & Admin components
│   └── lib/
│       ├── auth.ts                 # JWT signing & verification utilities (AUTH_SECRET)
│       ├── cloudinary.ts           # Cloudinary SDK buffer stream integration
│       ├── cmsData.ts              # Server-side MongoDB content fetchers
│       ├── db.ts                   # Mongoose connection pool & caching
│       ├── models/                 # Mongoose schemas (Admin, Lead, Service, etc.)
│       ├── types/                  # TypeScript interfaces (cms.ts, leads.ts)
│       └── validators/             # Zod validation schemas
├── .env.example                    # Environment variable template
├── .gitignore                      # Git exclusion rules
├── next.config.mjs                 # Next.js configuration & image domains
├── package.json                    # Project dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS design system configuration
└── tsconfig.json                   # TypeScript compiler options
```

---

## ⚙️ Environment Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Populate the required configuration values in `.env.local`:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-domain>/ethixweb?retryWrites=true&w=majority

   # Admin Authentication Secret (HMAC-SHA256 Signing Key)
   AUTH_SECRET=your_high_entropy_auth_secret_here

   # Public Site Canonical URL
   NEXT_PUBLIC_SITE_URL=https://ethixweb-xi.vercel.app

   # Cloudinary Media Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

---

## 🛠️ Local Development & Build

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The application will start at [http://localhost:3000](http://localhost:3000).

### Run Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

---

## 🔐 Reviewer Demo Access

- **Admin Login Route**: `/admin/login`
- **Dashboard & CRM**: `/admin`
- **Leads Pipeline**: `/admin/leads`
- **Website CMS**: `/admin/website/home`, `/admin/website/services`, etc.

> **Security Notice**: Administrator credentials are not stored in plain text nor published publicly on GitHub. Reviewers can sign in using the authorized assessment email and password provided through the private assignment submission notes. The credentials are authenticated against salted bcrypt password hashes stored in MongoDB Atlas.

---

## 🌐 Deployment on Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: production release of Ethixweb"
   git push -u origin main
   ```
2. Import the project into [Vercel](https://vercel.com/).
3. Root Directory defaults to `./`.
4. Configure the Production Environment Variables matching `.env.example`:
   - `MONGODB_URI`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Click **Deploy**.
