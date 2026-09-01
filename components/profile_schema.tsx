import { github_url, profile } from '../config/profile';

const profile_schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${profile.site_url}#profile`,
  mainEntity: {
    '@type': 'Person',
    '@id': `${profile.site_url}#person`,
    name: profile.display_name,
    alternateName: profile.nickname,
    description: profile.role,
    url: profile.site_url,
    sameAs: [github_url, profile.contact_details.scholar_url],
    knowsAbout: profile.focus_areas,
  },
};

const profile_schema_json = JSON.stringify(profile_schema).replace(/</g, '\\u003c');

export function Profile_schema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: profile_schema_json }} />;
}
