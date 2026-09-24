const { sequelize } = require("../models");
const AppError = require("../utils/AppError");

// Desafio extra — aqui aparece a TRANSAÇÃO (tudo ou nada).
class EmprestimoService {
  constructor(emprestimoRepository, livroRepository, usuarioRepository) {
    this.repository = emprestimoRepository;
    this.livroRepository = livroRepository;
    this.usuarioRepository = usuarioRepository;
  }

  listar() {
    return this.repository.buscarTodos();
  }

  async buscarPorId(id) {
    const emprestimo = await this.repository.buscarPorId(id);
    if (!emprestimo) throw new AppError(404, "Empréstimo não encontrado");
    return emprestimo;
  }

  async emprestar({ usuarioId, livroId }) {
    if (!usuarioId || !livroId) {
      throw new AppError(400, "Informe usuarioId e livroId");
    }

    const usuario = await this.usuarioRepository.buscarPorId(usuarioId);
    if (!usuario) throw new AppError(404, "Usuário não encontrado");

    const emprestimoCriado = await sequelize.transaction(async (transaction) => {
      const livro = await this.livroRepository.buscarPorIdSimples(livroId, { transaction });
      if (!livro) throw new AppError(404, "Livro não encontrado");
      if (!livro.disponivel) throw new AppError(409, "Livro indisponível para empréstimo");

      const emprestimo = await this.repository.criar(
        { usuarioId, livroId, status: "ATIVO" },
        { transaction }
      );

      await this.livroRepository.atualizar(livro, { disponivel: false }, { transaction });

      return emprestimo;
    });

    return this.buscarPorId(emprestimoCriado.id);
  }

  async devolver(id) {
    await sequelize.transaction(async (transaction) => {
      const emprestimo = await this.repository.buscarPorId(id, { transaction });
      if (!emprestimo) throw new AppError(404, "Empréstimo não encontrado");
      if (emprestimo.status === "DEVOLVIDO") {
        throw new AppError(409, "Este empréstimo já foi devolvido");
      }

      await this.repository.atualizar(
        emprestimo,
        { status: "DEVOLVIDO", dataDevolucao: new Date() },
        { transaction }
      );

      const livro = await this.livroRepository.buscarPorIdSimples(emprestimo.livroId, { transaction });
      await this.livroRepository.atualizar(livro, { disponivel: true }, { transaction });
    });

    return this.buscarPorId(id);
  }
}

module.exports = EmprestimoService;
