// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Jack Trading',
			customCss: ['./src/styles/custom.css'],
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'Getting Started' },
				},
				{
					label: 'Creating Strategies',
					autogenerate: { directory: 'Creating' },
				},
				{	label: 'Running Strategies',
					autogenerate: { directory: 'Running'},
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
