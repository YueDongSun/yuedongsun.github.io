import { sites } from '@openai/sites-vite-plugin';
import vinext from 'vinext';
import { defineConfig as define_config } from 'vite';

const use_polling = process.env.CODEX_SANDBOX === 'seatbelt';

export default define_config(async () => {
  // Keep tool state within this checkout; no application secrets are required.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';
  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    server: use_polling ? { watch: { useFsEvents: false, usePolling: true } } : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: {
          main: 'vinext/server/app-router-entry',
          compatibility_flags: ['nodejs_compat'],
        },
      }),
    ],
  };
});

