'use client';

import { useRef as use_ref } from 'react';
import Image from 'next/image';
import type { Research_project } from '../lib/profile_contract';

export function Research_project_list({ projects }: { projects: Research_project[] }) {
  const list_ref = use_ref<HTMLDivElement>(null);

  function set_all_open(open: boolean) {
    list_ref.current?.querySelectorAll('details').forEach((project) => { project.open = open; });
  }

  return (
    <div className="research_portfolio">
      <div className="research_toolbar" role="group" aria-label="Research project display">
        <span>Open a topic for methods, figures & context.</span>
        <button type="button" onClick={() => set_all_open(true)}>Expand all <span aria-hidden="true">＋</span></button>
        <button type="button" onClick={() => set_all_open(false)}>Collapse all <span aria-hidden="true">−</span></button>
      </div>
      <div className="research_list" ref={list_ref}>
      {projects.map((project, project_index) => (
        <details className="research_item" key={project.id} >
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
              {project.figures.map((figure) => (
                <figure className="research_figure" key={figure.src}>
                  <Image className="research_figure_image" src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} sizes="(max-width: 700px) 100vw, 560px" loading="lazy" />
                  <figcaption>{figure.caption}</figcaption>
                </figure>
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
