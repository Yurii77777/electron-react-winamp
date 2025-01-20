import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main/main.ts'),
      },
      plugins: [
        commonjs({
          ignoreDynamicRequires: true,
        }),
      ],
    },
  },
});
