'use client';

import { useState as use_state } from 'react';
import type { Project_entry } from '../lib/profile_contract';

const all_projects_label = 'All projects';

export function Project_gallery({ projects }: { projects: Project_entry[] }) {
  const [selected_category, set_selected_category] = use_state(all_projects_label);
  const [query, set_query] = use_state('');
  const categories = [all_projects_label, ...new Set(projects.map((project) => project.category))];
  const matches = (project: Project_entry) => (selected_category === all_projects_label || project.category === selected_category) && `${project.title} ${project.repository_name} ${project.category} ${project.description} ${project.details} ${project.tags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase());
  const visible_count = projects.filter(matches).length;

  return (
    <>
      <div className="project_toolbar">
        <label className="project_search"><span aria-hidden="true">⌕</span><span className="sr_only">Search projects</span><input type="search" placeholder="Find a project…" value={query} onChange={(event) => set_query(event.target.value)} /></label>
        <span className="project_count" aria-live="polite">{visible_count} / {projects.length} repositories</span>
      </div>
      <div className="project_filters" role="group" aria-label="Filter projects by area">
        {categories.map((category) => <button key={category} type="button" aria-pressed={selected_category === category} onClick={() => set_selected_category(category)}>{category}</button>)}
      </div>
      <div className="project_grid">
        {projects.map((project) => (
          <a className="project_card" key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" hidden={!matches(project)} aria-label={`View ${project.title} on GitHub (opens in a new tab)`}>
            <div className="project_card_top"><span className="project_category">{project.category}</span><span className="project_arrow" aria-hidden="true">↗</span></div>
            {(project as Project_entry & {status?: string}).status && <span className="project_status">{(project as Project_entry & {status?: string}).status}</span>}
            <h3>{project.title}</h3>
            <p className="project_description">{project.description}</p>
            <p className="project_detail">{project.details}</p>
            {(project as Project_entry & {attribution?: string}).attribution && <p className="project_attribution">{(project as Project_entry & {attribution?: string}).attribution}</p>}
            <ul className="project_tags" aria-label="Topics">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </a>
        ))}
      </div>
      {visible_count === 0 && <div className="empty_projects"><p>No projects match this search.</p><button type="button" onClick={() => {set_query(''); set_selected_category(all_projects_label);}}>Clear filters</button></div>}
    </>
  );
}
