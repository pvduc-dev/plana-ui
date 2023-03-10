import react from '@vitejs/plugin-react';
import path from 'node:path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  css: {
    modules: {
      generateScopedName: '[sha512:contenthash:base32:8]',
      hashPrefix: 'plana-ui'
    }
  },
  plugins: [
    react({
      jsxRuntime: 'classic'
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Plana',
      formats: ['es', 'umd'],
      fileName: (format) => `plana.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
