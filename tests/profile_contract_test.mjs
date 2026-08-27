import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync as read_file_sync } from 'node:fs';
import { parse_profile } from '../lib/profile_contract.ts';

const profile_source = JSON.parse(read_file_sync(new URL('../config/profile.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

test('the public profile loads without inventing contact or education details', () => {
  const parsed_profile = parse_profile(profile_source);
  assert.equal(parsed_profile.display_name, 'Fonte');
  assert.equal(parsed_profile.email, null);
  assert.deepEqual(parsed_profile.education, []);
  assert.equal(parsed_profile.is_complete, false);
  assert.equal(parsed_profile.projects.length, 4);
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
  assert.throws(() => parse_profile(invalid_profile), /experience\[1\]\.organization/);
});

test('duplicate project identifiers and unsupported art motifs fail validation', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.projects[1].id = invalid_profile.projects[0].id;
  assert.throws(() => parse_profile(invalid_profile), /unique and use snake_case/);
  invalid_profile.projects[1].id = 'brisk';
  invalid_profile.projects[1].motif = 'unknown';
  assert.throws(() => parse_profile(invalid_profile), /motif is unsupported/);
});

test('contact validation blocks multiline email input and malformed GitHub handles', () => {
  const invalid_profile = structuredClone(profile_source);
  invalid_profile.email = 'hello@example.com\nBcc: other@example.com';
  assert.throws(() => parse_profile(invalid_profile), /email/);
  invalid_profile.email = null;
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
