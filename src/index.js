import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import enLocaleData from "react-intl/locale-data/en";
import ruLocaleData from "react-intl/locale-data/ru";
import './index.css';
import App from './App';
import translations from "./i18n/locales"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import registerServiceWorker from './registerServiceWorker';

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

class AppWrapper extends Component {
    render() {
        // get locale from url
        const locale = window.location.search.replace("?locale=","") || "en"
        const messages = translations[locale];
        return (
            <IntlProvider locale={locale} key={locale} messages={messages}>
                <App />
            </IntlProvider>
        );
    }
}

// ========================================

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));
// registerServiceWorker();
