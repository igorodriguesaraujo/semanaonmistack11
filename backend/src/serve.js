const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const port = 3333;

const app = express();

app.use(cors({
    // origin:"http://localhost:3000",
}))
app.use(express.json());
app.use(routes);

app.listen(port, function(){
    console.log('Rodando servidor: http://localhost:3333/');
})