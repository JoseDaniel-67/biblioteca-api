const { Categoria } = require("../models");

class CategoriaRepository {
  criar(dados) {
    return Categoria.create(dados);
  }

  buscarTodos() {
    return Categoria.findAll({ order: [["nome", "ASC"]] });
  }

  buscarPorId(id) {
    return Categoria.findByPk(id);
  }

  atualizar(categoria, dados) {
    return categoria.update(dados);
  }

  excluir(categoria) {
    return categoria.destroy();
  }
}

module.exports = CategoriaRepository;
