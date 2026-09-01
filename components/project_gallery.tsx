'use client';

import { useState as use_state } from 'react';
import type { Project_entry } from '../lib/profile_contract';

const all_projects_label = 'All projects';

export function Project_gallery({ projects }: { projects: Project_entry[] }) {
  const [selected_category, set_selected_category] = use_state(all_projects_label);
  const categories = [all_projects_label, ...new Set(projects.map((project) => project.category))];
  const visible_count = projects.filter((project) => selected_category === all_projects_label || project.category === selected_category).length;

  return (
    <>
      <div className="project_toolbar">
        <div className="project_filters" role="group" aria-label="Filter projects by area">
          {categories.map((category) => (
            <button key={category} type="button" aria-pressed={selected_category === category}
              onClick={() => set_selected_category(category)}>{category}</button>
          ))}
        </div>
        <span className="project_count" aria-live="polite">{visible_count} {visible_count === 1 ? 'repository' : 'repositories'}</span>
      </div>
      <div className="project_grid">
        {projects.map((project, project_index) => (
          <a className="project_card" key={project.id} href={project.url} target="_blank" rel="noopener noreferrer"
            hidden={selected_category !== all_projects_label && project.category !== selected_category}
            aria-label={`View ${project.title} on GitHub (opens in a new tab)`}>
            <div className={`project_art art_${project.motif}`} aria-hidden="true">
              <span className="art_index">{String(project_index + 1).padStart(2, '0')} / {project.category.toUpperCase()}</span>
              {project.motif === 'terminal' && <div className="terminal_window"><div className="terminal_dots"><i /><i /><i /></div><p><span>~/</span> {project.repository_name}</p><p className="terminal_command">plan <span>→</span> build <span>→</span> verify<span className="terminal_cursor">_</span></p></div>}
              {project.motif === 'orbit' && <div className="quantum_orbits"><i /><i /><i /><b>ψ</b><span className="quantum_point" /></div>}
              {project.motif === 'network' && <div className="agent_network"><span className="agent_node">Think</span><i /><span className="agent_node central_node">Create</span><i /><span className="agent_node">Refine</span></div>}
              {project.motif === 'calibration' && <div className="calibration_graph"><i /><i /><i /><i /><i /><i /><i /><span>tune · measure · learn</span></div>}
              <span className="art_corner">↗</span>
            </div>
            <div className="project_body">
              <div className="project_title_row"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
              <p>{project.description}</p>
              <p className="project_detail">{project.details}</p>
              <ul className="project_tags" aria-label="Topics">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
          </a>
        ))}
      </div>
      {projects.length === 0 && <p className="muted_text">Selected projects will appear here when added to the profile.</p>}
    </>
  );
}
