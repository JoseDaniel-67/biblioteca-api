const AppError = require("../utils/AppError");
const pick = require("../utils/pick");

class UsuarioService {
  constructor(repository) {
    this.repository = repository;
  }

  cadastrar(dados) {
    return this.repository.criar(pick(dados, ["nome", "email"]));
  }

  listar() {
    return this.repository.buscarTodos();
  }

  async buscarPorId(id) {
    const usuario = await this.repository.buscarPorId(id);
    if (!usuario) throw new AppError(404, "Usuário não encontrado");
    return usuario;
  }
}

module.exports = UsuarioService;
