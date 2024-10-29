import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    name: 'rbac-mongodb',
    preserveModules: true
  },
  external: [
    '@brainstaff/rbac',
    'mongoose'
  ],
  plugins: [
    typescript()
  ]
};
