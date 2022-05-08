const express = require('express');
const router = express.Router();

const products = [
    {product_id: 1, product_name: 'sunsilk'},
    {prodcut_id: 2, product_name: 'ponds'},
    {product_id: 3, product_name: 'product3'}
]

router.get('/products', (req, res) =>{
    res.status(200).send(products);
});

router.get('/products/:id', (req, res) =>{
    const prod = products.find(p => p.product_id === parseInt(req.params.id));
    if(!prod) res.status(404).send('The product not found!');
    res.status(200).send(prod);
});

router.post('/products', (req, res) => {
    const {error} = validateProd(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const prod = {
        product_id: products.length + 1,
        product_name: req.body.product_name
    };
    products.push(prod);
    res.send(prod);
});

router.put('/products/:id', (req, res) =>{
    const prod = products.find(p => p.product_id === parseInt(req.params.id));
    if(!prod) return res.status(404).send('The product not found!');

    const {error} = validateProd(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    prod.product_name = req.body.product_name;
    res.status(200).send(prod);
});

router.delete('/products/:id', (req, res) =>{
    const prod = products.find(p => p.product_id === parseInt(req.params.id));
    if(!prod) return res.status(404).send('The product not found!');

    const index = products.indexOf(prod);
    products.splice(index, 1);

    res.status(200).send(prod);
})

module.exports = router
