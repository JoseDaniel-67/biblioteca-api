const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O nome é obrigatório" },
        notEmpty: { msg: "O nome não pode ser vazio" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "O e-mail é obrigatório" },
        isEmail: { msg: "O e-mail informado tem formato inválido" }
      }
    }
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios"
  }
);

module.exports = Usuario;
