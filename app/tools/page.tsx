import type { Metadata } from 'next';
import Link from 'next/link';
import { Site_header } from '../../components/site_header';
import { Tools_showcase } from '../../components/tools_showcase';
import { github_url, profile } from '../../config/profile';

const tools_title = `Tools — ${profile.display_name}`;
const tools_description =
  'Independent software for connected infrastructure, AI provider routing, and local-first coding workflows. Explore Tailnet Mesh, AI Agent Gateway, and VibeMux.';
const tools_url = `${profile.site_url}/tools/`;
const tools_image_url = `${profile.site_url}/tools/og.png`;

export const metadata: Metadata = {
  title: tools_title,
  description: tools_description,
  alternates: { canonical: tools_url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: tools_url,
    siteName: profile.display_name,
    title: tools_title,
    description: tools_description,
    images: [{
      url: tools_image_url,
      alt: 'Independent software by Yuedong Sun — Tailnet Mesh, AI Agent Gateway, and VibeMux',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: tools_title,
    description: tools_description,
    images: [tools_image_url],
  },
};

export default function Tools_page() {
  return (
    <div className="site_shell">
      <a className="skip_link" href="#main_content">Skip to content</a>
      <Site_header display_name={profile.display_name} current_page="tools" />
      <Tools_showcase github_url={github_url} />
      <footer className="site_footer">
        <span>{profile.display_name}<span className="wordmark_dot">.</span><span className="footer_caption">Independent tools, shared direction.</span></span>
        <span className="footer_platform">Agent systems · Infrastructure · Developer tools.</span>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </div>
  );
}
