const AppError = require("../utils/AppError");
const pick = require("../utils/pick");

const CAMPOS = ["nome", "email", "nacionalidade"];

class AutorService {
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
    const autor = await this.repository.buscarPorId(id);
    if (!autor) throw new AppError(404, "Autor não encontrado");
    return autor;
  }

  async atualizar(id, dados) {
    const autor = await this.buscarPorId(id);
    return this.repository.atualizar(autor, pick(dados, CAMPOS));
  }

  async excluir(id) {
    const autor = await this.buscarPorId(id);
    await this.repository.excluir(autor);
  }
}

module.exports = AutorService;
