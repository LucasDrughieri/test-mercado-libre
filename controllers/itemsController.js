import requestify from 'requestify';
import config from '../config/config';

const requestOptions = {
        method: 'GET',
        cookies: null,
        timeout: 100000
};

var controller = {};

controller.getAll = function(req, res){
    req.checkQuery('q', 'Criterio de busqueda es requerido').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.status(400).send(errors);
        return;
    }

    requestify.request(config.endpointsML.search + req.query.q, requestOptions)
        .then((response) => {
            var json = JSON.parse(response.body);
        
            var items = json.results.slice(0, config.productsQuantity);

             var result = {
                author :{
                    name: config.author.name,
                    lastname: config.author.lastname
                },
                categories: [], 
                items: []
            };

            mapCategories(result, json.filters);

            var promises = [];
            var pictures = [];

            items.forEach(item => {
                promises.push(requestify.request(config.endpointsML.detail + item.id, requestOptions).then(response => {
                    var detail = JSON.parse(response.body);

                    pictures.push({
                        id: detail.id,
                        url: detail.pictures[0].url
                    });
                }));
            });

            Promise.all(promises).then(response => {
                items.forEach(item => {
                    var picture = pictures.find(picture => { return picture.id == item.id });
                    
                    var productToAdd = mapItem(item, picture);
                    productToAdd.location = item.address.state_name;
                    result.items.push(productToAdd);
                });

                res.status(200).send(result);
            });
        })
        .fail(err => {
            res.status(400).send(err);
        })
}

controller.getById = function(req, res){
    var id = req.params.id;
    var description = "";
    var product = {
        author :{
            name: config.author.name,
            lastname: config.author.lastname
        },
        categories: [], 
        item: {}
    };

    var promises = [];

    promises.push(requestify.request(config.endpointsML.detail + id, requestOptions)
        .then(response => {
            var json = JSON.parse(response.body);

            var picture = json.pictures.length > 0 ? json.pictures[0] : { url: '' };
            product.item = mapItem(json, picture);

            product.item.soldQuantity = json.sold_quantity;
            product.item.categoryId = json.category_id;
        })
        .fail(err => {
            console.log(err);
        })
    );

    promises.push(requestify.request(config.endpointsML.detail + id + '/description', requestOptions)
        .then(response => {
            var json = JSON.parse(response.body);
            description = json.snapshot.url;
        })
        .fail(err => {
            console.log(err);
        })
    );

    Promise.all(promises).then(results => {
       
        product.item.description = description;

        requestify.request(config.endpointsML.categories + product.item.categoryId, requestOptions)
            .then(response => {
                var category = JSON.parse(response.body);

                category.path_from_root.forEach(item => {
                    product.categories.push(item.name);           
                });

                res.status(200).send(product);
            })
            .fail(err => {
                var error = JSON.parse(err.body);
                res.status(error.status).send(error); 
            });
    })
    .catch(err => {
        res.status(400).send(err);     
    });   
}

function mapItem(product, picture) {
    var item = {};
    var priceSplitted = product.price.toString().split('.');

    item.id = product.id;
    item.title = product.title;
    item.price = {
        currency: product.currency_id,
        amount: priceSplitted[0],
        decimals: priceSplitted[1] ? priceSplitted[1] : '00'
    };
    item.condition = product.condition;
    item.picture = picture.url;
    item.freeShipping = product.shipping.free_shipping;

    return item;
}

function mapCategories(result, filters) {
    var categoryFilter = filters.filter(item => {
        return item.id == "category";
    });

    if(categoryFilter.length > 0 && categoryFilter[0].values.length > 0) {
        categoryFilter[0].values[0].path_from_root.forEach(function(category){
            result.categories.push(category.name);           
        });
    }      
}

module.exports = controller;