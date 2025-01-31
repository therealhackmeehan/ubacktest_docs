// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Jack Trading',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'Getting Started' },
				},
				{
					label: 'Tutorial',
					autogenerate: { directory: 'Tutorial' },
				},
				{
					label: 'Deployment',
					autogenerate: { directory: 'Deployment' },
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'Examples' },
				},
			],
		}),
	],
});
