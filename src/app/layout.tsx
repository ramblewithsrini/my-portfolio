import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { profile } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const defaultTitle = `${profile.name} — ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: defaultTitle,
    description: profile.tagline,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: profile.tagline,
  },
};

// Structured data so search engines recognise this as Srini's official site.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "Srinivasan Vankeepuram",
  jobTitle: profile.headline,
  description: profile.tagline,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  sameAs: profile.socials.map((s) => s.href),
  alumniOf: { "@type": "CollegeOrUniversity", name: "Madras University" },
  knowsAbout: [
    "Enterprise architecture",
    "Solution architecture",
    "Data strategy",
    "Data governance",
    "Payments",
    "Financial services",
    "Cloud-native architecture",
    "Agentic AI",
    "Pre-sales",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: the data is static and ours.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
