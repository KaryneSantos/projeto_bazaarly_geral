const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_usuario: {
        type: DataTypes.ENUM('vendedor', 'comprador'),
        allowNull: false,
        defaultValue: 'comprador',
    }
    // telefone: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },
    // genero: {
    //     type: DataTypes.ENUM('masculino', 'feminino', 'outro'),
    //     allowNull: true,
    // },
}, {
    timestamps: true,
});

module.exports = User;
