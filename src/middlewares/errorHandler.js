const AppError = require("../utils/AppError");

// Rota inexistente
function rotaNaoEncontrada(req, res) {
  res.status(404).json({ erro: "Rota não encontrada" });
}
function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ erro: err.message });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const campos = err.errors.map((e) => e.path).join(", ");
    return res.status(409).json({ erro: `Já existe um registro com este valor: ${campos}` });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      erro: "Operação não permitida: existem registros relacionados a este item"
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      erro: "Erro de validação",
      detalhes: err.errors.map((e) => ({ campo: e.path, mensagem: e.message }))
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
  }

  console.error(err);
  return res.status(500).json({ erro: "Erro interno do servidor" });
}

module.exports = { rotaNaoEncontrada, errorHandler };
