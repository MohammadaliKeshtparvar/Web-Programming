import jwtDecode from 'jwt-decode';

import APP_CONSTANTS from 'constants/app';
import Translation from './Translation';

export default {
	/**
	 * Limit characters, placing a ... at the end
	 */
	limitChars: (str, limit = 20, removeBreak = false) => {
		let finalStr = str;

		if (!finalStr) return '';

		if (str.length > limit) {
			finalStr = finalStr.substr(0, limit).trim();
		}

		if (removeBreak) {
			finalStr = finalStr.replace(/(\r\n|\n|\r)/gm, ' ');
		}

		return finalStr;
	},

	validateMobile: mobile => /^[0]*[9][0-9][0-9][0-9]{7}$/g.test(mobile),
	validateNumber: num => /^[0-9]*$/g.test(num) || /^[۰-۹]*$/g.test(num),

	validateEmail: email => {
		if (
			// eslint-disable-next-line no-useless-escape
			!/^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i.test(
				email,
			)
		) {
			return false;
		}

		return true;
	},

	validateForm: (name, value, rules) => {
		if (!rules) return false;

		if (rules.required && !value) {
			return Translation.t('error.required_field', { name: Translation.t(`label.${name}`) });
		}

		if (rules.min && value.length < rules.min) {
			return Translation.t('error.min_length_constraint', { name: Translation.t(`label.${name}`), min: rules.min });
		}

		if (rules.max && value.length > rules.max) {
			return Translation.t('error.max_length_constraint', { name: Translation.t(`label.${name}`), max: rules.max });
		}

		if (rules.length && value.length !== rules.length) {
			return Translation.t('error.fixed_length_constraint', { name: Translation.t(`label.${name}`), length: rules.length });
		}

		return false;
	},

	validateNationalCode: nationalCode => {
		if (nationalCode.length !== 10) return false;
		return true;

		// let n = 0;

		// for (let i = 10; i >= 2; i -= 1) {
		// 	n += i * nationalCode.charAt(10 - i);
		// }

		// const r = n % 11;
		// if (r < 2) {
		// 	if (nationalCode[9] === r) return true;
		// 	return false;
		// }

		// if (nationalCode[9] === 11 - r) return true;
		// return false;
	},

	validateUsername: (username, length) => {
		if (username.length > length) {
			return false
		} else if(username.length > 0){
			return true;
		}

	},

	validatePassword: password => {
		var regex = /\d/; 
		if (password.length >= 8 && regex.test(password)) {
			return true
		} else {
			return false
		}
	},

	toCamelCase: str => str.charAt(0).toUpperCase() + str.slice(1),

	handleError: err => {
		const { message } = err;
		if (typeof message === 'string') {
			return message;
		}
		if (typeof message === 'object') {
			const keys = Object.keys(message);
			return message[keys[0]][0];
		}

		return Translation.t('label.default_error');
	},

	validateJWT: token => {
		let decodedToken;

		try {
			decodedToken = jwtDecode(token);
		}
		catch (e) {
			return false;
		}

		const now = new Date().getTime() / 1000 || 0; // UTC time in seconds

		// number of seconds prior to expiry that a token is considered 'old'
		const renewThreshold = 86400;

		if (now > decodedToken.exp - renewThreshold) {
			// Expired
			return false;
		}

		if (now < decodedToken.nbf - 300) {
			// Not yet valid (too early!)
			return false;
		}

		return true;
	},

	copyToClipboard(value) {
		const el = document.createElement('textarea');
		el.value = value;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';

		document.body.appendChild(el);
		el.select();

		document.execCommand('copy');
		document.body.removeChild(el);
	},

	getQueryParameterByName(name, url) {
		let newUrl = url;
		if (!url) newUrl = window.location.href;

		// eslint-disable-next-line no-useless-escape
		const newName = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp(`[?&]${newName}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(newUrl);

		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	},

	queryStringToJSON(string) {
		const pairs = string.slice(1).split('&');

		const result = {};
		pairs.forEach(pair => {
			const newPair = pair.split('=');
			result[newPair[0]] = decodeURIComponent(newPair[1] || '');
		});

		return JSON.parse(JSON.stringify(result));
	},

	/**
	 * Convert param object into query string
	 * eg.
	 *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
	 *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
	 */
	serialize(obj, prefix) {
		const str = [];
		Object.keys(obj).forEach(p => {
			const k = prefix ? `${prefix}[${p}]` : p;
			const v = obj[p];

			if (encodeURIComponent(v) !== null && encodeURIComponent(v) !== '') {
				str.push((v !== null && typeof v === 'object')
					? this.serialize(v, k)
					: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
			}
		});

		return str.join('&');
	},

	makeLocation(location) {
		if (!location) return '';

		if (typeof location === 'string') {
			return location;
		}

		let finalLocation = '';
		if (Translation.lang !== 'fa' || location.country !== 'ایران') {
			finalLocation += `${location.country}, `;
		}
		if (location.province !== location.city) {
			finalLocation += `${location.province}, `;
		}

		finalLocation += `${location.city}, `;

		return finalLocation.substring(0, finalLocation.length - 2);
	},

	isMobile: (userAgent = '') => Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)),

	urlFriendlyTitle: title => {
		const newTitle = title
			.replace(/\s/g, '-')
			.replace(/,/g, '-')
			.replace(/，/g, '-')
			.replace(/‌/g, '-')
			.toLowerCase();

		return decodeURI(newTitle);
	},

	encrypt: (salt = APP_CONSTANTS.ENCRYPTION_SALT) => {
		const textToChars = text => text.split('').map(c => c.charCodeAt(0));

		// eslint-disable-next-line no-bitwise
		const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
		const byteHex = n => (`0${Number(n).toString(16)}`).substr(-2);

		return text => text.split('')
			.map(textToChars)
			.map(applySaltToChar)
			.map(byteHex)
			.join('');
	},

	decrypt: (salt = APP_CONSTANTS.ENCRYPTION_SALT) => {
		const textToChars = text => text.split('').map(c => c.charCodeAt(0));

		// eslint-disable-next-line no-bitwise
		const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
		return encoded => encoded.match(/.{1,2}/g)
			.map(hex => parseInt(hex, 16))
			.map(applySaltToChar)
			.map(charCode => String.fromCharCode(charCode))
			.join('');
	},
};
