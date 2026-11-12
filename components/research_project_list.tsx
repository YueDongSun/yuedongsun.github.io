'use client';

import { useRef as use_ref } from 'react';
import type { Research_figure, Research_project } from '../lib/profile_contract';
import { Figure_viewer } from './figure_viewer';
import styles from './research_visuals.module.css';

const visual_selections = [
  { id: 'multiplexed_four_photon_entanglement', title: 'Cold atoms & optical control' },
  { id: 'rare_earth_memory_modeling', title: 'Rare-earth quantum systems' },
];

const legacy_previews: Record<string, string> = {
  '/research/aod_optical_relay.png': '/research/previews/aod_optical_relay.webp',
  '/research/cnn_bilstm_pipeline.png': '/research/previews/cnn_bilstm_pipeline.webp',
  '/research/oam_multiplexing.png': '/research/previews/oam_multiplexing.webp',
  '/research/rare_earth_hamiltonian.png': '/research/previews/rare_earth_hamiltonian.webp',
};

function preview_for(figure: Research_figure) {
  return figure.preview_src ?? legacy_previews[figure.src];
}

export function Research_project_list({ projects }: { projects: Research_project[] }) {
  const list_ref = use_ref<HTMLDivElement>(null);

  function set_all_open(open: boolean) {
    list_ref.current?.querySelectorAll('details').forEach((project) => { project.open = open; });
  }

  function open_project(id: string) {
    const details = document.getElementById(`research-${id}`);
    if (details instanceof HTMLDetailsElement) details.open = true;
  }

  return (
    <div className="research_portfolio">
      <div className={styles.researchGallery} aria-label="Research in pictures">
        {visual_selections.map((selection) => {
          const project = projects.find((candidate) => candidate.id === selection.id);
          const figure = project?.figures[0];
          if (!project || !figure) return null;
          return (
            <article className={styles.galleryCard} key={project.id}>
              <Figure_viewer {...figure} preview_src={preview_for(figure)} title={selection.title} source_label={figure.source_label ?? 'Research portfolio / CV'} compact sizes="(max-width: 900px) 100vw, 560px" />
              <div className={styles.galleryCopy}>
                <a href={`#research-${project.id}`} onClick={() => open_project(project.id)}>{selection.title}<span aria-hidden="true"> ↘</span></a>
                <p>{project.summary}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="research_toolbar" role="group" aria-label="Research project display">
        <span>Open a topic for methods, figures & context.</span>
        <button type="button" onClick={() => set_all_open(true)}>Expand all <span aria-hidden="true">＋</span></button>
        <button type="button" onClick={() => set_all_open(false)}>Collapse all <span aria-hidden="true">−</span></button>
      </div>
      <div className="research_list" ref={list_ref}>
        {projects.map((project, project_index) => (
          <details className="research_item" id={`research-${project.id}`} key={project.id}>
            <summary>
              <span className="research_index">{String(project_index + 1).padStart(2, '0')}</span>
              <span className="research_title">{project.title}<span className="research_preview">{project.summary}</span></span>
              <time>{project.period}</time>
              <span className="research_toggle" aria-hidden="true">＋</span>
            </summary>
            <div className="research_item_content">
              <p className="research_summary">{project.summary}</p>
              <p className="research_details">{project.details}</p>
              <div className={styles.detailGrid}>
                {project.figures.map((figure) => {
                  const wide = figure.width / figure.height >= 2.8 || (project.figures.length === 2 && project.figures.some((item) => item.width / item.height >= 2.8));
                  return <Figure_viewer key={figure.src} {...figure} preview_src={preview_for(figure)} title={project.title} source_label={figure.source_label ?? 'Research portfolio / CV'} className={`${styles.detailFigure}${wide ? ` ${styles.detailFigureWide}` : ''}`} sizes={wide ? '(max-width: 700px) 90vw, 1080px' : '(max-width: 760px) 90vw, 530px'} />;
                })}
              </div>
              <ul className="research_keywords" aria-label="Research keywords">
                {project.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
