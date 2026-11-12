import type { Publication_entry } from '../lib/profile_contract';
import { publication_visuals } from '../config/publication_visuals';
import { Figure_viewer } from './figure_viewer';
import styles from './research_visuals.module.css';

export function Publication_list({ publications }: { publications: Publication_entry[] }) {
  return (
    <div className="publication_rows">
      {publications.map((publication, index) => {
        const url = publication.url;
        const link_label = publication.link_label;
        const visual = publication_visuals[publication.id];
        return (
          <article className={`publication_entry ${styles.publicationRow} ${visual ? styles.withVisual : ''}`} key={publication.id}>
            <span className={`publication_index ${styles.paperIndex}`}>{String(index + 1).padStart(2, '0')}</span>
            {visual && <Figure_viewer {...visual} title={publication.title} source_label="Paper & figure source" compact className={styles.publicationVisual} sizes="(max-width: 700px) 110px, 160px" />}
            <div className="publication_copy">
              <h3>{url ? <a href={url} target="_blank" rel="noopener noreferrer">{publication.title}<span className="paper_arrow" aria-hidden="true"> ↗</span></a> : publication.title}</h3>
              <p className="publication_authors">{publication.reference}</p>
              <div className="publication_meta"><span className="publication_venue">{publication.venue}</span><span className="publication_status">{publication.status}</span><span className="publication_contribution">{publication.contribution}</span>{url && link_label && <a className="publication_source" href={url} target="_blank" rel="noopener noreferrer">{link_label} ↗</a>}</div>
              {visual && <p className={styles.paperFigureCaption}>{visual.caption} <a href={visual.source_url} target="_blank" rel="noopener noreferrer">Figure source ↗</a></p>}
            </div>
          </article>
        );
      })}
      <div className={styles.imageCredits}><a href="/papers/SOURCES.md" target="_blank" rel="noopener noreferrer">Image credits ↗</a></div>
    </div>
  );
}
