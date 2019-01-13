import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {addLocaleData} from 'react-intl';
import { Provider } from 'react-redux'
import enLocaleData from "react-intl/locale-data/en";
import ruLocaleData from "react-intl/locale-data/ru";
import './index.css';
import App from './App';
import configureStore from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import registerServiceWorker from './registerServiceWorker';

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

class AppWrapper extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <Provider ref={this.store} store={configureStore()}>
                <App />
            </Provider>
        );
    }
}

// ========================================

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));
// registerServiceWorker();
