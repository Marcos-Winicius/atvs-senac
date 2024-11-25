const express = require('express');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, './atv-revisando-js')));


app.get('/', (req, res)=>{
    res.json({message: 'Coisa simples'})
})

app.listen(3000, ()=>{
    console.log('Rodando na porta 3000');
})