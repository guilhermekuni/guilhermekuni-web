import { defineConfig } from 'astro/config';
import addClasses from 'rehype-add-classes';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-3xl font-bold my-4',
          h2: 'text-2xl font-bold my-2',
          h3: 'text-xl font-bold my-2',
          h4: 'text-lg font-bold my-2',
          h5: 'font-bold my-2',
          h6: 'font-bold my-2',
          img: 'border border-slate-300 dark:border-zinc-700 rounded-xl mb-6 my-2',
          p: 'mb-6',
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500'
        }
      ]
    ]
  }
});
