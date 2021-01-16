import React, { useState } from 'react';
import cookie from 'js-cookie';
import { verifyToken } from '../frontend/actions/Users';
import App from 'next/app';
import config from '../config';
import Router from 'next/router';

//Global style
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/navbar.css';
import '../public/main.css';
import '../public/category.css';
import '../public/log.css';
import '../public/review-form.css';
import '../public/signup.css';
import '../public/categorylist.css';
import '../public/components.css';
import '../public/add.css';

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState("English");
  const [transactionState, setTransactionState] = useState({
    transactionItems : [],
    transaction_date : new Date(),
    staff_name : "Staff 1"
  });
  return <Component
            language = {language}
            setLanguage = {(language) => setLanguage(language)}
            transactionState = {transactionState}
            setTransactionState={(transactionState) => setTransactionState(transactionState)}
          />
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const route = appContext.ctx.asPath;
  const token = appContext.ctx.res ? require('next-cookies')(appContext.ctx).token : cookie.get('token');
  return verifyToken(token, appContext.ctx.res)
    .then((decoded) => ({
      ...appProps,
      user: {
        id: decoded.id,
        name: decoded.name,
        isAdmin: decoded.isAdmin,
      },
    }))
    .catch((error) => {
      ["/log", "/shop", "/inventory", "/add", "/transaction"].forEach((item) => {
        if (route.startsWith(item)) {
          if (appContext.ctx.res) {
            appContext.ctx.res.writeHead(301, { Location: config.pages.Login });
            appContext.ctx.res.end();
            return;
          } else {
            return Router.replace(config.pages.Login);
          }
        }
      });
      return appProps;
    });
}
export default MyApp;
 