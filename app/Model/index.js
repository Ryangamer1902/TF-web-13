const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING
}, { tableName: 'users', timestamps: false });

const Documento = sequelize.define('Documento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  documento: DataTypes.STRING,
  id_user: DataTypes.INTEGER
}, { tableName: 'documentos', timestamps: true });

User.hasMany(Documento, { foreignKey: 'id_user' });
Documento.belongsTo(User, { foreignKey: 'id_user' });

module.exports = { sequelize, User, Documento };
