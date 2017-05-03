var config = {
    port: 8080,
    endpointsML: {
        search: 'https://api.mercadolibre.com/sites/MLA/search?q=',
		detail: 'https://api.mercadolibre.com/items/', 
		categories: 'https://api.mercadolibre.com/categories/'
    },
    productsQuantity: 4,
    author: {
        name: "Lucas",
        lastname: "Drughieri"
    }
}

module.exports = config;