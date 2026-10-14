'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Code2,
  FileCode,
  Shield,
  Bot,
  Sparkles,
  Headphones,
  Users,
  Search,
  Target,
  Share2,
  Video,
  Mail,
  GitBranch,
  BarChart3,
  LineChart,
  CalendarCheck,
  Eye,
  CheckCheck,
  Wrench,
  RefreshCw,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export type ServiceCategory =
  | 'all'
  | 'website'
  | 'ai'
  | 'growth'
  | 'data'
  | 'accessibility'
  | 'support';

interface ServiceItem {
  id: string;
  number: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  indianUseCase: string;
  icon: React.ComponentType<{ className?: string }>;
  isFeatured?: boolean;
}

const categories: { id: ServiceCategory; name: string; count: number }[] = [
  { id: 'all', name: 'All Services', count: 22 },
  { id: 'website', name: 'Website Engineering', count: 4 },
  { id: 'ai', name: 'AI & Automation', count: 4 },
  { id: 'growth', name: 'Growth Engine', count: 6 },
  { id: 'data', name: 'Data & Analytics', count: 3 },
  { id: 'accessibility', name: 'Accessibility', count: 2 },
  { id: 'support', name: 'Operations & Support', count: 3 },
];

const allServices: ServiceItem[] = [
  // 1. Website Engineering (4)
  {
    id: 'website-redesign',
    number: '01',
    category: 'website',
    categoryLabel: 'Website Engineering',
    title: 'Website Redesign',
    tagline: 'Modern Digital Showcases Built to Sell',
    description:
      'A complete architectural rebuild replacing slow, outdated websites with modern high-conversion systems designed around your real customer sales journey.',
    capabilities: [
      'Custom Next.js & React responsive architecture',
      'Ultra-fast server-rendered performance',
      'High-conversion sales funnels & enquiry workflows',
      'Full SEO preservation with 301 redirect mapping',
    ],
    indianUseCase:
      'Engineered specifically for Indian mobile users on variable 4G/5G connections to eliminate bounce rates before lead form submission.',
    icon: Monitor,
    isFeatured: true,
  },
  {
    id: 'headless-architecture',
    number: '02',
    category: 'website',
    categoryLabel: 'Website Engineering',
    title: 'Headless Architecture',
    tagline: 'Decoupled Frontends for Massive Scale',
    description:
      'Decoupled frontend interfaces powered by Next.js and CDN edge caching, connected to modern headless CMS backends for rapid content authoring.',
    capabilities: [
      'Sub-500ms global edge response times',
      'Flexible CMS integration (Sanity, Strapi, WordPress Headless)',
      'Omnichannel content distribution',
      'Enhanced security with no exposed database endpoints',
    ],
    indianUseCase:
      'Allows high-growth Indian D2C and retail brands to update catalogs and festival banners in seconds without redeploying code.',
    icon: Code2,
  },
  {
    id: 'landing-pages',
    number: '03',
    category: 'website',
    categoryLabel: 'Website Engineering',
    title: 'High-Converting Landing Pages',
    tagline: 'Laser-Focused Paid Traffic Conversion',
    description:
      'Purpose-built, distraction-free landing pages engineered to maximize conversion rates from Google Ads, Meta campaigns, and outbound marketing.',
    capabilities: [
      'Single-action conversion optimization architecture',
      'Ultra-lean JavaScript payloads (<50KB initial load)',
      'A/B split-testing infrastructure built-in',
      'Immediate lead verification and WhatsApp click-to-chat hooks',
    ],
    indianUseCase:
      'Ideal for Indian real estate developers and clinic networks capturing high-intent Google Search ad traffic without leakage.',
    icon: FileCode,
  },
  {
    id: 'maintenance-security',
    number: '04',
    category: 'website',
    categoryLabel: 'Website Engineering',
    title: 'Maintenance & Security',
    tagline: 'Continuous Defense & Zero-Downtime Upkeep',
    description:
      'Proactive monitoring, regular framework security updates, dependency patches, and automated weekly backups to ensure continuous operational uptime.',
    capabilities: [
      '24/7 automated uptime & SSL certificate tracking',
      'Weekly security patching and vulnerability assessments',
      'Automated daily off-site cloud backups',
      'Performance regression monitoring & Core Web Vitals checks',
    ],
    indianUseCase:
      'Ensures critical Indian business web applications stay online and resilient during peak festival sale spikes (Diwali, Great Indian Festival).',
    icon: Shield,
  },

  // 2. AI & Automation (4)
  {
    id: 'knowledge-chatbot',
    number: '05',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    title: 'Knowledge Chatbot',
    tagline: 'Instant Answers from Structured Knowledge Bases',
    description:
      'Deterministic scripted and rule-based chatbots providing instant answers to common customer questions, operating hours, and standard pricing.',
    capabilities: [
      'Deterministic decision-tree customer routing',
      'Multi-language FAQ answer library',
      'Zero hallucination risk with verified reply scripts',
      'Instant lead contact information capture',
    ],
    indianUseCase:
      'Handles routine Indian customer queries regarding delivery pin codes, COD availability, and branch operational hours 24/7.',
    icon: Bot,
  },
  {
    id: 'llm-chatbot',
    number: '06',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    title: 'Custom LLM Chatbot',
    tagline: 'Reasoning AI Agents in Your Brand Voice',
    description:
      'Intelligent RAG (Retrieval-Augmented Generation) agents trained strictly on your documentation, service catalogs, and operating policies to handle complex user inquiries.',
    capabilities: [
      'Private RAG retrieval pipeline with zero data leakage',
      'Natural conversational tone matching brand guidelines',
      'Contextual recommendation based on customer criteria',
      'Automated ticket creation and CRM transcript logging',
    ],
    indianUseCase:
      'Understands colloquial Hinglish and localized product inquiries for Indian consumer brands, assisting customers like a senior sales consultant.',
    icon: Sparkles,
    isFeatured: true,
  },
  {
    id: 'ai-receptionist',
    number: '07',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    title: 'AI Receptionist & CSR',
    tagline: 'Around-the-Clock Digital Dispatcher',
    description:
      'Autonomous customer service representatives handling preliminary intake, qualification questions, and consultation scheduling across web and chat.',
    capabilities: [
      'Automated qualification of prospect budget & timeline',
      'Interactive calendar scheduling integration',
      'Instant SMS & WhatsApp confirmation dispatches',
      'Off-hours inquiry triage with urgent escalation triggers',
    ],
    indianUseCase:
      'Enables Indian professional practices (consultancies, law offices, medical clinics) to capture consultations outside of 9-to-6 office hours.',
    icon: Headphones,
  },
  {
    id: 'human-handoff',
    number: '08',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    title: 'Seamless Human Handoff',
    tagline: 'Smooth Bot-to-Human Live Escalation',
    description:
      'Intelligent routing protocols that instantly transfer active chat sessions to a human team member whenever high-ticket purchase intent or frustration is detected.',
    capabilities: [
      'Intent and sentiment detection triggers',
      'Full conversation context passed to the incoming agent',
      'Direct WhatsApp and web chat agent notification',
      'Graceful offline queueing when representatives are away',
    ],
    indianUseCase:
      'Ensures Indian enterprise prospects ready to book high-value retainers are immediately connected to a senior representative on WhatsApp.',
    icon: Users,
  },

  // 3. Growth Engine (6)
  {
    id: 'seo',
    number: '09',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Technical Architecture & Authority Dominance',
    description:
      'Comprehensive on-page, technical, and localized search optimization designed to establish compounding organic search rankings on high-intent terms.',
    capabilities: [
      'Technical Core Web Vitals and site structure audits',
      'Commercial high-intent keyword mapping',
      'Google Business Profile & local citation optimization',
      'Authoritative content blueprints and schema markup',
    ],
    indianUseCase:
      'Positions regional Indian service providers and B2B manufacturers at the top of Google for city-specific searches (e.g., "plumbing contractors in Bengaluru").',
    icon: Search,
  },
  {
    id: 'google-ads-lsa',
    number: '10',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'Google Ads & Local Service Ads',
    tagline: 'Precision In-Market Customer Acquisition',
    description:
      'High-intent search, display, and Local Service Ad campaigns planned and optimized weekly to capture prospects actively looking to buy.',
    capabilities: [
      'Exact-match negative keyword hygiene to prevent ad spend waste',
      'Targeted bidding strategies tuned for cost-per-lead',
      'Ad copywriting focused on verified trust metrics',
      'Offline conversion tracking and CRM pipeline synchronization',
    ],
    indianUseCase:
      'Eliminates wasted ad budgets by filtering out low-quality click inquiries and focusing Google spend strictly on verified commercial inquiries.',
    icon: Target,
    isFeatured: true,
  },
  {
    id: 'meta-ads',
    number: '11',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'Meta Advertising (Instagram & Facebook)',
    tagline: 'Visual Brand Storytelling & Retargeting',
    description:
      'High-impact visual creative, dynamic product ads, and smart retargeting sequences that nurture social media users into paying clients.',
    capabilities: [
      'Custom audience creation from website visitors and customer lists',
      'Direct WhatsApp and Lead Form ad funnels',
      'Dynamic creative testing across static, carousel, and video',
      'Server-side Conversions API (CAPI) tracking integration',
    ],
    indianUseCase:
      'Powers hyper-targeted Instagram campaigns for Indian lifestyle, D2C, and educational brands with 1-tap WhatsApp lead generation.',
    icon: Share2,
  },
  {
    id: 'social-reels',
    number: '12',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'Social Content & Reels Production',
    tagline: 'Short-Form Video & Organic Reach',
    description:
      'Strategic organic content calendars and engaging short-form video concepts engineered to build brand authority and organic audience engagement.',
    capabilities: [
      'Monthly content themes aligned with industry sales cycles',
      'Short-form vertical video (Reels & Shorts) storyboards',
      'Visual asset templates and brand identity guidelines',
      'Community engagement and inquiry triage strategy',
    ],
    indianUseCase:
      'Helps emerging Indian founders and SMEs build authentic LinkedIn and Instagram credibility without paying for vanity followers.',
    icon: Video,
  },
  {
    id: 'email-marketing',
    number: '13',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'Email & WhatsApp Automation',
    tagline: 'Nurture Sequences That Drive Repeat Revenue',
    description:
      'Automated email and messaging workflows that onboard new prospects, re-engage cold contacts, and drive compound lifetime customer value.',
    capabilities: [
      'Automated welcome and onboarding drip sequences',
      'Behavior-triggered abandoned cart & inquiry follow-ups',
      'Audience segmentation based on purchase history',
      'High deliverability configuration (DKIM, SPF, DMARC)',
    ],
    indianUseCase:
      'Combines transactional email with automated WhatsApp broadcast alerts for Indian customers who rarely check personal inboxes.',
    icon: Mail,
  },
  {
    id: 'crm-integration',
    number: '14',
    category: 'growth',
    categoryLabel: 'Growth Engine',
    title: 'CRM & Pipeline Integration',
    tagline: 'Automated Lead Flow with Zero Manual Data Entry',
    description:
      'Seamless webhook and API connections streaming website inquiries, ad responses, and chatbot leads straight into your sales pipeline.',
    capabilities: [
      'Native integration with Zoho, HubSpot, Salesforce, or LeadSquared',
      'Instant sales rep notifications via Slack, WhatsApp, or SMS',
      'Custom lead scoring and automated territory routing',
      'Full UTM parameter and acquisition campaign capture',
    ],
    indianUseCase:
      'Ensures Indian sales representatives receive incoming lead alerts on WhatsApp within 30 seconds of website form submission.',
    icon: GitBranch,
  },

  // 4. Data & Analytics (3)
  {
    id: 'performance-dashboard',
    number: '15',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    title: 'Live Performance Dashboard',
    tagline: 'Every Channel Consolidated in One View',
    description:
      'Custom interactive dashboards consolidating your website traffic, ad expenditures, conversion rates, and pipeline revenue in real time.',
    capabilities: [
      'Unified view of Google Ads, Meta, SEO, and website sessions',
      'Live cost-per-acquisition (CPA) and customer lifetime value metrics',
      'Role-based access for founders, executives, and marketing leads',
      'Automated weekly email summaries delivered to management',
    ],
    indianUseCase:
      'Provides Indian business owners complete transparency into daily marketing returns in INR without logging into five disparate ad portals.',
    icon: BarChart3,
  },
  {
    id: 'full-funnel-analytics',
    number: '16',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    title: 'Full-Funnel Analytics & Attribution',
    tagline: 'Connecting Ad Clicks to Cash in the Bank',
    description:
      'Robust server-side tracking and Multi-Touch Attribution models that show precisely which marketing channels drive closed sales and revenue.',
    capabilities: [
      'Google Analytics 4 (GA4) server-side container implementation',
      'Enhanced conversion tracking and revenue attribution',
      'Cross-domain tracking across landing pages and checkout portals',
      'Cookie consent management aligned with global privacy standards',
    ],
    indianUseCase:
      'Identifies whether high-ticket Indian customer inquiries originated from Google Search, Instagram Ads, or organic word-of-mouth.',
    icon: LineChart,
    isFeatured: true,
  },
  {
    id: 'monthly-reporting',
    number: '17',
    category: 'data',
    categoryLabel: 'Data & Analytics',
    title: 'Monthly ROI Reviews',
    tagline: 'Actionable Insights Over Vanity Dashboards',
    description:
      'Transparent, engineer-led monthly strategy sessions breaking down what was built, what performed, and what will be tested in the next sprint.',
    capabilities: [
      'Video strategy calls directly with senior engineers and practitioners',
      'Written audit of lead volume, quality scores, and CPA trends',
      'Clear roadmap of prioritized initiatives for the upcoming month',
      'No marketing jargon or deceptive vanity metric inflation',
    ],
    indianUseCase:
      'Gives Indian promoters and directors clear data points for board meetings and budget allocations without sales fluff.',
    icon: CalendarCheck,
  },

  // 5. Accessibility (2)
  {
    id: 'accessibility-improvements',
    number: '18',
    category: 'accessibility',
    categoryLabel: 'Accessibility',
    title: 'Accessibility Improvements',
    tagline: 'Inclusive UX That Works for Every User',
    description:
      'Architectural retrofits and UI enhancements ensuring compliant color contrast, intuitive screen reader navigation, and full keyboard interactivity.',
    capabilities: [
      'WCAG 2.1 AA compliant color contrast and focus indicators',
      'Semantic HTML5 structure and ARIA landmark implementation',
      'Keyboard-only navigation audits and skip-to-content links',
      'Accessible form controls with descriptive error validation states',
    ],
    indianUseCase:
      'Ensures Indian enterprise web portals are accessible across diverse regional demographics, assistive devices, and government accessibility norms.',
    icon: Eye,
  },
  {
    id: 'accessibility-testing',
    number: '19',
    category: 'accessibility',
    categoryLabel: 'Accessibility',
    title: 'Accessibility Testing & Compliance',
    tagline: 'Rigorous Verification Against WCAG Standards',
    description:
      'Systematic programmatic and manual accessibility audits verifying your website against recognized international accessibility benchmarks.',
    capabilities: [
      'Screen reader testing (NVDA, VoiceOver, JAWS)',
      'Automated axe-core and Lighthouse accessibility evaluations',
      'Formal accessibility audit report and remediation roadmap',
      'Ongoing regression testing on new page deployments',
    ],
    indianUseCase:
      'Prepares Indian software platforms and global delivery operations for international client compliance audits in US and EU jurisdictions.',
    icon: CheckCheck,
  },

  // 6. Operations & Support (3)
  {
    id: 'technical-support',
    number: '20',
    category: 'support',
    categoryLabel: 'Operations & Support',
    title: 'Dedicated Technical Support',
    tagline: 'Direct Senior Engineer Access When You Need It',
    description:
      'Direct engineering support channels for rapid bug triage, server issue resolution, domain configurations, and emergency operational assistance.',
    capabilities: [
      'Direct communication with senior engineers (no ticket dispatchers)',
      'Guaranteed emergency response SLAs for mission-critical issues',
      'Database health monitoring and query optimization',
      'Cloud infrastructure maintenance across Vercel, AWS, or DigitalOcean',
    ],
    indianUseCase:
      'Gives Indian founders peace of mind that a dedicated senior engineer is on call to resolve payment gateway or server anomalies instantly.',
    icon: Wrench,
  },
  {
    id: 'ai-content-updates',
    number: '21',
    category: 'support',
    categoryLabel: 'Operations & Support',
    title: 'AI Knowledge & Content Upkeep',
    tagline: 'Keeping Your AI Knowledge Base Fresh Every Month',
    description:
      'Continuous monthly curation of your chatbot prompts, RAG document vectors, pricing sheets, and website content to maintain factual precision.',
    capabilities: [
      'Monthly knowledge base document ingestion and re-indexing',
      'Prompt tuning based on real customer interaction transcripts',
      'Content updates for seasonal sales campaigns and service revisions',
      'Ongoing model temperature and accuracy calibration',
    ],
    indianUseCase:
      'Updates product availability, seasonal discount codes, and regulatory policies in your chatbot without disrupting live customer traffic.',
    icon: RefreshCw,
  },
  {
    id: 'api-maintenance',
    number: '22',
    category: 'support',
    categoryLabel: 'Operations & Support',
    title: 'API & Integration Maintenance',
    tagline: 'Continuous Health Monitoring of Critical Webhooks',
    description:
      'Continuous health monitoring, API version upgrades, and error logging for all third-party payment, CRM, messaging, and automation integrations.',
    capabilities: [
      'Automated webhook failure alerts and replay mechanisms',
      'API deprecation tracking and proactive migration',
      'Rate-limiting management and payload validation',
      'Payment gateway (Razorpay, Stripe, Cashfree) handshake monitoring',
    ],
    indianUseCase:
      'Prevents silent lead drop-offs by alerting the engineering team immediately if a third-party CRM webhook fails or changes its schema.',
    icon: Cpu,
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Code2,
  FileCode,
  Shield,
  Bot,
  Sparkles,
  Headphones,
  Users,
  Search,
  Target,
  Share2,
  Video,
  Mail,
  GitBranch,
  BarChart3,
  LineChart,
  CalendarCheck,
  Eye,
  CheckCheck,
  Wrench,
  RefreshCw,
  Cpu,
  Zap,
};

interface ServicesCatalogProps {
  initialServices?: any[];
}

export default function ServicesCatalog({ initialServices }: ServicesCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const servicesList: ServiceItem[] = initialServices && initialServices.length > 0
    ? initialServices.map((s) => ({
        id: s.slug || s.id,
        number: s.number,
        category: s.category as ServiceCategory,
        categoryLabel: s.categoryLabel,
        title: s.title,
        tagline: s.tagline || '',
        description: s.description,
        capabilities: s.capabilities || [],
        indianUseCase: s.indianUseCase || '',
        icon: iconMap[s.iconName] || Zap,
        isFeatured: s.isFeatured,
      }))
    : allServices;

  const dynamicCategories = categories.map((cat) => ({
    ...cat,
    count: cat.id === 'all' ? servicesList.length : servicesList.filter((s) => s.category === cat.id).length,
  }));

  const filteredServices =
    activeCategory === 'all'
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="services-catalog">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>22 Verified Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Our Complete Service Portfolio
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Every capability needed to build, automate, and grow an authoritative digital presence in India and global markets.
          </p>
        </div>

        {/* Interactive Category Filter Pills Bar */}
        <div className="mb-12 sm:mb-16">
          <div
            role="tablist"
            aria-label="Filter services by category"
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
          >
            {dynamicCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="services-list"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 touch-manipulation ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md shadow-brand-red/20 hover:bg-brand-red-dark'
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900 border border-gray-200/60'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-gray-600 border border-gray-200/60'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services List / Grid */}
        <div id="services-list" className="space-y-8 sm:space-y-10">
          {/* Grid of Services with Asymmetric Highlight for Featured Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => {
              const Icon = service.icon;

              // If service is featured and viewing all or its category, render with prominent highlight
              if (service.isFeatured) {
                return (
                  <div
                    key={service.id}
                    className="md:col-span-2 lg:col-span-2 group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-red-50/20 to-white border-2 border-red-200/90 shadow-md hover:shadow-xl transition-all duration-300 min-w-0"
                  >
                    {/* Featured Ribbon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                        <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                        <span>Flagship Capability</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-400">
                        {service.number} / 22
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left: Info & Description */}
                      <div className="md:col-span-7 space-y-4 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-red-100/70 text-brand-red flex items-center justify-center border border-red-200 flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block">
                              {service.categoryLabel}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                          {service.tagline}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {service.description}
                        </p>

                        {/* India Use Case Box */}
                        <div className="p-3.5 rounded-xl bg-white border border-red-100 shadow-2xs space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-900 uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span>Practical Indian Business Application:</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">
                            {service.indianUseCase}
                          </p>
                        </div>
                      </div>

                      {/* Right: Key Capabilities Checklist & CTA */}
                      <div className="md:col-span-5 flex flex-col justify-between h-full space-y-5 pt-3 md:pt-0 md:pl-4 md:border-l md:border-gray-200/70">
                        <div className="space-y-2.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                            Included Capabilities:
                          </span>
                          <ul className="space-y-2">
                            {service.capabilities.map((cap, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                          <Link
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-red text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-brand-red-dark transition-colors"
                          >
                            <span>Enquire Now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            Available This Sprint
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Standard Service Card
              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card-hover hover:border-red-200 transition-all duration-300 min-w-0"
                >
                  <div className="space-y-4">
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-brand-red transition-colors">
                        {service.categoryLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-300">
                        {service.number}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-2xs flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Capabilities List */}
                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      {service.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <span className="w-1 h-1 rounded-full bg-brand-red flex-shrink-0 mt-2" />
                          <span className="leading-snug">{cap}</span>
                        </div>
                      ))}
                    </div>

                    {/* India Use Case Box */}
                    <div className="p-3 rounded-lg bg-gray-50/80 border border-gray-200/60 text-[11px] text-gray-600 leading-relaxed">
                      <span className="font-semibold text-gray-900 block mb-0.5">
                        India Market Use Case:
                      </span>
                      <span>{service.indianUseCase}</span>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                    >
                      <span>Inquire About Service</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
