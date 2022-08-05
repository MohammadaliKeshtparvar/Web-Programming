const nextRoutes = require('next-routes');
const { match, pathToRegexp, compile } = require('path-to-regexp');

const APP_ROUTES = require('../constants/route');
const APP_CONSTANTS = require('../constants/app');

// const lang = `/:lang(${Object.keys(APP_CONSTANTS.LANG).join('|')})?`;
// const extractLangRegex = pathToRegexp(`${lang}/:foo*`);
const routes = nextRoutes();

Object.keys(APP_ROUTES).forEach(key => {
	const {
		scape, dir, path, page,
	} = APP_ROUTES[key];
	if (scape) return;
	if (!dir) throw Error(`Provide directory for ${key} route`);

	const finalPath = path === undefined ? `/${key}` : path;
    const finalPage = dir;

	// console.log(key, `${lang}${finalPath}`, finalPage);
    routes.add(key, `${finalPath}`, `${finalPage}`);
});

const matchRoute = path => {
	for (const r in APP_ROUTES) {
		const route = APP_ROUTES[r];
		if (!route.scape) {
			const matcher = match(`${route.path}`);
			if (matcher(path)) return r;
		}
	}

	return '';
};

const makeUrl = (route, params) => {
	const routeObject = APP_ROUTES[route];
	if (!routeObject) return null;

	const toPath = compile(routeObject.path);
	const finalPath = toPath({ ...params });

	return `${APP_CONSTANTS.SITE_URL}${finalPath}`;
};

module.exports = {
	routes,
	matchRoute,
	makeUrl,
	// handleRedirects,
	// makeUrlWithNewLang,
	Router: {},
};
