import Router from 'next/router';
import APP_CONSTANTS from 'constants/app';
// import { setLang } from 'redux/user/actionCreators';
import Moment from 'moment-jalaali';

const Translation = {
	si_symbol: ['', 'k', 'M', 'G', 'T', 'P', 'E'],
	enNum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	translations: {},
	lang: null,

	loadTranslations: async lang => {
		const t = require(`../translations/${lang}.json`);

		if (lang === 'fa') {
			// eslint-disable-next-line import/no-extraneous-dependencies
			require('moment/locale/fa');
			Moment.loadPersian({
				usePersianDigits: true,
				dialect: 'persian-modern',
			});
		}

		Translation.translations = t;
		Translation.lang = lang;
	},

	// async configure(ctx) {
	// 	const { query, store } = ctx;

	// 	let lang;

	// 	if (query.lang) {
	// 		lang = query.lang;
	// 	}
	// 	else {
	// 		lang = 'fa';
	// 	}

	// 	await Translation.loadTranslations(lang);
	// 	store.dispatch(setLang(lang));

	// 	return lang;
	// },

	date(d, format = 'jDD jMMMM jYYYY - HH:mm') {
		const momentDate = Moment(d);

		if (Translation.lang === 'fa') {
			return momentDate.format(format);
		}

		momentDate.locale('en');
		const newFormat = format.replace(/j/ig, '');
		return momentDate.format(newFormat);
	},

	dateObjectToGeorgianString(date) {
		let dateFormat;
		if (Translation.lang === 'fa') {
			dateFormat = 'jYYYY-jM-jD';
		}
		else {
			dateFormat = 'YYYY-M-D';
		}

		let finalDate = null;
		if (date) {
			finalDate = Translation.toEnNum(Moment(`${date.year}-${date.month}-${date.day}`, dateFormat).format('YYYY-MM-DD'));
		}

		return finalDate;
	},

	georgianDateStringToObject(date) {
		if (!date) return null;

		const momentDate = Moment(date);
		let finalDate = {};

		if (Translation.lang === 'fa') {
			finalDate = {
				year: parseInt(Translation.toEnNum(momentDate.format('jYYYY')), 10),
				month: parseInt(Translation.toEnNum(momentDate.format('jMM')), 10),
				day: parseInt(Translation.toEnNum(momentDate.format('jDD')), 10),
			};
		}
		else {
			finalDate = {
				year: parseInt(Translation.toEnNum(momentDate.format('YYYY')), 10),
				month: parseInt(Translation.toEnNum(momentDate.format('MM')), 10),
				day: parseInt(Translation.toEnNum(momentDate.format('DD')), 10),
			};
		}

		return finalDate;
	},

	redirectToLang(lang, res) {
		if (res) {
			res.writeHead(301, {
				Location: `/${lang}/`,
			});

			return res.end();
		}
		Router.push(`/${lang}/`);
		return null;
	},

	timestampToDate(timestamp, format = 'jYYYY-jMM-jDD HH:mm:ss') {
		let coef;
		if (`${timestamp}`.length === 10) {
		 coef = 1000;
		}
		else {
		 coef = 1;
		}

		console.log(Moment(timestamp).format('MM/DD/YYYY'))
		// const m = Moment(parseInt(timestamp * coef, 10));
		// let finalFormat = format;
		var now = Moment(new Date());
		console.log(Moment.duration(now.diff(Moment(timestamp).format('MM/DD/YYYY'))))
		console.log(Moment(Moment(timestamp).format('MM/DD/YYYY'), "DD-MM-YYYY").add(5, 'days'))
		return moment(Moment(timestamp).format('MM/DD/YYYY'), "DD-MM-YYYY").add(5, 'days');
	},

	t(key, params) {
		let str = Translation.translations[key];
		if (!str) return key;
		if (!params) return str;

		Object.keys(params).forEach(p => {
			console.log(p)
			const replaceParams = typeof params[p] === 'number' ? Translation.n(params[p], { fraction: 0 }) : params[p];
			const regex = new RegExp(`%${p}%`, 'gm');
			str = str.replace(regex, replaceParams);
		});

		return str;
	},

	n(str, options = {
		comma: false, commarize: false, unit: '', fraction: APP_CONSTANTS.FRACTION_DIGITS, currency: '',
	}) {
		if (str === null || str === undefined) return str;

		let number = str;
		if (typeof number === 'number') {
			number = number.toFixed(options.fraction);
		}

		if (options.commarize) {
			number = Number(number);
			const min = 100000; // Alter numbers larger than 100k

			if (typeof number === 'number' && number >= min) {
				// what tier? (determines SI symbol)
				// eslint-disable-next-line no-bitwise
				const tier = Math.log10(number) / 3 | 0;

				// get suffix and determine scale
				const suffix = Translation.si_symbol[tier];
				const scale = 10 ** (tier * 3);

				// scale the number
				const scaled = number / scale;

				// format number and add suffix
				number = scaled.toFixed(1) + suffix;
			}
		}

		number = number.toString();

		// add comma to number
		if (options.comma) {
			number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		// convert number digits
		if (Translation.translations.numbers) {
			number = number.replace(/\d/g, digit => Translation.translations.numbers[digit]);
		}

		// concat number with unit
		if (options.currency) {
			const lowerCurrency = options.currency.toLowerCase();
			const c = APP_CONSTANTS.CURRENCY[lowerCurrency].symbol;
			if (lowerCurrency === 'irt' && Translation.lang === 'fa') {
				number = `${number} ${c}`;
			}
			else {
				number = `${c} ${number}`;
			}
		}

		return number;
	},

	toEnNum(str) {
		let newStr = str;
		if (!Translation.translations.numbers) return newStr;

		for (let i = 0; i < Translation.translations.numbers.length; i += 1) {
			newStr = newStr.replace(new RegExp(Translation.translations.numbers[i], 'g'), Translation.enNum[i]);
		}

		return newStr;
	},
};

export default Translation;
