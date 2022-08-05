import lscache from 'lscache';

import APP_CONSTANTS from 'constants/app';
import Util from 'libs/Util';

/**
  * Sends requests to the API
  */
async function API(url, method, body, params, jsonType, jwt, lang, currency, thirdParty) {
	let finalBody = {...body};
	let finalUrl = url;
	const finalParams = {...params};

	// Build request
	const req = {
		method: method.toUpperCase(),
		headers: {
		},
	};

	if (jsonType) {
		finalBody = JSON.stringify(finalBody);
		req.headers['Content-Type'] = 'application/json';
	}

	if (method !== 'GET' && finalBody) {
		req.body = finalBody;
	}

	if (jwt && !thirdParty) {
		req.headers.Authorization = `JWT ${jwt}`;
	}

	if (lang) {
		req.headers['Accept-Language'] = lang;
	}

	if (currency) {
		req.headers['X-Display-Currency'] = currency.toUpperCase();
	}

	// Add Endpoint Params
	let urlParams = '';
	if (finalParams) {
		// Object - eg. /recipes?title=this&cat=2
		if (typeof finalParams === 'object') {
			// Replace matching params in API routes eg. /recipes/{param}/foo
			Object.keys(finalParams).forEach(p => {
				if (finalUrl.includes(`{${p}}`)) {
					finalUrl = finalUrl.split(`{${p}}`).join(finalParams[p]);
					delete finalParams[p];
				}
			});

			// Add the rest of the params as a query string if any exist
			if (Object.keys(finalParams).length) {
				urlParams = `?${Util.serialize(finalParams)}`;
			}
		}

		// String or Number - eg. /recipes/23
		else if (typeof finalParams === 'string' || typeof finalParams === 'number') {
			urlParams = `/${finalParams}`;
		}
	}

	finalUrl += urlParams;
	const response = await fetch(finalUrl, req);
	if ((!thirdParty && !response.ok) || response.status >= 300) {
		const jsonRes = response.json();
		throw await jsonRes;
	}

	// No Content
	if (response.status === 204) {
		return { statusCode: 204, ok: true };
	}

	return response.json();
}

/* Export ==================================================================== */
export default API;
