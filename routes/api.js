const express = require('express');
const Joi = require('joi');
const { getProducts, insertProduct, updateProduct, deleteProduct} = require('../utils/db_utils');
const router = express.Router();
const { schema } = require('joi/lib/types/object');

router.get('/products', async (req, res) =>{
    //res.status(200).send(products);
    const data = await getProducts();
    res.json(data);
});

router.get('/products/:id', (req, res) =>{
    const prod = products.find(p => p.product_id === parseInt(req.params.id));
    if(!prod) res.status(404).send('The product not found!');
    res.status(200).send(prod);
});

router.post('/products', async (req, res) => {
    const {error} = validateProd(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const prod = {
        name: req.body.p_name.trim().toLowerCase(),
        code: req.body.p_code.trim()
    };
   const data = await insertProduct(prod.name, prod.code);
   console.log(prod.name);
   res.status(200).json(data);
});

router.put('/products/:id', async (req, res) =>{
    // const prod = products.find(p => p.product_id === parseInt(req.params.id));
    // if(!prod) return res.status(404).send('The product not found!');

    const prod = {
        name: req.body.p_name?.trim()?.toLowerCase(),
        code: req.body.p_code?.trim(),
        pid: parseInt(req.params.id)
    };

    const data = await updateProduct(prod.name, prod.code, prod.pid);

    res.status(200).json(data);
});

router.delete('/products/:id', async (req, res) =>{
    
       const pid = parseInt(req.params.id)

    const data = await deleteProduct(pid);
    res.status(200).json(data);
});

function validateProd(prod){
    const schema = {
        p_name: Joi.string().trim().min(3).max(20).required(),
        p_code: Joi.string().min(3).max(8).required()
    };

    return Joi.validate(prod, schema);
}

module.exports = router
