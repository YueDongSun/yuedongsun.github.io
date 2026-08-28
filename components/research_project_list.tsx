import Image from 'next/image';
import type { Research_project } from '../lib/profile_contract';

export function Research_project_list({ projects }: { projects: Research_project[] }) {
  return (
    <div className="research_list">
      {projects.map((project, project_index) => (
        <details className="research_item" key={project.id} open={project_index === 0}>
          <summary>
            <span className="research_index">0{project_index + 1}</span>
            <span className="research_title">{project.title}</span>
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
  );
}
