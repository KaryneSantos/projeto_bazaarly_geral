const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/db');

app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

sequelize.sync({ force: false}).then(() => {
    console.log('Banco de dados sincronizado.');
}).catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

const indexRouter = require('./router/index');
app.use('/', indexRouter);

const userRouter = require('./router/user');
app.use('/sign', userRouter);

const authRouter = require('./router/auth');
app.use('/auth', authRouter);

const logoutRouter = require('./router/logout');
app.use('/logout', logoutRouter);

const profileRouter = require('./router/profile');
app.use('/profile', profileRouter);

const carrinhoRouter = require('./router/carrinho');
app.use('/carrinho', carrinhoRouter);

const userProfileRouter = require('./router/profile_user');
app.use('/user', userProfileRouter);

const signVendedorRouter = require('./router/sign_vendedor');
app.use('/signup_vendendor', signVendedorRouter);

// Rotas de produtos
const sapatoRouter = require('./router/sapato');
app.use('/sapato', sapatoRouter);

const mobiliasRouter = require('./router/mobilias');
app.use('/mobilias', mobiliasRouter);

const joiasRouter = require('./router/joias');
app.use('/joias', joiasRouter);

const babyRouter = require('./router/baby');
app.use('/baby', babyRouter);

const roupaFemRouter = require('./router/roupasFem');
app.use('/roupaFem', roupaFemRouter);

const roupaMascRouter = require('./router/roupasMasc');
app.use('/roupaMasc', roupaMascRouter);

const esportesRouter = require('./router/esportes');
app.use('/esportes', esportesRouter);

const houseRouter = require('./router/itens_casa');
app.use('/house', houseRouter);

const tecnologiaRouter = require('./router/tecnologia');
app.use('/tecnologia', tecnologiaRouter);

const livrosRouter = require('./router/livros');
app.use('/livros', livrosRouter);




const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});