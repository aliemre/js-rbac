import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'rbac-in-memory',
    globals: {
      '@brainstaff/rbac': 'rbac'
    },
    preserveModules: true
  },
  external: [
    '@brainstaff/rbac'
  ],
  plugins: [
    typescript()
  ]
};
