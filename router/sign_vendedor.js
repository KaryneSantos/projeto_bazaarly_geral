const express = require('express');
const validarCNPJ = require('../controllers/user');
const Vendedor = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup_vendedor');
});

router.post('/', async(req, res) => {
    const {nome_loja, endereco, cnpj} = req.body;
    const errors = [];

    if (!nome_loja|| !endereco || !cnpj) {
        errors.push('Todos os campos são obrigatórios.');
        return res.status(400).json({ errors });
    }

    if(cnpj.length < 12) {
        errors.push('O cnpj deve conter pelo menos 12 caracteres.');
        return res.status(400).json({ errors });
    }

    if(!validarCNPJ(cnpj)) {
        errors.push('Digite um CNPJ válido.');
        return res.status(400).json({ errors });
    }

    try {
        const vendedorExistente = await Vendedor.findOne({where: {cnpj}});
        if(vendedorExistente) {
            return res.status(400).json({ errors: ['CNPJ já cadastrado.'] });
        }

        const vendedor = await Vendedor.create({ nome_loja, endereco, cnpj });
        return res.status(201).json({
            message: 'Vendedor criado com sucesso!',
            vendedor
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: ['Erro ao criar vendedor.'] });
    }

});

module.exports = router;