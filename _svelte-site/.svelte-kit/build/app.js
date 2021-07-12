import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "../../src/hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-31bb19de.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-31bb19de.js","/./_app/chunks/vendor-9cfc1a77.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: /** @param {Error & {frame?: string}} error */ (error) => {
			if (error.frame) {
				console.error(error.frame);
			}
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":".DS_Store","size":6148,"type":null},{"file":"favicon.png","size":491,"type":"image/png"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/assets\/graphic-main\/?$/,
						params: empty,
						load: () => import("../../src/routes/assets/graphic-main.png")
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-3d17a974.js","css":["/./_app/assets/pages/__layout.svelte-dd366a70.css"],"js":["/./_app/pages/__layout.svelte-3d17a974.js","/./_app/chunks/vendor-9cfc1a77.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-54551ba3.js","css":[],"js":["/./_app/error.svelte-54551ba3.js","/./_app/chunks/vendor-9cfc1a77.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-6718e4b4.js","css":[],"js":["/./_app/pages/index.svelte-6718e4b4.js","/./_app/chunks/vendor-9cfc1a77.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}