import { spawnSync as spawn_sync } from 'node:child_process';
import { writeFileSync as write_file_sync } from 'node:fs';
import { createRequire as create_require } from 'node:module';
import { fileURLToPath as file_url_to_path } from 'node:url';

const project_directory = file_url_to_path(new URL('../', import.meta.url));
const require_module = create_require(import.meta.url);
const next_cli = require_module.resolve('next/dist/bin/next');
const build_environment = { ...process.env, cv_static_export: 'true', NEXT_TELEMETRY_DISABLED: '1' };

const build_result = spawn_sync(process.execPath, [next_cli, 'build', '--webpack'], {
  cwd: project_directory,
  env: build_environment,
  stdio: 'inherit',
  timeout: 300_000,
});

if (build_result.error) throw build_result.error;
if (build_result.status !== 0) process.exit(build_result.status ?? 1);
write_file_sync(new URL('../out/.nojekyll', import.meta.url), '');
