import { spawn } from 'child_process';
import copy from 'rollup-plugin-copy';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import rebase from 'rollup-plugin-rebase';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		// format: 'iife',
		format: 'umd',
		inlineDynamicImports: true,
		name: 'app',
		file: 'public/build/bundle.js'
		// dir: 'public/build/'
	},
	makeAbsoluteExternalsRelative: true,
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// copy the images directory
		// rebase({
		// 	targets: [{ 
		// 		src: 'src/images/**/*', 
		// 		dest: 'public/images' 
		// 	}]
		// }),
		// bring in the bootstrap CSS
		copy({
            targets: [{ 
                src: 'node_modules/bootstrap/dist/**/*', 
                dest: 'public/vendor/bootstrap' 
            },{ 
                src: 'node_modules/bootstrap-icons/**/*', 
                dest: 'public/vendor/bootstrap-icons' 
            }	
		]
        }),		
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
