import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// User site (wangyikang1996.github.io) serves from root, so base = '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
    // Don't scan Claude Code worktrees (gitignored) — they duplicate every test.
    exclude: [...configDefaults.exclude, '**/.claude/**'],
  },
});
