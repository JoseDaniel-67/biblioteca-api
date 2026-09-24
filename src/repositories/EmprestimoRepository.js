const { Emprestimo, Usuario, Livro } = require("../models");

// Desafio extra
const INCLUDE_PADRAO = [
  { model: Usuario, attributes: ["id", "nome"] },
  { model: Livro, attributes: ["id", "titulo", "disponivel"] }
];

class EmprestimoRepository {
  // "options" permite receber { transaction } vindo do Service
  criar(dados, options = {}) {
    return Emprestimo.create(dados, options);
  }

  buscarTodos() {
    return Emprestimo.findAll({ include: INCLUDE_PADRAO, order: [["id", "DESC"]] });
  }

  buscarPorId(id, options = {}) {
    return Emprestimo.findByPk(id, { include: INCLUDE_PADRAO, ...options });
  }

  atualizar(emprestimo, dados, options = {}) {
    return emprestimo.update(dados, options);
  }
}

module.exports = EmprestimoRepository;
