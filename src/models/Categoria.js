const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Categoria extends Model {}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "O nome da categoria é obrigatório" },
        notEmpty: { msg: "O nome da categoria não pode ser vazio" }
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "categorias"
  }
);

module.exports = Categoria;
