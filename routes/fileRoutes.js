const express = require('express');
const router = express.Router();
const fs = require('fs');
const testFolder = './atv-revisando-js'

router.get('/arquivos', (req, res)=>{
    const listaArquivos = readDir(testFolder);
    if(!listaArquivos){
        return res.status(500).json({erro: 'Erro ao listar arquivos'})
    }
    res.status(200).json(listaArquivos)
})

function readDir(dir) {
    let struct = {};

    fs.readdirSync(dir)
        .sort((a, b) => fs.statSync(dir + "/" + a).mtime.getTime() - fs.statSync(dir + "/" + b).mtime.getTime())
        .forEach(file => {
            if (fs.lstatSync(dir + "/" + file).isFile()) {
                struct[file] = fs.statSync(dir + "/" + file).mtime; // Armazena a data de modificação
            } else if (fs.lstatSync(dir + "/" + file).isDirectory()) {
                struct[file] = readDir(dir + "/" + file); // Processa recursivamente os subdiretórios
            }
        });

    return struct;
}

module.exports = router;