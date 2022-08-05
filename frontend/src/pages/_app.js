import React from 'react'
import App from 'next/app';
import PropTypes from 'prop-types';
import Router from 'next/router';

import absoluteUrl from 'next-absolute-url';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { withReduxCookiePersist } from 'next-redux-cookie-wrapper';
import { ThemeProvider } from 'styled-components';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { postAPI, getAPI } from 'redux/core/actions';
import { setIsMobile, setOS } from 'redux/core/actionCreators';

import ErrorPage from './_error';
import Error404 from './404';

import Translation from 'libs/Translation';
import APP_CONSTANTS from 'constants/app';

import Page from 'common/Layout/Page';
import Common from 'common';
import Util from 'libs/Util';

import { store, storeConfig } from '../redux';

import '../theme/main.scss'
import { ToastContainer } from 'react-toastify';
import { setCategories } from 'redux/user/actionCreators';

const theme = require('sass-extract-loader?{"plugins": [{ plugin: "sass-extract-js", options: { camelCase: false } }]}!../theme/_variables.scss');

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const themeObject =  createMuiTheme({
	direction: 'rtl',
	typography: {
	 fontFamily: 'iranyekan',
	},
});
class MyApp extends React.Component {
  constructor(props) {
	super(props);
	
		Translation.loadTranslations('fa');
		if (typeof document !== 'undefined') {
			const html = document.getElementsByTagName('html')[0];
			html.setAttribute('dir', 'rtl');
			html.setAttribute('lang', 'fa');
		}
  	}

	render(){
		const {
			Component,
			pageProps,
			store,
			router,
			statusCode,
			lang,
			fullUrl,
		} = this.props;
		const error = statusCode !== 200 ? statusCode : null;
		
		return  (
			<Provider store={store}>
				<StylesProvider jss={jss}>
					<MaterialThemeProvider theme={themeObject}>
						<ThemeProvider theme={{ ...theme }}>
							<Common />
							<ToastContainer/>
							<Page router={router} error={error} lang={lang}>
								{/* {statusCode === 500 ? <ErrorPage code={500} /> */}
									{statusCode === 404 ? <Error404 />
										: <Component {...pageProps} key={router.route} />}
							</Page>
						</ThemeProvider>
					</MaterialThemeProvider>
				</StylesProvider>
			</Provider>
		)
	}
}

MyApp.getInitialProps = async (appContext, store) => {

	let appProps;
	let statusCode;
	const { ctx } = appContext;
	const { dispatch } = ctx.store;

	const isMobile = Util.isMobile(ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent);
	
	await ctx.store.dispatch(setOS(ctx.req ? ctx.req.headers['user-agent'].includes("Android") : navigator.userAgent.includes("Android")));
	await ctx.store.dispatch(setIsMobile(isMobile));

	let res
	try {
		appProps = await App.getInitialProps(appContext);
	}
	catch (err) {
		switch (err.statusCode) {
			case 404: statusCode = 404; break;

			case 401: {
				if (ctx.res) {
					ctx.res.setHeader('Cache-Control','No-Cache');
					ctx.res.writeHead(301, { Location: '/' });
					ctx.res.end();
					return {};
				}
			}; break;

			case 'ENOTFOUND': statusCode = 404; break;
			default: statusCode = 500; break;
		}

		if (ctx.res) {
			ctx.res.statusCode = statusCode;
		}
	}

	if (!statusCode && ctx.res) {
		statusCode = ctx.res.statusCode;
	}

	const { origin } = absoluteUrl(appContext.ctx.req);
	const fullUrl = `${origin}${appContext.ctx.asPath}`;

	// if (ctx.store.getState().user.authentication.status === APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED) {
	// 	let haveGift = await dispatch(getAPI('haveGift'))
	// 	if(!haveGift.count.used) {
	// 		ctx.res.setHeader('Cache-Control','No-Cache');
    //         ctx.res.writeHead(302, { Location: '/gift' });
    //         ctx.res.end();
	// 	} else {
	// 		Router.push('/gift');
	// 	}
	// }

	return {
		...appProps,
		statusCode,
		fullUrl,
		res
	};
}

MyApp.propTypes = {
	fullUrl: PropTypes.string.isRequired,
	router: PropTypes.shape().isRequired,
	Component: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.object,
		PropTypes.func
	]).isRequired,
	pageProps: PropTypes.shape(),
	store: PropTypes.shape().isRequired,
	statusCode: PropTypes.number,
};

MyApp.defaultProps = {
	pageProps: {},
	statusCode: 200,
};

export default compose(withReduxCookiePersist(store, storeConfig))(MyApp);
