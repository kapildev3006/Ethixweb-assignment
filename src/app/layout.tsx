import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#C0272D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ethixweb - Digital Growth for Indian Businesses',
  description:
    'We build high-performing websites, run result-driven Google Ads, and create digital marketing strategies that help Indian businesses grow, get more customers, and increase revenue.',
  keywords: [
    'Web Development India',
    'Google Ads India',
    'Digital Marketing Agency India',
    'D2C Web Development',
    'Next.js Development India',
    'Ethixweb',
  ],
  authors: [{ name: 'Ethixweb' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ethixweb.com'),
  openGraph: {
    title: 'Ethixweb - Digital Growth for Indian Businesses',
    description:
      'We build high-performing websites, run result-driven Google Ads, and create digital marketing strategies that help Indian businesses grow.',
    url: 'https://ethixweb.com',
    siteName: 'Ethixweb',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethixweb - Digital Growth for Indian Businesses',
    description:
      'We build high-performing websites, run result-driven Google Ads, and create digital marketing strategies that help Indian businesses grow.',
  },
  icons: {
    icon: '/assets/ethixweb-logo.webp',
    apple: '/assets/ethixweb-logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-white text-brand-charcoal antialiased flex flex-col font-sans selection:bg-brand-red-soft selection:text-brand-red">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
