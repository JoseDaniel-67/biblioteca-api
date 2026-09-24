const AppError = require("../utils/AppError");
const pick = require("../utils/pick");

const CAMPOS = ["titulo", "isbn", "ano", "disponivel", "autorId"];
const LIMITE_MAXIMO = 100;

function inteiroPositivo(valor, padrao, nomeDoParametro) {
  if (valor === undefined || valor === "") return padrao;
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero < 1) {
    throw new AppError(400, `O parâmetro '${nomeDoParametro}' deve ser um inteiro maior que zero`);
  }
  return numero;
}

class LivroService {
  constructor(livroRepository, autorRepository, categoriaRepository) {
    this.repository = livroRepository;
    this.autorRepository = autorRepository;
    this.categoriaRepository = categoriaRepository;
  }

  async garantirQueAutorExiste(autorId) {
    if (autorId === undefined || autorId === null) return; 
    const autor = await this.autorRepository.buscarPorId(autorId);
    if (!autor) throw new AppError(400, "autorId inválido: autor não encontrado");
  }

  async cadastrar(dados) {
    const livro = pick(dados, CAMPOS);
    await this.garantirQueAutorExiste(livro.autorId);
    const criado = await this.repository.criar(livro);
    return this.buscarPorId(criado.id); 
  }

  async listar(query) {
    const page = inteiroPositivo(query.page, 1, "page");
    const limit = Math.min(inteiroPositivo(query.limit, 10, "limit"), LIMITE_MAXIMO);

    const filtros = {};

    if (query.titulo) filtros.titulo = String(query.titulo);

    if (query.ano !== undefined && query.ano !== "") {
      const ano = Number(query.ano);
      if (!Number.isInteger(ano)) {
        throw new AppError(400, "O filtro 'ano' deve ser um número inteiro");
      }
      filtros.ano = ano;
    }

    if (query.disponivel !== undefined && query.disponivel !== "") {
      if (!["true", "false"].includes(query.disponivel)) {
        throw new AppError(400, "O filtro 'disponivel' deve ser true ou false");
      }
      filtros.disponivel = query.disponivel === "true";
    }

    const { rows, count } = await this.repository.buscarComFiltros(filtros, { page, limit });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async buscarPorId(id) {
    const livro = await this.repository.buscarPorId(id);
    if (!livro) throw new AppError(404, "Livro não encontrado");
    return livro;
  }

  async atualizar(id, dados) {
    const livro = await this.buscarPorId(id);
    const novosDados = pick(dados, CAMPOS);
    await this.garantirQueAutorExiste(novosDados.autorId);
    await this.repository.atualizar(livro, novosDados);
    return this.buscarPorId(id);
  }

  async excluir(id) {
    const livro = await this.buscarPorId(id);
    await this.repository.excluir(livro);
  }

  async associarCategoria(livroId, categoriaId) {
    const livro = await this.buscarPorId(livroId);
    const categoria = await this.categoriaRepository.buscarPorId(categoriaId);
    if (!categoria) throw new AppError(404, "Categoria não encontrada");

    await this.repository.associarCategoria(livro, categoria);
    return this.buscarPorId(livroId);
  }

  async desassociarCategoria(livroId, categoriaId) {
    const livro = await this.buscarPorId(livroId);
    const categoria = await this.categoriaRepository.buscarPorId(categoriaId);
    if (!categoria) throw new AppError(404, "Categoria não encontrada");

    await this.repository.desassociarCategoria(livro, categoria);
  }
}

module.exports = LivroService;
