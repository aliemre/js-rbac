import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'rbac-http',
    globals: {
      '@brainstaff/rbac': 'rbac',
      'axios': 'axios'
    },
    preserveModules: true
  },
  external: [
    '@brainstaff/rbac',
    'axios'
  ],
  plugins: [
    typescript()
  ]
};
