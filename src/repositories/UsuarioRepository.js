const { Usuario } = require("../models");

class UsuarioRepository {
  criar(dados) {
    return Usuario.create(dados);
  }

  buscarTodos() {
    return Usuario.findAll({ order: [["nome", "ASC"]] });
  }

  buscarPorId(id) {
    return Usuario.findByPk(id);
  }
}

module.exports = UsuarioRepository;
