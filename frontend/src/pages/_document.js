import React from 'react';
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets } from '@material-ui/core/styles';

import Document, {
 Html, Head, Main, NextScript,
} from 'next/document';

// constants
import APP_CONSTANTS from 'constants/app';

class MyDocument extends Document {
 render() {

  return (
   <Html lang={"fa"}>
    <Head>
     <link href={`/fonts/${"iranyekan"}/style.css`} rel="stylesheet" />
    </Head>
    <body dir={"rtl"}>
     <Main />
     <NextScript />
    </body>
   </Html>
  );
 }
}

// getInitialProps belongs to _document (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
 // Resolution order
 //
 // On the server:
 // 1. app.getInitialProps
 // 2. page.getInitialProps
 // 3. document.getInitialProps
 // 4. app.render
 // 5. page.render
 // 6. document.render
 //
 // On the server with error:
 // 1. document.getInitialProps
 // 2. app.render
 // 3. page.render
 // 4. document.render
 //
 // On the client
 // 1. app.getInitialProps
 // 2. page.getInitialProps
 // 3. app.render
 // 4. page.render

 // Render app and page and get the context of the page with collected side effects.
 const sheets = new ServerStyleSheets();
 const sheet = new ServerStyleSheet()
 const originalRenderPage = ctx.renderPage;

 ctx.renderPage = () => originalRenderPage({
  enhanceApp: (App) => (props) => 
    sheet.collectStyles(sheets.collect(<App {...props} />))
 });

 const initialProps = await Document.getInitialProps(ctx);

 return {
  ...initialProps,
  // Styles fragment is rendered after the app and page rendering finish.
  styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement(), sheet.getStyleElement()],
 };
};

export default MyDocument;