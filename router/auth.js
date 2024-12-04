require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(
    cookieSession({
      name: 'session',
      keys: [process.env.secret],
      maxAge: 3600000,
    })
);

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async(req, res) => {

    const { email, password } = req.body;
    const errors = [];

    if (!email || !password) {
        errors.push('Todos os campos são obrigatórios.');
        return res.status(400).json({ errors });
    }

    if (password.length < 8) {
        errors.push('A senha deve conter pelo menos 8 caracteres.');
        return res.status(400).json({ errors });
    }

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            errors.push('Credenciais inválidas.');
            return res.status(400).json({ errors });
        }

        const isPasswordValid = await bcrypt.compare(password, user.senha);

        if (!isPasswordValid) {
            errors.push('Credenciais inválidas.');
            return res.status(400).json({ errors });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
        };
          
        res.status(200).json({ message: 'Login realizado com sucesso!' });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ errors: ['Erro ao processar o login. Tente novamente.'] });
    }

});

// router.put('/', async(req, res) => {
//     const { email, password, newPassword } = req.body;
//     const errors = [];

//     if (!email || !password) {
//         errors.push('E-mail e senha são obrigatórios.');
//         return res.status(400).json({ errors });
//     }

//     try {
//         // Verificando se o usuário está autenticado
//         if (!req.session.user) {
//             return res.status(401).json({ message: 'Usuário não autenticado.' });
//         }

//         // Encontrando o usuário no banco
//         const user = await User.findOne({ where: { email: req.session.user.email } });

//         if (!user) {
//             return res.status(400).json({ message: 'Usuário não encontrado.' });
//         }

//         // Verificando se a senha fornecida corresponde à senha no banco
//         const isPasswordValid = await bcrypt.compare(password, user.senha);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Senha incorreta.' });
//         }

//         // Se a nova senha for fornecida, criptografamos a senha antes de salvar
//         if (newPassword) {
//             if (newPassword.length < 8) {
//                 errors.push('A nova senha deve conter pelo menos 8 caracteres.');
//                 return res.status(400).json({ errors });
//             }
//             const hashedPassword = await bcrypt.hash(newPassword, 10);
//             user.senha = hashedPassword;
//         }

//         // Atualizando o e-mail se ele for fornecido
//         if (email) {
//             user.email = email;
//         }

//         // Salvando as alterações no banco
//         await user.save();

//         // Atualizando a sessão com o novo e-mail
//         req.session.user.email = user.email;

//         res.status(200).json({ message: 'Informações atualizadas com sucesso.' });

//     } catch (error) {
//         console.error('Erro ao atualizar informações:', error);
//         res.status(500).json({ errors: ['Erro ao atualizar as informações. Tente novamente.'] });
//     }
// });

module.exports = router;