const express = require('express');
const app = express();
const apiRouter = require('./routes/api');

app.use(express.json());
app.use('/api', apiRouter);

const port = 3000;
app.listen(port, console.log(`Listening on port ${port}`))

app.get('/', (req, res) =>{
    res.send("Hello world!")
});