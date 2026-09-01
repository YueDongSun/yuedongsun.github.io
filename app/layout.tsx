import type { Metadata } from 'next';
import { profile } from '../config/profile';
import './globals.css';

const site_title = `${profile.display_name} — ${profile.role}`;
const social_image_url = `${profile.site_url}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.site_url),
  title: site_title,
  description: profile.summary,
  alternates: { canonical: profile.site_url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.site_url,
    siteName: profile.display_name,
    title: site_title,
    description: profile.summary,
    images: [{ url: social_image_url, alt: `${profile.display_name} — Developer & Researcher` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site_title,
    description: profile.summary,
    images: [social_image_url],
  },
};

export default function Root_layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
