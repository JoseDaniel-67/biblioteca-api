const express = require("express");
const { sequelize } = require("./models");

const autorRoutes = require("./routes/autorRoutes");
const livroRoutes = require("./routes/livroRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const emprestimoRoutes = require("./routes/emprestimoRoutes");
const { rotaNaoEncontrada, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API da Biblioteca no ar" });
});

app.use("/autores", autorRoutes);
app.use("/livros", livroRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes); 
app.use("/emprestimos", emprestimoRoutes); 

app.use(rotaNaoEncontrada);
app.use(errorHandler);

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado!");

    await sequelize.sync();
    console.log("Tabelas sincronizadas.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

iniciar();
