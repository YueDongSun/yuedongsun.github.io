import type { Contact_details as Contact_details_data } from '../lib/profile_contract';

export function Contact_details({ contact, github_username, github_url, availability }: {
  contact: Contact_details_data;
  github_username: string;
  github_url: string;
  availability: string;
}) {
  const primary_mailto = `mailto:${encodeURIComponent(contact.primary_email)}`;
  const secondary_mailto = `mailto:${encodeURIComponent(contact.secondary_email)}`;
  return (
    <div className="contact_details">
      <div className="contact_availability"><span className="status_dot" /> {availability}</div>
      <div className="contact_links">
        <a href={primary_mailto}>{contact.primary_email} <span aria-hidden="true">↗</span></a>
        <a href={secondary_mailto}>{contact.secondary_email} <span aria-hidden="true">↗</span></a>
        <a href={github_url} target="_blank" rel="noopener noreferrer">github.com/{github_username} <span aria-hidden="true">↗</span></a>
        <a href={contact.scholar_url} target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
