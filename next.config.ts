import type { NextConfig } from 'next';

const deployment_config = {
  static_export: process.env.cv_static_export === 'true',
  base_path: process.env.cv_base_path ?? '',
};

if (deployment_config.base_path !== '' && !/^\/(?:[a-zA-Z0-9_.-]+\/)*[a-zA-Z0-9_.-]+$/.test(deployment_config.base_path)) {
  throw new Error('cv_base_path must be empty or an absolute path without a trailing slash.');
}

const next_config: NextConfig = {
  output: deployment_config.static_export ? 'export' : undefined,
  basePath: deployment_config.base_path,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default next_config;

