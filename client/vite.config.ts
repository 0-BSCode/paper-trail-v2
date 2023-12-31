import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// TODO: Path aliases
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: [{ find: '@src', replacement: path.resolve(__dirname, 'src') }],
  },
});
