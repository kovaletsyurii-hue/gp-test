import { defineVitestConfig } from '@nuxt/test-utils/config';
import { loadEnv } from 'vite';

export default defineVitestConfig({
  test: {
    root: process.cwd(),
    // https://github.com/vitest-dev/vitest/issues/2117#issuecomment-1890908753
    env: loadEnv('', process.cwd(), ''),
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        },
      },
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['text-summary'],
      include: ['components/**/*.vue', 'utils/**/*.ts'],
    },
  },
});
