const AppError = require("../utils/AppError");
const pick = require("../utils/pick");

const CAMPOS = ["nome", "descricao"];

class CategoriaService {
  constructor(repository) {
    this.repository = repository;
  }

  cadastrar(dados) {
    return this.repository.criar(pick(dados, CAMPOS));
  }

  listar() {
    return this.repository.buscarTodos();
  }

  async buscarPorId(id) {
    const categoria = await this.repository.buscarPorId(id);
    if (!categoria) throw new AppError(404, "Categoria não encontrada");
    return categoria;
  }

  async atualizar(id, dados) {
    const categoria = await this.buscarPorId(id);
    return this.repository.atualizar(categoria, pick(dados, CAMPOS));
  }

  async excluir(id) {
    const categoria = await this.buscarPorId(id);
    await this.repository.excluir(categoria);
  }
}

module.exports = CategoriaService;
