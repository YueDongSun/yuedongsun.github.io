import type { Private_project } from '../lib/profile_contract';

export function Private_project_list({ projects }: { projects: Private_project[] }) {
  return (
    <div className="private_project_grid">
      {projects.map((project) => (
        <details className="private_project_card" key={project.id}>
          <summary>
            <span className={`private_project_mark mark_${project.motif}`} aria-hidden="true" />
            <span className="private_project_name">{project.title}</span>
            <span className="private_project_toggle" aria-hidden="true">＋</span>
          </summary>
          <div className="private_project_content">
            <p className="private_project_repo">Private repository · {project.repository_name}</p>
            <p className="private_project_summary">{project.description}</p>
            <p className="private_project_details">{project.details}</p>
            <ul className="project_tags" aria-label="Topics">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </details>
      ))}
      {projects.length === 0 && <p className="muted_text">Private projects will appear here as their public descriptions are ready.</p>}
    </div>
  );
}
