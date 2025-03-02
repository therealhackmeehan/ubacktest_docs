// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'uBacktest docs',
			logo: {
				src: './src/assets/logo.png'
			},
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://www.googletagmanager.com/gtag/js?id=G-2FQJ7DZDET',
					},
				},
				{
					tag: 'script',
					content: `
				  window.dataLayer = window.dataLayer || [];
				  function gtag(){dataLayer.push(arguments);}
				  gtag('js', new Date());
		
				  gtag('config', 'G-2FQJ7DZDET');
				  `,
				},
			],
			favicon: './favicon.ico',
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: ['getting-started/intro', 'getting-started/simplewalkthrough'],
				},
				{
					label: 'Creating Strategies',
					items: ['creating/fundamentals', 'creating/workingwithdata', 'creating/creatingsignals', 'creating/partialtrades', 'creating/helpfulmoves', 'creating/pitfalls'],
				},
				{
					label: 'Running Strategies',
					items: ['running/backtestoptions', 'running/advancedbacktestoptions', 'running/myresults'],
				},
				{
					label: 'Deployment',
					badge: 'BETA',
					items: ['deployment/disclaimer', 'deployment/howitworks', 'deployment/tutorial'],
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'Examples' },
				},
			],
		}),
	],
});
