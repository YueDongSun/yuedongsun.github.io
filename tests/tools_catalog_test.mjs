import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync as read_file_sync } from 'node:fs';
import { tool_principles, tool_questions, tools_catalog } from '../config/tools.ts';

test('the public tools catalog preserves product identity and evidence boundaries', () => {
  assert.deepEqual(tools_catalog.map((product) => product.id), ['tailnet_mesh', 'cc', 'vibemux']);
  assert.equal(new Set(tools_catalog.map((product) => product.id)).size, tools_catalog.length);
  assert.equal(tools_catalog.every((product) => /^[a-z][a-z0-9_]*$/.test(product.id)), true);
  assert.equal(tools_catalog.every((product) => product.capabilities.length === 3), true);
  assert.deepEqual(
    tools_catalog.map((product) => product.status),
    ['Self-hosted', 'Desktop preview', 'Pre-alpha'],
  );
  assert.equal(tools_catalog[0].repository_url, null);
  assert.equal(tools_catalog[1].repository_url, 'https://github.com/YueDongSun/ai-agent-gateway');
  assert.deepEqual(
    tools_catalog.filter((product) => product.repository_url).map((product) => product.id),
    ['cc', 'vibemux'],
  );
  assert.equal(tools_catalog[2].repository_url, 'https://github.com/YueDongSun/vibemux');
});

test('the tools page copy remains static, public-safe product overview content', () => {
  const reviewed_public_files = [
    '../app/tools/page.tsx',
    '../components/tools_showcase.tsx',
    '../components/tools_showcase.module.css',
    '../config/tools.ts',
    '../docs/tools_page.md',
  ];
  const public_copy = [
    JSON.stringify({ tools_catalog, tool_principles, tool_questions }),
    ...reviewed_public_files.map((relative_path) =>
      read_file_sync(new URL(relative_path, import.meta.url), 'utf8')),
  ].join('\n');
  for (const private_marker of [
    'file://', 'C:\\Users\\', 'C:\\\\Users\\\\', 'private.json', 'BEGIN OPENSSH', 'ghp_',
  ]) {
    assert.equal(public_copy.includes(private_marker), false, `unexpected private marker: ${private_marker}`);
  }
  assert.equal(tool_principles.length, 3);
  assert.equal(tool_questions.length, 4);
});
