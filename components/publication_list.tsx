import type { Publication_entry } from '../lib/profile_contract';
import { publication_visuals } from '../config/publication_visuals';
import { Figure_viewer } from './figure_viewer';
import styles from './research_visuals.module.css';

function Publication_feature({ publication }: { publication: Publication_entry }) {
  const visual = publication_visuals[publication.id];
  if (!visual) return null;
  const source_label = visual.source_label ?? (publication.status.startsWith('Published') ? 'Published figure' : 'Manuscript figure');
  return (
    <article className={styles.paperFeature}>
      <header className={styles.paperFeatureHeader}>
        <div className={styles.paperKicker}><span>{publication.venue}</span><span>{publication.status}</span></div>
        <h3>{publication.url ? <a href={publication.url} target="_blank" rel="noopener noreferrer">{publication.title}<span aria-hidden="true"> ↗</span></a> : publication.title}</h3>
        <p className={styles.paperAuthors}>{publication.reference}</p>
        <div className={styles.paperMeta}><span>{publication.contribution}</span>{publication.url && <a href={publication.url} target="_blank" rel="noopener noreferrer">{publication.link_label || 'Read paper'} ↗</a>}</div>
      </header>
      <Figure_viewer {...visual} title={publication.title} source_label={source_label} compact className={styles.paperFeatureVisual} sizes="(max-width: 700px) 100vw, 1120px" />
      <p className={styles.paperFigureCaption}>{visual.caption} {visual.source_url ? <a href={visual.source_url} target="_blank" rel="noopener noreferrer">{source_label} ↗</a> : <span className={styles.paperSourceLabel}>{source_label}</span>}</p>
    </article>
  );
}

export function Publication_list({ publications }: { publications: Publication_entry[] }) {
  const illustrated = publications.filter((publication) => publication.status.startsWith('Published') && publication_visuals[publication.id]);
  const collaborations = publications.filter((publication) => !publication.status.startsWith('Published') && !publication.status.startsWith('Preprint') && publication_visuals[publication.id]);
  const further = publications.filter((publication) => !illustrated.includes(publication) && !collaborations.includes(publication));

  return (
    <div className="publication_rows">
      <div className={styles.paperFeatures}>
        {illustrated.map((publication) => <Publication_feature key={publication.id} publication={publication} />)}
      </div>
      {collaborations.length > 0 && <section aria-labelledby="collaboration_papers_heading"><div className={styles.collaborationHeading}><p>ONGOING RESEARCH</p><h3 id="collaboration_papers_heading">Manuscripts & collaborations</h3></div><div className={styles.paperFeatures}>{collaborations.map((publication) => <Publication_feature key={publication.id} publication={publication} />)}</div></section>}
      {further.length > 0 && <div className={styles.furtherHeading}><h3>Further publications & manuscripts</h3><span>Research in print and in progress</span></div>}
      {further.map((publication, index) => {
        const visual = publication_visuals[publication.id];
        return (
          <article className={`publication_entry ${styles.publicationRow}`} key={publication.id}>
            <span className="publication_index">{String(index + 1).padStart(2, '0')}</span>
            <div className="publication_copy">
              <h3>{publication.url ? <a href={publication.url} target="_blank" rel="noopener noreferrer">{publication.title}<span className="paper_arrow" aria-hidden="true"> ↗</span></a> : publication.title}</h3>
              <p className="publication_authors">{publication.reference}</p>
              <div className="publication_meta"><span className="publication_venue">{publication.venue}</span><span className="publication_status">{publication.status}</span><span className="publication_contribution">{publication.contribution}</span>{publication.url && publication.link_label && <a className="publication_source" href={publication.url} target="_blank" rel="noopener noreferrer">{publication.link_label} ↗</a>}</div>
              {visual && <details className={styles.supplementFigure}><summary>{publication.status.startsWith('Preprint') ? 'Explore the preprint figure' : 'Explore the figure'} <span aria-hidden="true">＋</span></summary><Figure_viewer {...visual} title={publication.title} source_label={visual.source_label} className={styles.detailFigure} sizes="(max-width: 700px) 100vw, 800px" /></details>}
            </div>
          </article>
        );
      })}
      <div className={styles.imageCredits}><a href="/papers/SOURCES.md" target="_blank" rel="noopener noreferrer">Image credits ↗</a></div>
    </div>
  );
}
