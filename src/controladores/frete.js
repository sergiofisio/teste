let produto = require('../bancodedados/produtos')
const { getStateFromZipcode } = require('utils-playground')
const frete15 = ["rj", "sp"]
const frete10 = ["ba", "se", "al", "pe", "pb"]

const listarProdutos = async (req, res) => {
    await res.json(produto)
    return
}

const calcularFrete = async (req, res) => {
    let { id, cep } = req.params
    let frete = 12 / 100
    const product = produto.find((produto) => {
        return produto.id === Number(id)
    })
    const uf = await getStateFromZipcode(cep);
    if (!product) {
        console.log("entrou no IF")
        return res.status(400).json("ID inválido")
    }
    if (!uf) {
        return res.status(400).json("CEP inválido")
    }
    const valorProduto = product.valor / 100

    if (frete10.includes(uf.toLowerCase())) {
        frete = 10 / 100
    } else if (frete15.includes(uf.toLowerCase())) {
        frete = 15 / 100
    }
    const calculoFrete = (valorProduto * frete)
    return res.json(`O Frete para o estado de ${uf} para o produto ${product.nome} com o valor de R$${(product.valor / 100).toFixed(2)} é R$${calculoFrete.toFixed(2)}`)

}

// console.log(produto)



module.exports = {
    listarProdutos,
    calcularFrete
}