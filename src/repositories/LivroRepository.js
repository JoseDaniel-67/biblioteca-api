const { Op } = require("sequelize");
const { Livro, Autor, Categoria } = require("../models");

const INCLUDE_PADRAO = [
  { model: Autor, attributes: ["id", "nome"] },
  {
    model: Categoria,
    as: "categorias",
    attributes: ["id", "nome"],
    through: { attributes: [] } 
  }
];

class LivroRepository {
  criar(dados) {
    return Livro.create(dados);
  }

  buscarComFiltros(filtros, { page, limit }) {
    const where = {};

    if (filtros.titulo) {
      where.titulo = { [Op.like]: `%${filtros.titulo}%` };
    }
    if (filtros.ano !== undefined) {
      where.ano = filtros.ano;
    }
    if (filtros.disponivel !== undefined) {
      where.disponivel = filtros.disponivel;
    }

    const offset = (page - 1) * limit;

    return Livro.findAndCountAll({
      where,
      include: INCLUDE_PADRAO,
      order: [["id", "ASC"]],
      limit,
      offset,
      distinct: true
    });
  }

  buscarPorId(id) {
    return Livro.findByPk(id, { include: INCLUDE_PADRAO });
  }

  buscarPorIdSimples(id, options = {}) {
    return Livro.findByPk(id, options);
  }

  atualizar(livro, dados, options = {}) {
    return livro.update(dados, options);
  }

  excluir(livro) {
    return livro.destroy();
  }

  associarCategoria(livro, categoria) {
    return livro.addCategoria(categoria);
  }

  desassociarCategoria(livro, categoria) {
    return livro.removeCategoria(categoria);
  }
}

module.exports = LivroRepository;
