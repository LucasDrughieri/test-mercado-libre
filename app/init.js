import 'babel-polyfill';  
import React from 'react';  
import {render} from 'react-dom';  
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.min.css';
import './components/index/index.scss';
import './components/search/search.scss';
import './components/product/product.scss';
import './components/detail/detail.scss';
import './components/breadcrumb/breadcrumb.scss';
import './components/spinner/spinner.scss';
import './components/errors/notfound.scss';

window.onload = () => {
    render(<Router routes={routes} history={browserHistory} />, document.getElementById('main'));
}; 