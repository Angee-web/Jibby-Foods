import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { Analytics } from "@/components/seo/Analytics";
import "./globals.css";

const serif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Jibby Foods — Nigerian Pap Powders & Swallow Flours",
    template: "%s | Jibby Foods",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.name,
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f2e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${serif.variable} ${sans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal only when JS runs; if the app fails to start within 3s, content is shown anyway. */}
        <script dangerouslySetInnerHTML={{ __html: `var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__reveal)d.classList.remove('js')},3000)` }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
