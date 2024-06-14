import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.html'),
      name: 'sprint_4',
      fileName: (format) => `sprint4.${format}.js`,
    },
    outDir: 'dist',
  },
  root: '.',
  plugins: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    handlebars(),
  ],
});
