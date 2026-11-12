import type { Contact_details as Contact_details_data } from '../lib/profile_contract';

export function Contact_details({ contact, github_username, github_url, availability }: {
  contact: Contact_details_data;
  github_username: string;
  github_url: string;
  availability: string;
}) {
  const emails = [contact.primary_email, contact.secondary_email].filter((email): email is string => Boolean(email));
  return (
    <div className="contact_details">
      <div className="contact_availability"><span className="status_dot" /> {availability}</div>
      <div className="contact_links">
        {emails.map((email) => <a key={email} href={`mailto:${encodeURIComponent(email)}`}>{email} <span aria-hidden="true">↗</span></a>)}
        <a href={github_url} target="_blank" rel="noopener noreferrer">github.com/{github_username} <span aria-hidden="true">↗</span></a>
        <a href={contact.scholar_url} target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
