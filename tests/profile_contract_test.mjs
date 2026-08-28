import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync as read_file_sync } from 'node:fs';
import { parse_profile } from '../lib/profile_contract.ts';

const profile_source = JSON.parse(read_file_sync(new URL('../config/profile.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

test('the reviewed CV profile preserves education, research, publications, and contact links', () => {
  const parsed_profile = parse_profile(profile_source);
  assert.equal(parsed_profile.display_name, 'Fonte');
  assert.equal(parsed_profile.contact_details.primary_email, 'syd23@mails.tsinghua.edu.cn');
  assert.equal(parsed_profile.contact_details.scholar_url, 'https://scholar.google.com/citations?user=0Sn386wAAAAJ&hl=en');
  assert.equal(parsed_profile.education.length, 2);
  assert.equal(parsed_profile.research_projects.length, 6);
  assert.equal(parsed_profile.research_projects.every((project) => project.figures.length > 0), true);
  assert.equal(parsed_profile.research_projects[0].figures.length, 2);
  assert.equal(parsed_profile.publications.length, 9);
  assert.equal(parsed_profile.projects.length, 4);
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
  assert.throws(() => parse_profile(invalid_figure), /must be a local research PNG/);
  invalid_figure.research_projects[0].figures[0].src = profile_source.research_projects[0].figures[0].src;
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
