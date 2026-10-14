# Ethixweb — Enterprise Full-Stack Web Application

Ethixweb is a modern, high-performance web agency platform engineered with Next.js 14 App Router, TypeScript, Tailwind CSS, MongoDB Atlas, and Cloudinary. It features a public-facing website, a dynamic Content Management System (CMS), and a protected Administrator CRM for lead and enquiry pipeline management.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) & Vanilla CSS Glassmorphism
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose 8](https://mongoosejs.com/)
- **Media CDN**: [Cloudinary](https://cloudinary.com/) with server-side SDK streaming
- **Authentication**: Stateless HMAC-SHA256 JWT tokens with `httpOnly` secure cookies & bcrypt password hashing
- **Validation**: [Zod](https://zod.dev/) schemas for API payloads and form inputs
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Lucide React Icons

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
│       ├── auth.ts                 # JWT signing & verification utilities
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
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ethixweb?retryWrites=true&w=majority

   # Admin JWT Secret (HMAC-SHA256)
   JWT_SECRET=your-production-jwt-signing-secret

   # Public Site Canonical URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Cloudinary Media Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
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

## 🔐 Administrator Access

- **Admin Login Route**: `/admin/login`
- **Dashboard & CRM**: `/admin`
- **Leads Pipeline**: `/admin/leads`
- **Website CMS**: `/admin/website/home`, `/admin/website/services`, etc.

Admin accounts are securely stored in the MongoDB Atlas `admins` collection with salted bcrypt password hashes. Sessions are verified via signed, HTTP-only JWT cookies (`ethix_admin_token`).

---

## 🌐 Deployment on Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial production release of Ethixweb"
   git push -u origin main
   ```
2. Import the project into [Vercel](https://vercel.com/).
3. The Root Directory defaults to `./`.
4. Configure the Environment Variables matching `.env.local`:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Click **Deploy**.
