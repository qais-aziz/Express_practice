const Joi = require('joi');
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const { schema } = require('joi/lib/types/object');

app.use(express.json());
app.use('/api', apiRouter);

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
