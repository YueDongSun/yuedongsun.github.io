'use client';

import { useRef as use_ref } from 'react';
import type { Research_project } from '../lib/profile_contract';
import { Figure_viewer } from './figure_viewer';
import styles from './research_visuals.module.css';

const visual_selections = [
  { id: 'multiplexed_four_photon_entanglement', title: 'Cold atoms & optical control', preview: '/research/previews/aod_optical_relay.webp' },
  { id: 'rare_earth_memory_modeling', title: 'Rare-earth quantum systems', preview: '/research/previews/rare_earth_hamiltonian.webp' },
];

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
              <Figure_viewer {...figure} preview_src={selection.preview} title={selection.title} source_label="Research portfolio / CV" compact sizes="(max-width: 700px) 100vw, 560px" />
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
              <div className="research_figures">
                {project.figures.map((figure, index) => (
                  <Figure_viewer key={figure.src} {...figure} preview_src={index === 0 ? visual_selections.find((item) => item.id === project.id)?.preview : undefined} title={project.title} source_label="Research portfolio / CV" className={styles.detailFigure} sizes="(max-width: 700px) 90vw, 420px" />
                ))}
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
