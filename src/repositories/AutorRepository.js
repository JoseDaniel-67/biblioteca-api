const { Autor, Livro } = require("../models");

class AutorRepository {
  criar(dados) {
    return Autor.create(dados);
  }

  buscarTodos() {
    return Autor.findAll({ order: [["nome", "ASC"]] });
  }

  buscarPorId(id) {
    return Autor.findByPk(id, {
      include: [{ model: Livro, attributes: ["id", "titulo", "ano", "disponivel"] }]
    });
  }

  atualizar(autor, dados) {
    return autor.update(dados);
  }

  excluir(autor) {
    return autor.destroy();
  }
}

module.exports = AutorRepository;
