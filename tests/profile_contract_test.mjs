import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync as read_file_sync } from 'node:fs';
import { parse_profile } from '../lib/profile_contract.ts';

const profile_source = JSON.parse(read_file_sync(new URL('./fixtures/reviewed_profile.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

// The historical content snapshot is a fixture, not a restriction on future profile edits.
test('the reviewed CV profile preserves education, research, publications, and contact links', () => {
  const parsed_profile = parse_profile(profile_source);
  assert.equal(parsed_profile.display_name, 'YuedongSun');
  assert.equal(parsed_profile.nickname, 'Fonte');
  assert.equal(parsed_profile.contact_details.primary_email, 'syd23@mails.tsinghua.edu.cn');
  assert.equal(parsed_profile.contact_details.secondary_email, 'yuedongsun02@gmail.com');
  assert.equal(parsed_profile.contact_details.scholar_url, 'https://scholar.google.com/citations?user=0Sn386wAAAAJ&hl=en');
  assert.equal(parsed_profile.education.length, 2);
  assert.equal(parsed_profile.research_projects.length, 6);
  assert.equal(parsed_profile.research_projects.every((project) => project.figures.length > 0), true);
  assert.equal(parsed_profile.research_projects[0].figures.length, 2);
  assert.equal(parsed_profile.publications.length, 9);
  assert.equal(parsed_profile.projects.length, 4);
  assert.equal(parsed_profile.private_projects.length, 5);
  assert.equal(parsed_profile.private_projects[0].repository_name, 'N_qubit');
  assert.equal(parsed_profile.is_complete, true);
});

test('unsafe or credential-bearing project links fail validation', () => {
  for (const unsafe_url of ['javascript:alert(1)', 'http://github.com/example', 'https://token@github.com/example', 'not a url']) {
    const invalid_profile = structuredClone(profile_source);
    invalid_profile.projects[0].url = unsafe_url;
    assert.throws(() => parse_profile(invalid_profile), /projects\[0\]\.url/);
  }
});

test('invalid records are reported rather than silently dropped', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.experience.push({ title: 'Incomplete role' });
  assert.throws(() => parse_profile(invalid_profile), /experience\[2\]\.organization/);
  const invalid_research = structuredClone(profile_source);
  invalid_research.research_projects[0].details = '';
  assert.throws(() => parse_profile(invalid_research), /research_projects\[0\]\.details/);
  const invalid_figure = structuredClone(profile_source);
  invalid_figure.research_projects[0].figures[0].src = 'https://example.com/image.png';
  assert.throws(() => parse_profile(invalid_figure), /must be a local research image/);
  invalid_figure.research_projects[0].figures[0].src = profile_source.research_projects[0].figures[0].src;
  invalid_figure.research_projects[0].figures[0].preview_src = '/research/../private.png';
  assert.throws(() => parse_profile(invalid_figure), /preview_src must be a local research image/);
  delete invalid_figure.research_projects[0].figures[0].preview_src;
  invalid_figure.research_projects[0].figures[0].source_url = 'javascript:alert(1)';
  assert.throws(() => parse_profile(invalid_figure), /source_url/);
  delete invalid_figure.research_projects[0].figures[0].source_url;
  invalid_figure.research_projects[0].figures[0].width = 0;
  assert.throws(() => parse_profile(invalid_figure), /positive integers/);
});

test('duplicate identifiers and unsupported project or publication values fail validation', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.projects[1].id = invalid_profile.projects[0].id;
  assert.throws(() => parse_profile(invalid_profile), /unique and use snake_case/);
  invalid_profile.projects[1].id = 'brisk';
  invalid_profile.projects[1].motif = 'unknown';
  assert.throws(() => parse_profile(invalid_profile), /motif is unsupported/);
  const invalid_publication = structuredClone(profile_source);
  invalid_publication.publications[0].contribution = 'Editor';
  assert.throws(() => parse_profile(invalid_publication), /contribution is unsupported/);
  const invalid_private_project = structuredClone(profile_source);
  invalid_private_project.private_projects[0].id = 'N-qubit';
  assert.throws(() => parse_profile(invalid_private_project), /unique and use snake_case/);
});

test('contact validation blocks multiline email input and malformed GitHub handles', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.contact_details.primary_email = 'hello@example.com\nBcc: other@example.com';
  assert.throws(() => parse_profile(invalid_profile), /contact_details\.primary_email/);
  invalid_profile.contact_details.primary_email = profile_source.contact_details.primary_email;
  invalid_profile.github_username = 'user/name';
  assert.throws(() => parse_profile(invalid_profile), /github_username/);
});

test('canonical URLs reject fragments and preserve a valid project subpath', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.site_url = 'https://example.github.io/#contact';
  assert.throws(() => parse_profile(invalid_profile), /query or fragment/);
  invalid_profile.site_url = 'https://example.github.io/cv/';
  assert.equal(parse_profile(invalid_profile).site_url, 'https://example.github.io/cv');
});


test('the editable public profile satisfies the same safety contract', () => {
  const current_profile = JSON.parse(read_file_sync(new URL('../config/profile.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
  assert.doesNotThrow(() => parse_profile(current_profile));
});

test('ordinary content updates may change contact details and collection sizes', () => {
  const updated_profile = structuredClone(profile_source);
  updated_profile.display_name = 'Example Researcher';
  updated_profile.contact_details.primary_email = 'researcher@example.org';
  updated_profile.research_projects.push({ ...updated_profile.research_projects[0], id: 'new_research_project' });
  updated_profile.publications.push({ ...updated_profile.publications[0], id: 'new_publication' });
  updated_profile.projects.push({ ...updated_profile.projects[0], id: 'new_repository' });
  const parsed_profile = parse_profile(updated_profile);
  assert.equal(parsed_profile.display_name, 'Example Researcher');
  assert.equal(parsed_profile.contact_details.primary_email, 'researcher@example.org');
  assert.equal(parsed_profile.research_projects.length, updated_profile.research_projects.length);
  assert.equal(parsed_profile.publications.length, updated_profile.publications.length);
  assert.equal(parsed_profile.projects.length, updated_profile.projects.length);
});
