module.exports = function pick(objeto, campos) {
  const origem = objeto || {};
  const resultado = {};
  for (const campo of campos) {
    if (origem[campo] !== undefined) resultado[campo] = origem[campo];
  }
  return resultado;
};
