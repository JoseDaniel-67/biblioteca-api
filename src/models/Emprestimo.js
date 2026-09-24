const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Emprestimo extends Model {}

Emprestimo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "O usuarioId é obrigatório" } }
    },
    livroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "O livroId é obrigatório" } }
    },
    dataEmprestimo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    dataDevolucao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ATIVO",
      validate: {
        isIn: {
          args: [["ATIVO", "DEVOLVIDO"]],
          msg: "O status deve ser ATIVO ou DEVOLVIDO"
        }
      }
    }
  },
  {
    sequelize,
    modelName: "Emprestimo",
    tableName: "emprestimos"
  }
);

module.exports = Emprestimo;
