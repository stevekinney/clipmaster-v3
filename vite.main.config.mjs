import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main',
      fileName: 'main',
    },
  },
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
});
