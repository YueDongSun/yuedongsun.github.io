import type { Publication_entry } from '../lib/profile_contract';

export function Publication_list({ publications }: { publications: Publication_entry[] }) {
  return (
    <div className="publication_rows">
      {publications.map((publication, index) => {
        const url = (publication as Publication_entry & { url?: string }).url;
        const link_label = (publication as Publication_entry & { link_label?: string }).link_label;
        return (
          <article className="publication_entry" key={publication.id}>
            <span className="publication_index">{String(index + 1).padStart(2, '0')}</span>
            <div className="publication_copy">
              <h3>{url ? <a href={url} target="_blank" rel="noopener noreferrer">{publication.title}<span className="paper_arrow" aria-hidden="true"> ↗</span></a> : publication.title}</h3>
              <p className="publication_authors">{publication.reference}</p>
              <div className="publication_meta"><span className="publication_venue">{publication.venue}</span><span className="publication_status">{publication.status}</span><span className="publication_contribution">{publication.contribution}</span>{url && link_label && <a className="publication_source" href={url} target="_blank" rel="noopener noreferrer">{link_label} ↗</a>}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
