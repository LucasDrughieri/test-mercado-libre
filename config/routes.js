import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';
import itemsController from '../controllers/itemsController';

module.exports = function(app){
    // Route Apis 
    app.get('/api/items', itemsController.getAll);
    app.get('/api/items/:id', itemsController.getById);

    app.use('*', (req, res) => {
        match(
            { routes, location: req.url },
            (err, redirectLocation, renderProps) => {

                if (err) {
                    return res.status(500).send(err.message);
                }
               
                if (redirectLocation) {
                    return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                }

                var markup;
                if (renderProps) {                           
                    markup = renderToString(<RouterContext {...renderProps}/>);                    
                    return res.render('index', { markup });
                } else {        
                    res.status(404);
                }           
            }
        );
    });
}