export type Project_motif = 'terminal' | 'orbit' | 'network' | 'calibration';

export interface Cv_entry {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Project_entry {
  id: string;
  title: string;
  repository_name: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
  motif: Project_motif;
}

export interface Profile_data {
  display_name: string;
  monogram: string;
  github_username: string;
  role: string;
  summary: string;
  site_url: string;
  email: string | null;
  is_complete: boolean;
  focus_areas: string[];
  experience: Cv_entry[];
  education: Cv_entry[];
  projects: Project_entry[];
}

const allowed_motifs: Project_motif[] = ['terminal', 'orbit', 'network', 'calibration'];
const github_username_pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const email_pattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const identifier_pattern = /^[a-z][a-z0-9_]*$/;

function require_record(value: unknown, field_name: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${field_name} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function require_text(value: unknown, field_name: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new TypeError(`${field_name} must be a nonempty string.`);
  }
  return value.trim();
}

function require_array(value: unknown, field_name: string): unknown[] {
  if (!Array.isArray(value)) throw new TypeError(`${field_name} must be an array.`);
  return value;
}

function require_https_url(value: unknown, field_name: string): string {
  const url_text = require_text(value, field_name);
  let parsed_url: URL;
  try {
    parsed_url = new URL(url_text);
  } catch (error) {
    throw new TypeError(`${field_name} must be a valid HTTPS URL.`, { cause: error });
  }
  if (parsed_url.protocol !== 'https:' || parsed_url.username || parsed_url.password) {
    throw new TypeError(`${field_name} must use HTTPS without embedded credentials.`);
  }
  return parsed_url.href.replace(/\/$/, '');
}

function parse_cv_entries(value: unknown, field_name: string): Cv_entry[] {
  return require_array(value, field_name).map((entry, entry_index) => {
    const entry_name = `${field_name}[${entry_index}]`;
    const record = require_record(entry, entry_name);
    return {
      title: require_text(record.title, `${entry_name}.title`),
      organization: require_text(record.organization, `${entry_name}.organization`),
      period: require_text(record.period, `${entry_name}.period`),
      description: require_text(record.description, `${entry_name}.description`),
    };
  });
}

export function parse_profile(value: unknown): Profile_data {
  const record = require_record(value, 'profile');
  const github_username = require_text(record.github_username, 'github_username');
  if (!github_username_pattern.test(github_username)) {
    throw new TypeError('github_username is not a valid GitHub username.');
  }
  const email = record.email === null ? null : require_text(record.email, 'email');
  if (email !== null && !email_pattern.test(email)) {
    throw new TypeError('email must be a valid address or null.');
  }
  if (typeof record.is_complete !== 'boolean') {
    throw new TypeError('is_complete must be a boolean.');
  }
  const site_url = require_https_url(record.site_url, 'site_url');
  if (new URL(site_url).search || new URL(site_url).hash) {
    throw new TypeError('site_url must not contain a query or fragment.');
  }
  const project_ids = new Set<string>();
  const projects = require_array(record.projects, 'projects').map((entry, entry_index) => {
    const entry_name = `projects[${entry_index}]`;
    const project = require_record(entry, entry_name);
    const project_id = require_text(project.id, `${entry_name}.id`);
    if (!identifier_pattern.test(project_id) || project_ids.has(project_id)) {
      throw new TypeError(`${entry_name}.id must be unique and use snake_case.`);
    }
    project_ids.add(project_id);
    const motif = require_text(project.motif, `${entry_name}.motif`) as Project_motif;
    if (!allowed_motifs.includes(motif)) throw new TypeError(`${entry_name}.motif is unsupported.`);
    return {
      id: project_id,
      title: require_text(project.title, `${entry_name}.title`),
      repository_name: require_text(project.repository_name, `${entry_name}.repository_name`),
      description: require_text(project.description, `${entry_name}.description`),
      category: require_text(project.category, `${entry_name}.category`),
      url: require_https_url(project.url, `${entry_name}.url`),
      tags: require_array(project.tags, `${entry_name}.tags`).map((tag, tag_index) =>
        require_text(tag, `${entry_name}.tags[${tag_index}]`)),
      motif,
    };
  });
  return {
    display_name: require_text(record.display_name, 'display_name'),
    monogram: require_text(record.monogram, 'monogram'),
    github_username,
    role: require_text(record.role, 'role'),
    summary: require_text(record.summary, 'summary'),
    site_url,
    email,
    is_complete: record.is_complete,
    focus_areas: require_array(record.focus_areas, 'focus_areas').map((area, area_index) =>
      require_text(area, `focus_areas[${area_index}]`)),
    experience: parse_cv_entries(record.experience, 'experience'),
    education: parse_cv_entries(record.education, 'education'),
    projects,
  };
}
