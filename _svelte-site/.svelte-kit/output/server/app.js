import { respond } from "@sveltejs/kit/ssr";
import cookie from "cookie";
import { v4 } from "@lukeed/uuid";
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
const css = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
const handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
const template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
let options = null;
const default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-31bb19de.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-31bb19de.js", "/./_app/chunks/vendor-9cfc1a77.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      if (error2.frame) {
        console.error(error2.frame);
      }
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
const empty = () => ({});
const manifest = {
  assets: [{ "file": ".DS_Store", "size": 6148, "type": null }, { "file": "favicon.png", "size": 491, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/assets\/graphic-main\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return graphicMain;
      })
    }
  ]
};
const get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve }) => resolve(request)),
  serverFetch: hooks.serverFetch || fetch
});
const module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
const metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-3d17a974.js", "css": ["/./_app/assets/pages/__layout.svelte-dd366a70.css"], "js": ["/./_app/pages/__layout.svelte-3d17a974.js", "/./_app/chunks/vendor-9cfc1a77.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-54551ba3.js", "css": [], "js": ["/./_app/error.svelte-54551ba3.js", "/./_app/chunks/vendor-9cfc1a77.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-6718e4b4.js", "css": [], "js": ["/./_app/pages/index.svelte-6718e4b4.js", "/./_app/chunks/vendor-9cfc1a77.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var mainImg = "/_app/assets/graphic-main.c1ffb4bc.png";
var graphicMain = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": mainImg
});
var app = "/* fira-mono-cyrillic-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__b3140dd3__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* fira-mono-cyrillic-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__046b609f__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* fira-mono-greek-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__8659ae46__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* fira-mono-greek-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__1f8b3a07__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* fira-mono-latin-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__b6331a25__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* fira-mono-latin-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('__VITE_ASSET__a2f9dbe8__') format('woff2'), url('__VITE_ASSET__0d19eb5d__') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n:root {\n	font-family: Times, 'Times New Roman', serif;\n	font-size: 16px;\n	--font-mono: 'Fira Mono', monospace;\n	--pure-white: #ffffff;\n	--bg-color: #f2ecc3;\n	--primary-color: #b9c6d2;\n	--secondary-color: #d0dde9;\n	--tertiary-color: #edf0f8;\n	--accent-color: #ff3e00;\n	--heading-color: rgba(0, 0, 0, 0.7);\n	--text-color: #444444;\n	--background-without-opacity: rgba(255, 255, 255, 0.7);\n	--column-width: 42rem;\n	--column-margin-top: 4rem;\n}\nbody {\n	margin: 0;\n	background-color: var(--bg-color);\n}\na {\n	text-decoration: none;\n}\nbutton {\n	background: none;\n	color: inherit;\n	border: none;\n	padding: 0;\n	margin: 0;\n	font: inherit;\n	cursor: pointer;\n	outline: inherit;\n}\niframe {\n	border: 0;\n}\nbutton:focus:not(:focus-visible) {\n	outline: none;\n}\nnav, ul, li {\n    display: flex;\n    justify-content: space-between;\n    padding: 0;\n    margin: 0;\n}\nul, li {\n	list-style: none;\n}\n#svelte {\n	height: 100vh;\n	width: 100vw;\n	display: flex;\n	flex-direction: column;\n	overflow: hidden;\n}\nheader, footer {\n    display: flex;\n    position: fixed;\n    left: 0;\n    right: 0;\n}\nheader {\n	justify-content: flex-end;\n	z-index: 11;\n	top: 0;\n}\nheader nav {\n	padding: 1rem;\n}\nheader button {\n	height: 1.3rem;\n	margin-left: .5rem;\n}\nmain {\n/*    background-image: url('graphic-main.png');\n    background-position: center center;\n    background-size: contain;\n    background-repeat: no-repeat;\n*/\n	position: fixed;\n    display: flex;\n    top: 12vh;\n    bottom: 18vh;\n    left: 22vw;\n    right: 22vw;\n    margin: 0 auto;\n    justify-content: center;\n    align-items: flex-start;\n}\nmain img {\n	display: flex;\n	position: relative;\n	z-index: 0;\n	width: 100%;\n	height: 100%;\n    object-fit: contain;\n    min-height: 346px;\n    max-height: 780px;\n    min-width: 232px;\n    max-width: 520px;\n}\nbutton.booking {\n	position: absolute;\n	display: flex;\n	left: calc(50% + 150px);\n	top: 8%;\n    max-width: 242px;\n    height: 44%;\n    max-height: 291px;\n    font-size: 1.3rem;\n	text-align: left;\n	font-weight: 100;\n	z-index: 1;\n}\nbutton.booking svg {\n	position: absolute;\n	z-index: 0;\n	height: 120%;\n	top: -10%;\n	left: -2%;\n}\nbutton.booking div {\n	position: relative;\n	z-index: 1;\n	top: 40%;\n	pointer-events: none;\n}\n.booking-modal {\n	display: none;\n	position: absolute;\n	top: 0;\n	left: 0;\n	width: 0;\n	height: 0;\n	overflow: hidden;\n	z-index: -1;\n}\n.booking-modal.is-open-true {\n	display: flex;\n	align-items: center;\n	z-index: 10;\n	width: 100vw;\n	height: 100vh;\n}\n.modal-bg {\n	position: absolute;\n	left: 0;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	background: rgba(0,0,0,0.75);\n	z-index: 0;\n	transition: 200ms ease;\n}\n.iframe-wrap {\n	position: relative;\n	z-index: 1;\n	display: flex;\n	margin: 0 auto;\n	height: 520px;\n	width: 320px;\n	padding: 1rem;\n	border-radius: 20px;\n	border: 1rem solid white;\n	background-color: #f8f8f8;\n	transition: 200ms ease 200ms;\n	top: -5%;\n}\niframe.booking-iframe {\n	height: 520px;\n	width: 320px;\n}\nfooter {\n    bottom: 0;\n    justify-content: flex-start;\n    font-size: 14px;\n    line-height: 2em;\n}\nfooter ul {\n	padding: 1rem;\n}\nfooter p {\n    display: flex;\n    align-self: center;\n    margin: 0;\n    padding: 0;\n}\nfooter li a {\n    display: flex;\n    height: 1.6rem;\n    margin-right: 1rem;\n}\n@media (max-width: 767px) {\n	:root {\n		font-size: 15px;\n	}\n\n	button.booking {\n		position: fixed;\n		top: 13vw;\n	}\n\n	button.booking svg {\n		left: -30%;\n		top: 0;\n		height: 100%;\n	}\n}\n@media (max-width: 600px) {\n	:root {\n		font-size: 13px;\n	}\n\n	main {\n		top: 10vh;\n	}\n\n	button.booking {\n		position: absolute;\n		top: 65%;\n		left: 75%;\n		height: 35%;\n	}\n\n	button.booking svg {\n		left: -30%;\n		top: 0;\n		height: 100%;\n	}\n}\n@media (max-width: 480px) {\n	:root {\n		font-size: 12px;\n	}\n\n	main {\n		top: 13vh;\n		bottom: auto;\n	}\n\n	button.booking {\n		position: fixed;\n		top: auto;\n		bottom: 18%;\n		height: 50vw;\n		left: 50%;\n	}\n\n	button.booking svg {\n		left: -7%;\n		top: 0;\n		height: 110%;\n	}\n}\n";
var svgs = "/* SVG Shapes and Colors */\nsvg {\n	width: auto;\n	height: 100%;\n}\nsvg * {\n	transition: 200ms ease;\n}\n\nbutton.booking svg .cls-1 {fill:#FFE18D;}\nbutton.booking svg:hover .cls-1 {fill:#fdd867;}\n\n.is-active-false svg:not(:hover) {opacity: 0.6;}\n\n.icon-FB svg {height: 75%; margin-top: 30%;}\n.icon-FB svg .cls-1 {fill:#6a8bbe;}\n.icon-FB svg:hover .cls-1 {fill:#3D5C98;}\n\n.icon-IG svg .cls-1 {fill:#eb559d;}\n.icon-IG svg .cls-2 {fill:#a073af;}\n.icon-IG svg .cls-3 {fill:#f69859;}\n.icon-IG svg:hover .cls-1 {fill:#DB2B7D;}\n.icon-IG svg:hover .cls-2 {fill:#7B4798;}\n.icon-IG svg:hover .cls-3 {fill:#F38533;}\n\n.icon-PT svg .cls-1 {fill:#ED4A56;}\n.icon-PT svg .cls-2 {fill:#327F52;}\n.icon-PT svg .cls-3 {fill:#F3EA6E;}\n.icon-PT svg:hover .cls-1,\n.icon-PT.is-active-true .cls-1 {fill:#EB252E;}\n.icon-PT svg:hover .cls-2,\n.icon-PT.is-active-true .cls-2 {fill:#156737;}\n.icon-PT svg:hover .cls-3,\n.icon-PT.is-active-true .cls-3 {fill:#F2E942;}\n\n.icon-GB svg .cls-1 {fill:#404980;}\n.icon-GB svg .cls-2 {fill:#fff;}\n.icon-GB svg .cls-3 {fill:#e55266;}\n.icon-GB svg:hover .cls-1,\n.icon-GB.is-active-true .cls-1 {fill:#272d62;}\n.icon-GB svg:hover .cls-3,\n.icon-GB.is-active-true .cls-3 {fill:#c72336;}\n";
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
const iconPt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.9 26.04"><g id="PR"><path class="cls-1" d="M23,11.61a2.35,2.35,0,0,0-.11-.68,2.14,2.14,0,0,0,.59-2.36c-.18-.59-.37-1.17-.55-1.75A2.34,2.34,0,0,0,23,6.23a2.4,2.4,0,0,0-1-1.94,2.25,2.25,0,0,0,.15-.55A2.53,2.53,0,0,0,20.38,1,10.24,10.24,0,0,0,12,1.86c-.45.13-.89.27-1.33.42-2.85,1-5.88,1.92-8.22,3.86,0,0,0,0,0,0A2.4,2.4,0,0,0,.7,7.84,20,20,0,0,0,0,14a24.38,24.38,0,0,0,.41,4.9c-.06.47-.12.94-.15,1.42-.12,1.55-.11,3.57,1.07,4.75A4.1,4.1,0,0,0,5,26c1.6-.18,3.19-.42,4.77-.71.75-.14,1.49-.3,2.23-.47a33.83,33.83,0,0,0,6.75.07,3.92,3.92,0,0,0,2.65-1,3.72,3.72,0,0,0,.92-2.36c.15-1.49.28-3,.34-4.49a4.21,4.21,0,0,0-.1-1.13c0-.19.05-.38.08-.56A35.85,35.85,0,0,0,23,11.61Z"/><path class="cls-2" d="M39.49,10.83A25.1,25.1,0,0,0,37,2.43,3.88,3.88,0,0,0,33.91.6,41.53,41.53,0,0,0,29.32.11h0A13.09,13.09,0,0,0,27,0c-4,.17-8,.64-12,.67a1.39,1.39,0,0,0-.75.24C13,.76,11.8,2.37,13,3.4,17.29,7,18.25,12.65,19.6,17.94a2.07,2.07,0,0,0,0,.7l.6,4v.11c-.69,1,.1,2.78,1.58,2.31A28.52,28.52,0,0,1,32,23.91a8.2,8.2,0,0,0,1.64-.08c.13,0,.25,0,.37-.06l.16,0,.15-.05a4,4,0,0,0,1.56-.79,1.59,1.59,0,0,0,1.36-1.36,5.36,5.36,0,0,0,1.9-2.26C40.3,16.71,39.88,13.52,39.49,10.83Z"/><path class="cls-3" d="M20.91,10.23A4.23,4.23,0,0,0,18,7.13,3.85,3.85,0,0,0,16.66,7a4.43,4.43,0,0,0-1.81.51,3.88,3.88,0,0,0-1.37,1.3,2.19,2.19,0,0,0-.23.58c0,.07-.09.12-.13.19a4.25,4.25,0,0,0-.64,2.48,4.4,4.4,0,0,0,.24,1.3,8.06,8.06,0,0,0,.38.86,6.7,6.7,0,0,0,.58.79,3,3,0,0,0,.5.5,3.67,3.67,0,0,0,2.34,1,4.41,4.41,0,0,0,2.9-1.41,5.56,5.56,0,0,0,1.42-2.28A4.85,4.85,0,0,0,20.91,10.23Z"/></g></svg>';
const iconGb = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.29 25.2"><g id="GB"><path class="cls-1" d="M37.56,3.39a3.74,3.74,0,0,0-.69-.57A5.1,5.1,0,0,0,36.49,2C35.68.58,34.28.28,32.79.24c-2-.06-4.06-.06-6.09,0L23.92.28,21.85,0a2.47,2.47,0,0,0-1.77.43,172.67,172.67,0,0,0-19,2.11A1.38,1.38,0,0,0,.46,5a4.34,4.34,0,0,0,.65,4.29c.14.9.27,1.8.4,2.7a1.23,1.23,0,0,0,0,.78c0,.11.1.19.14.29.21,1.39.41,2.77.63,4.15.47,3.09,1.85,5.41,5,6.34s6.38.49,9.47.43c3.77-.07,7.57-.06,11.34-.23,2.58-.11,5.26-.6,7.13-2.41a2.78,2.78,0,0,0,3.41-2.05C39.77,14.89,41.06,7.06,37.56,3.39Z"/><path class="cls-2" d="M39.78,10.78A2.94,2.94,0,0,0,38.62,8a6.6,6.6,0,0,0-4-.94,54.77,54.77,0,0,0-7.89.44L30,6.11c1.29-.54,2.58-1.07,3.87-1.62a5.06,5.06,0,0,0,2.39-1.73,1,1,0,0,0-.16-1.21,2,2,0,0,0-.59-.41L35.4,1A1,1,0,0,0,34.27.5c-4,1.67-7.87,3.43-11.76,5.26,0-.22,0-.45,0-.66A7.8,7.8,0,0,0,20.86.54.81.81,0,0,0,19.67.42l-.5,0a2.75,2.75,0,0,0-1.42.07,2.66,2.66,0,0,0-1.24.32,1,1,0,0,0-.44,1.49l0,.09a9.07,9.07,0,0,0,.27,3.19c.05.32.1.64.14,1L16,6.4,10,4.7,4.07,3.05l-.78-.24a1.49,1.49,0,0,0-.9-.69,1.64,1.64,0,0,0-1.85.59A.88.88,0,0,0,0,3.57V4.2a3.85,3.85,0,0,0,0,.48v.05H0A2.48,2.48,0,0,0,.06,5a.8.8,0,0,0,.19.38c.17,1.3,1.92,1.66,3,1.93,1.6.41,3.24.61,4.85,1,.7.16,1.38.35,2.06.57l1.08.35c.24.07.47.15.7.24l-6,.4H4.84c-.91,0-1.83-.1-2.74-.2-.69-.08-1,.47-.93,1h0a1.06,1.06,0,0,0,.08,1.78,2.28,2.28,0,0,0,.28.59c0,.19,0,.38,0,.57a1,1,0,0,0,.73,1,27,27,0,0,0,6.64.3,22.08,22.08,0,0,0,3,.12,10.31,10.31,0,0,1-1.12,1A20.42,20.42,0,0,0,7.6,18.58c-.58.66-1,1.48-1.58,2.16l-.83.78-.09.07a1,1,0,0,0-.35.37A1,1,0,0,0,5,23.46c3.26,1.63,5.55-1.72,7.65-3.65a40,40,0,0,0,4.42-4.41c.06,1.92.19,3.84.44,5.75.12,1,.09,2.27,1,2.92a2.26,2.26,0,0,0,.67.29s0,.07,0,.11a1,1,0,0,0,1,.73A2.26,2.26,0,0,0,22,24.45h.33a1,1,0,0,0,1-1l-.42-8.86a32,32,0,0,0,5.7,4.12c2.42,1.43,5,3.16,8,2.58A1,1,0,0,0,37,19.62,83.22,83.22,0,0,0,28,13.19l1.54-.13c.92-.09,1.83-.2,2.75-.32a21.19,21.19,0,0,0,4.8-.32c.67,0,1.35,0,2,.05A1,1,0,0,0,39.78,10.78Z"/><path class="cls-3" d="M36.79,8c-4.94.23-9.88.65-14.81,1-.19-1-.38-2-.56-3C21.13,4.34,21-.56,18.16.47a.89.89,0,0,0-.84.31h-.06c-2.61-.2-1.5,4.48-1.32,5.81.12,1,.28,1.91.42,2.86l-14.59,1A1.06,1.06,0,0,0,1,12.09a1,1,0,0,0,.57,1.5,68.71,68.71,0,0,0,15.56.67c0,.2.07.4.1.61l.66,4.18a34.53,34.53,0,0,0,.69,4.19c.56,1.9,3.21,2.56,3.83.31a18.62,18.62,0,0,0,.36-3.95,38.69,38.69,0,0,0,0-4.44c0-.51-.09-1-.14-1.53,1.38-.22,2.76-.48,4.13-.78.7-.15,1.4-.34,2.1-.52,1.77-.06,3.54-.15,5.31-.29,1.29-.11,2.57-.24,3.85-.4.84-.1,1.81-.21,2.13-1.14C40.85,8.55,38.09,8,36.79,8Z"/></g></svg>';
const iconFb = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.21 20.74"><path id="FB" class="cls-1" d="M10.11.16C8.37-.08,6.43-.23,5,1.07S3.66,4.53,3.6,6.35v.17C2.28,6.5.75,6.55.19,7.86A1.55,1.55,0,0,0,.3,9.53a1.55,1.55,0,0,0,1.58.54H2l.27,0,.61,0h.69c0,3.11-.07,6.21,0,9.32,0,1.93,3,1.93,3,0-.06-3.07,0-6.13,0-9.2h.06a6.16,6.16,0,0,0,2.53,0A2.39,2.39,0,0,0,10.6,8.57a1.33,1.33,0,0,0,.24-.82,1.69,1.69,0,0,0-.07-.38,1.37,1.37,0,0,0-.4-.88A1.56,1.56,0,0,0,8.91,6.1l-.58.11-.14,0-.12,0c-.37,0-.74.06-1.11.07a1.58,1.58,0,0,0-.42.09A13.42,13.42,0,0,1,6.73,4.1C7,2.77,8.2,2.9,9.32,3.05a1.53,1.53,0,0,0,1.84-1A1.51,1.51,0,0,0,10.11.16Z"/></svg>';
const iconIg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.07 29.11"><g id="IG"><path class="cls-1" d="M28,12c0-3,.47-7.08-1.62-9.54C24.08-.22,19.34,0,16.15,0A54.09,54.09,0,0,0,3.86,1.36a1.35,1.35,0,0,0-.76.43C.9,2.93.32,5.47.2,7.86,0,11.59,0,15.33,0,19.06c0,3.11,0,6.1,2.83,8,2.34,1.59,5.4,1.83,8.14,2a44.33,44.33,0,0,0,10.66-.77c3.1-.6,5.58-2,6.1-5.35A69.81,69.81,0,0,0,28,12ZM22.74,24.94a28.18,28.18,0,0,1-8,1.15,28.7,28.7,0,0,1-7.85-.53C4.59,25,3.11,23.92,3,21.45c-.11-3.39,0-6.8.06-10.18,0-1.44,0-2.93.18-4.36.11-.85.32-2.2,1.25-2.52a1.84,1.84,0,0,0,.37-.19A50.94,50.94,0,0,1,13.76,3,34.28,34.28,0,0,1,22,3.43a3,3,0,0,1,2.5,1.83,12.89,12.89,0,0,1,.4,4.11c.07,2.89.07,5.79,0,8.68C24.92,20.43,25.51,24,22.74,24.94Z"/><path class="cls-2" d="M23.05,7.19a1.22,1.22,0,0,0,0-.6A1.16,1.16,0,0,0,22.9,6l-.24-.3A1.45,1.45,0,0,0,22,5.35l-.4-.06a1.42,1.42,0,0,0-.75.21,1.53,1.53,0,0,0-.38.29l0,0-.24.32,0,0a2.25,2.25,0,0,0-.19.45.43.43,0,0,0,0,0c0,.12,0,.28-.06.41v.08c0,.14,0,.3.06.44a.29.29,0,0,0,0,.09c0,.13.11.27.17.4l0,0a2.69,2.69,0,0,0,.26.33.08.08,0,0,0,0,0A1.17,1.17,0,0,0,21,8.8a1.36,1.36,0,0,0,1.16,0,1.24,1.24,0,0,0,.48-.31l.23-.31a1.42,1.42,0,0,0,.21-.75l0-.21Z"/><path class="cls-3" d="M20.11,12.88a6.88,6.88,0,0,0-1.5-3.81,1.48,1.48,0,0,0,0-.78,1.53,1.53,0,0,0-1.84-1c-1.27.21-2.59-.17-3.87-.07A5.12,5.12,0,0,0,9.19,8.9a8.21,8.21,0,0,0-1.38,8.16,7.16,7.16,0,0,0,5.51,3.8,7.1,7.1,0,0,0,4.18-.36,4.84,4.84,0,0,0,2.43-3.21A12.33,12.33,0,0,0,20.11,12.88ZM16.89,17c0,.05-.19.34-.27.47,0,0-.27.28-.19.21a3.23,3.23,0,0,1-2.34.31l-.12,0-.37-.07c-.2,0-.4-.1-.6-.16l-.28-.09-.18-.06-.17-.08L12,17.31a4.85,4.85,0,0,1-.57-.35l0,0,0,0-.22-.19a4.15,4.15,0,0,1-.4-.43h0s0,0,0,0l-.2-.31a3.74,3.74,0,0,1-.27-2.4,6.55,6.55,0,0,1,1.08-2.63,2.17,2.17,0,0,1,.73-.57,3.33,3.33,0,0,1,1.38-.2c.8,0,1.58.06,2.35.08a1.51,1.51,0,0,0,.4.71,2.53,2.53,0,0,1,.55.81,7.43,7.43,0,0,1,.3,1.16.39.39,0,0,0,0,.13l0,.32,0,.73"/></g></svg>';
const bookSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.67 233.52"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path id="flower" class="cls-1" d="M185,233.52h-1.57a17,17,0,0,0-1.64-1.75,27,27,0,0,1-2.86-2.15c-3.18-3.51-7.3-5.6-11.45-7.56-6.49-3.06-13.24-5.57-19.45-9.24-3.21-1.9-6.55-3.61-9.63-5.71-3.27-2.23-6.25-4.87-9.43-7.21a19.62,19.62,0,0,1-6.68-8.9,111.86,111.86,0,0,1-3.74-13c-.93-3.73-1.34-7.59-3.4-11-2.46-4-3.33-4.61-8-4.44a1.49,1.49,0,0,0-1,.48c-1.26,1.63-2.54,3.26-3.68,5-2.26,3.39-4.34,6.91-6.66,10.26-2.45,3.56-4.85,7.17-8.66,9.59-2,1.27-5.12,2.24-6.79,1.25A42.37,42.37,0,0,1,75,185.53a17.36,17.36,0,0,1-5.83-9.42c-1.52-6.15-3.73-12-7.6-17.06-1.53-2-3-4.1-4.34-6.23a5.72,5.72,0,0,1-.88-2.62c-.2-2.53-.15-5.08-.32-7.61a7.59,7.59,0,0,1,1.66-5.31c1.74-2.25,3.68-4.35,5.46-6.57.92-1.15,1.68-2.43,2.56-3.72a39.51,39.51,0,0,1-4-2.13c-2.92-2-5.77-4.17-8.63-6.3-1.3-1-2.69-2-3-3.74-.58-3.23,1.08-5.76,3.07-8a4.43,4.43,0,0,0,1.32-2.63,3.2,3.2,0,0,1,1.64-2.55A1.82,1.82,0,0,0,57,99.22a10.84,10.84,0,0,0-2.4-4A20.1,20.1,0,0,0,49.12,92,86.37,86.37,0,0,1,32,82.88,80.71,80.71,0,0,1,18.88,71.94a29.44,29.44,0,0,1-5.39-7.54C10,57,6.57,49.59,3.3,42.1A78.22,78.22,0,0,1,.75,34C.53,33.32.25,32.64,0,32V25.41c2.32-2.33,4.55-4.82,8.15-5.12,2.18-.18,4.44-.72,6.49.31,3.17,1.58,6.29,3.29,9.32,5.14,2,1.2,3.74,2.75,5.62,4.11s3.91,2.66,5.77,4.11c4,3.17,7.07,7.26,10,11.45,3.45,5,6.54,10.25,10.85,14.6.71.72,1.45,1.42,2.37,2.32.33-2.74.6-5.09.88-7.44.2-1.67.31-3.35.6-5,.53-3.09,1.07-6.18,1.77-9.23C62.87,35.85,63.9,31,65.3,26.3c1.93-6.53,6.1-11.8,10.34-17a59.07,59.07,0,0,1,4.75-5.24,22.5,22.5,0,0,1,4.17-3C86.71-.19,89.15,0,91.52,0a3.73,3.73,0,0,1,3.26,1.41,3,3,0,0,0,1.91,1.15A2.84,2.84,0,0,1,99.14,4.4c2.25,4.25,2,8.92,2,13.5,0,4.05-.47,8.11-.68,12.16a13.4,13.4,0,0,0,.12,3.64c.7,3,1.52,5.9,2.42,8.81a28.37,28.37,0,0,0,6,10.73c1.8,2,2.7,2.24,4.24.84,2.49-2.26,4.93-4.58,7.4-6.86a26.42,26.42,0,0,1,2.86-2.43c2.84-1.93,5.71-3.82,8.62-5.64s6.42-2.53,9.87-3c5.4-.74,10.25,1.51,15.22,3,2.3.67,4.35,2.19,6.53,3.31,1.45.75,2,1.68,1.38,3.25-1,2.43-2.1,4.78-3.24,7.12-2.22,4.57-4.51,9.1-6.72,13.67-2.12,4.39-2.9,9.16-3.65,13.9-.55,3.44-.8,6.94-1.09,10.42-.31,3.79-.5,7.59-.75,11.61,2.32.28,4.35.7,6.39.74,4.79.11,9.6,0,14.39.06a41.06,41.06,0,0,1,6.65.55,15.39,15.39,0,0,1,6.81,2.83,5.29,5.29,0,0,0,1.32.89,9.11,9.11,0,0,1,6.06,6.16c1.32,3.8,1.45,7.76,1.81,11.7a15.43,15.43,0,0,0,.51,2.19v1.31a2,2,0,0,0-.25.67q0,6.27,0,12.53a2,2,0,0,0,.25.67v.79a17.19,17.19,0,0,0-.67,2.58,46.66,46.66,0,0,1-2.94,13.12c-.79,1.89-2.8,2.23-3.93,3.63,0,0-.08,0-.12,0a16.34,16.34,0,0,1-9-1.61c-4.95-2.7-9.87-5.45-14.91-8-1.54-.77-3.43-.85-5.53-1.34a7.34,7.34,0,0,0,.69,1.78q1.6,1.88,3.34,3.64c3,3,6.11,5.92,9,9,4.3,4.67,7,10.27,9.09,16.21,1.55,4.5,2.92,9.07,4.21,13.65s2.49,8.93,3.45,13.46a77.54,77.54,0,0,1,1.36,15.89,36.45,36.45,0,0,1,.19,3.74,3.37,3.37,0,0,1-1.09,2.39A2.89,2.89,0,0,0,185,233.52Z"/></g></g></svg>';
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let current = 0;
  let modalState = false;
  let social = [
    {
      id: "IG",
      title: "Instagram",
      url: "https://www.instagram.com/dahlialisboa",
      icon: iconIg
    },
    {
      id: "FB",
      title: "Facebook",
      url: "https://www.facebook.com/dahlialisboa",
      icon: iconFb
    }
  ];
  let languages = [
    {
      id: "PT",
      title: "Portugese (Portugal)",
      icon: iconPt,
      bookingSrc: "pt_PT",
      active: true,
      translations: { bookingCta: "Reservar Uma Mesa" }
    },
    {
      id: "GB",
      title: "English (United Kingdom)",
      icon: iconGb,
      bookingSrc: "en_GB",
      active: false,
      translations: { bookingCta: "Book a Table" }
    }
  ];
  return `${$$result.head += `${$$result.title = `<title>Dahlia Lisboa | Now Open</title>`, ""}`, ""}



<header><nav><ul>${each(languages, (lang, i) => `<li class="${"is-active-" + escape(lang.active) + " icon-" + escape(lang.id)}"><button class="${"flag"}"${add_attribute("title", lang.title, 0)}><!-- HTML_TAG_START -->${lang.icon}<!-- HTML_TAG_END --></button>
            </li>`)}</ul></nav></header>

<main><img${add_attribute("src", mainImg, 0)}>
    <button class="${"booking"}"><!-- HTML_TAG_START -->${bookSvg}<!-- HTML_TAG_END -->
        <div>${escape(languages[current].translations.bookingCta)}</div></button></main>

<div class="${"booking-modal is-open-" + escape(modalState)}"><div class="${"modal-bg"}"></div>
    <div class="${"iframe-wrap"}"><iframe src="${"https://module.lafourchette.com/" + escape(languages[current].bookingSrc) + "/module/699917-35b33"}" class="${"booking-iframe"}"></iframe></div></div>

<footer><ul>${each(social, (soc) => `<li class="${"icon-" + escape(soc.id)}"><a${add_attribute("href", soc.url, 0)} target="${"_blank"}"${add_attribute("title", soc.title, 0)}><!-- HTML_TAG_START -->${soc.icon}<!-- HTML_TAG_END --></a>
        </li>`)}
        <li><p></p></li></ul></footer>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
export { init, render };
