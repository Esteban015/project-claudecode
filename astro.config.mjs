import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://comforting-starship-178312.netlify.app',
  integrations: [
    mdx(),
    tailwind(),
  ],
  output: 'static',
});
