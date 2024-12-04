require('dotenv').config();
const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.use(
    cookieSession({
      name: 'session',
      keys:[process.env.secret],
      maxAge: 3600000,
    })
  );

router.get('/', (req, res) => {
    res.render('sign');
});

router.post('/', async(req, res) => {
    const { name, email, password, confirm_password, user_type } = req.body;
    const errors = [];

    if (!name || !email || !password || !confirm_password) {
        errors.push('Todos os campos são obrigatórios.');
        return res.status(400).json({ errors });
    }

    if(password.length < 8) {
        errors.push('A senha deve conter pelo menos 8 caracteres.');
        return res.status(400).json({ errors });
    }

    if(password != confirm_password){
        errors.push('As senhas não coincidem.');
        return res.status(400).json({ errors });
    }

    const usuario_existe = await User.findOne({where: {email: email}});
    if(usuario_existe) {
        errors.push('Email já está em uso.');
        return res.status(400).json({ errors });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('senha criptografada:', hashedPassword);
        const newUser = await User.create({ nome: name, email: email, senha: hashedPassword, tipo_usuario: user_type});
        req.session.user = {
            id: newUser.id,
            email: newUser.email,
          };
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch(error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ errors: ['Erro ao registrar o usuário. Tente novamente.'] });
    }

});

module.exports = router;