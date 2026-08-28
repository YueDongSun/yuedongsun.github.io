import type { Publication_contribution, Publication_entry } from '../lib/profile_contract';

const contribution_groups: Publication_contribution[] = ['Co-first author', 'Co-author'];

export function Publication_list({ publications }: { publications: Publication_entry[] }) {
  return (
    <div className="publication_groups">
      {contribution_groups.map((contribution) => {
        const group_publications = publications.filter((publication) => publication.contribution === contribution);
        if (group_publications.length === 0) return null;
        return (
          <div className="publication_group" key={contribution}>
            <p className="eyebrow">{contribution}</p>
            <div className="publication_rows">
              {group_publications.map((publication, publication_index) => (
                <article className="publication_entry" key={publication.id}>
                  <span className="publication_index">{String(publication_index + 1).padStart(2, '0')}</span>
                  <div className="publication_copy">
                    <h3>{publication.title}</h3>
                    <p>{publication.reference}</p>
                    <div className="publication_meta"><span>{publication.venue}</span><span className="publication_status">{publication.status}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
