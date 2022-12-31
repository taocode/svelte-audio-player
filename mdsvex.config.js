import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import headings from '@vcarl/remark-headings'
import headingids from 'remark-heading-id'

export const remarkPlugins = [headingids, headings]

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins,
	rehypePlugins: []
});

export default config;
