const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}`))

app.get('/', (req, res) =>{
    res.send("Hello world!")
});

function validateProd(prod){
    const schema = {
        product_name: Joi.string().min(3).required()
    };

    return Joi.validate(prod, schema);
}

const { schema } = require('joi/lib/types/object');

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);