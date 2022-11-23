const express = require('express')
const frete = require('../src/controladores/frete')

const rotas = express()

rotas.get('/produtos', frete.listarProdutos)
rotas.get('/produtos/:id/frete/:cep', frete.calcularFrete)


module.exports = rotas