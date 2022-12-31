import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import terser from '@rollup/plugin-terser'
import sveltePreprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH
const preprocess = sveltePreprocess({
  sourceMap: true,
  postcss: true,
})
export default {
  // The file we created with our web component wrapper.
  input: 'src/lib/web-components.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    // We output it to public. This way, our svelte kit
    // app will also host the web components.
    file: 'package/web-components.js',
  },
  // Normal rollup svelte configuration. Nothing fancy
  // happening here.
  plugins: [
    typescript(),
    svelte({
      preprocess,
      include: /\.wc\.svelte$/,
      compilerOptions: {
        dev: !production,
        customElement: true,
      },
      // We just make sure that no global CSS is injeced
      // into the page that imports this script.
      emitCss: false,
    }),
    svelte({
      preprocess,
      exclude: /\.wc\.svelte$/
    }),
    resolve(),
    commonjs(),
    // Minify the production build (npm run build)
    // production && terser(),
  ],
}