export type Project_motif = 'terminal' | 'orbit' | 'network' | 'calibration';
export type Publication_contribution = 'Co-first author' | 'Co-author';

export interface Cv_entry {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Research_project {
  id: string;
  title: string;
  period: string;
  summary: string;
  details: string;
  figures: Research_figure[];
  keywords: string[];
}

export interface Research_figure {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Publication_entry {
  id: string;
  contribution: Publication_contribution;
  title: string;
  venue: string;
  status: string;
  reference: string;
}

export interface Technical_skills {
  software: string[];
  systems: string[];
  research: string[];
  optical: string[];
}

export interface Contact_details {
  primary_email: string;
  secondary_email: string;
  scholar_url: string;
}

export interface Project_entry {
  id: string;
  title: string;
  repository_name: string;
  description: string;
  details: string;
  category: string;
  url: string;
  tags: string[];
  motif: Project_motif;
}

export interface Profile_data {
  display_name: string;
  nickname: string;
  monogram: string;
  github_username: string;
  role: string;
  summary: string;
  site_url: string;
  is_complete: boolean;
  availability: string;
  focus_areas: string[];
  languages: string[];
  technical_skills: Technical_skills;
  contact_details: Contact_details;
  experience: Cv_entry[];
  education: Cv_entry[];
  research_projects: Research_project[];
  publications: Publication_entry[];
  projects: Project_entry[];
}

const allowed_motifs: Project_motif[] = ['terminal', 'orbit', 'network', 'calibration'];
const allowed_contributions: Publication_contribution[] = ['Co-first author', 'Co-author'];
const github_username_pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const email_pattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const identifier_pattern = /^[a-z][a-z0-9_]*$/;
const research_asset_pattern = /^\/research\/[a-z][a-z0-9_]*\.png$/;

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

function parse_research_projects(value: unknown): Research_project[] {
  const project_ids = new Set<string>();
  return require_array(value, 'research_projects').map((entry, entry_index) => {
    const entry_name = `research_projects[${entry_index}]`;
    const project = require_record(entry, entry_name);
    const project_id = require_text(project.id, `${entry_name}.id`);
    if (!identifier_pattern.test(project_id) || project_ids.has(project_id)) {
      throw new TypeError(`${entry_name}.id must be unique and use snake_case.`);
    }
    project_ids.add(project_id);
    const figures = require_array(project.figures, `${entry_name}.figures`).map((figure, figure_index) => {
      const figure_name = `${entry_name}.figures[${figure_index}]`;
      const figure_record = require_record(figure, figure_name);
      const src = require_text(figure_record.src, `${figure_name}.src`);
      if (!research_asset_pattern.test(src)) throw new TypeError(`${figure_name}.src must be a local research PNG.`);
      const width = figure_record.width;
      const height = figure_record.height;
      if (typeof width !== 'number' || typeof height !== 'number' || !Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
        throw new TypeError(`${figure_name}.width and height must be positive integers.`);
      }
      return {
        src,
        alt: require_text(figure_record.alt, `${figure_name}.alt`),
        caption: require_text(figure_record.caption, `${figure_name}.caption`),
        width,
        height,
      };
    });
    return {
      id: project_id,
      title: require_text(project.title, `${entry_name}.title`),
      period: require_text(project.period, `${entry_name}.period`),
      summary: require_text(project.summary, `${entry_name}.summary`),
      details: require_text(project.details, `${entry_name}.details`),
      figures,
      keywords: require_array(project.keywords, `${entry_name}.keywords`).map((keyword, keyword_index) =>
        require_text(keyword, `${entry_name}.keywords[${keyword_index}]`)),
    };
  });
}

function parse_publications(value: unknown): Publication_entry[] {
  const publication_ids = new Set<string>();
  return require_array(value, 'publications').map((entry, entry_index) => {
    const entry_name = `publications[${entry_index}]`;
    const publication = require_record(entry, entry_name);
    const publication_id = require_text(publication.id, `${entry_name}.id`);
    if (!identifier_pattern.test(publication_id) || publication_ids.has(publication_id)) {
      throw new TypeError(`${entry_name}.id must be unique and use snake_case.`);
    }
    publication_ids.add(publication_id);
    const contribution = require_text(publication.contribution, `${entry_name}.contribution`) as Publication_contribution;
    if (!allowed_contributions.includes(contribution)) {
      throw new TypeError(`${entry_name}.contribution is unsupported.`);
    }
    return {
      id: publication_id,
      contribution,
      title: require_text(publication.title, `${entry_name}.title`),
      venue: require_text(publication.venue, `${entry_name}.venue`),
      status: require_text(publication.status, `${entry_name}.status`),
      reference: require_text(publication.reference, `${entry_name}.reference`),
    };
  });
}

function parse_contact_details(value: unknown): Contact_details {
  const record = require_record(value, 'contact_details');
  const primary_email = require_text(record.primary_email, 'contact_details.primary_email');
  const secondary_email = require_text(record.secondary_email, 'contact_details.secondary_email');
  for (const [field_name, email] of [['primary_email', primary_email], ['secondary_email', secondary_email]] as const) {
    if (!email_pattern.test(email)) throw new TypeError(`contact_details.${field_name} must be a valid address.`);
  }
  return {
    primary_email,
    secondary_email,
    scholar_url: require_https_url(record.scholar_url, 'contact_details.scholar_url'),
  };
}

function parse_technical_skills(value: unknown): Technical_skills {
  const record = require_record(value, 'technical_skills');
  const parse_skill_group = (group_name: keyof Technical_skills): string[] =>
    require_array(record[group_name], `technical_skills.${group_name}`).map((skill, skill_index) =>
      require_text(skill, `technical_skills.${group_name}[${skill_index}]`));
  return {
    software: parse_skill_group('software'),
    systems: parse_skill_group('systems'),
    research: parse_skill_group('research'),
    optical: parse_skill_group('optical'),
  };
}

export function parse_profile(value: unknown): Profile_data {
  const record = require_record(value, 'profile');
  const github_username = require_text(record.github_username, 'github_username');
  if (!github_username_pattern.test(github_username)) {
    throw new TypeError('github_username is not a valid GitHub username.');
  }
  if (typeof record.is_complete !== 'boolean') throw new TypeError('is_complete must be a boolean.');
  const site_url = require_https_url(record.site_url, 'site_url');
  const site_url_object = new URL(site_url);
  if (site_url_object.search || site_url_object.hash) throw new TypeError('site_url must not contain a query or fragment.');
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
      details: require_text(project.details, `${entry_name}.details`),
      category: require_text(project.category, `${entry_name}.category`),
      url: require_https_url(project.url, `${entry_name}.url`),
      tags: require_array(project.tags, `${entry_name}.tags`).map((tag, tag_index) =>
        require_text(tag, `${entry_name}.tags[${tag_index}]`)),
      motif,
    };
  });
  return {
    display_name: require_text(record.display_name, 'display_name'),
    nickname: require_text(record.nickname, 'nickname'),
    monogram: require_text(record.monogram, 'monogram'),
    github_username,
    role: require_text(record.role, 'role'),
    summary: require_text(record.summary, 'summary'),
    site_url,
    is_complete: record.is_complete as boolean,
    availability: require_text(record.availability, 'availability'),
    focus_areas: require_array(record.focus_areas, 'focus_areas').map((area, area_index) =>
      require_text(area, `focus_areas[${area_index}]`)),
    languages: require_array(record.languages, 'languages').map((language, language_index) =>
      require_text(language, `languages[${language_index}]`)),
    technical_skills: parse_technical_skills(record.technical_skills),
    contact_details: parse_contact_details(record.contact_details),
    experience: parse_cv_entries(record.experience, 'experience'),
    education: parse_cv_entries(record.education, 'education'),
    research_projects: parse_research_projects(record.research_projects),
    publications: parse_publications(record.publications),
    projects,
  };
}
