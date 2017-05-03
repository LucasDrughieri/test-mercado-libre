import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Index from './components/index/index';
import ProductDetail from './components/product-detail/detail';
import NotFound from './components/errors/notfound';

const routes = (
	<Route path="/" component={App}>
        <IndexRoute component={Index}/>
		<Route path="items" component={Index} />
		<Route path="items/:id" component={ProductDetail} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;