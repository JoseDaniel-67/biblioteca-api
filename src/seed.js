const { sequelize, Autor, Livro, Categoria } = require("./models");

async function seed() {
  await sequelize.sync();

  const [machado] = await Autor.findOrCreate({
    where: { email: "machado@email.com" },
    defaults: { nome: "Machado de Assis", nacionalidade: "Brasileiro" }
  });
  const [clarice] = await Autor.findOrCreate({
    where: { email: "clarice@email.com" },
    defaults: { nome: "Clarice Lispector", nacionalidade: "Brasileira" }
  });

  const [romance] = await Categoria.findOrCreate({
    where: { nome: "Romance" },
    defaults: { descricao: "Narrativas em prosa" }
  });
  const [classico] = await Categoria.findOrCreate({
    where: { nome: "Clássico" },
    defaults: { descricao: "Obras consagradas da literatura" }
  });

  const [domCasmurro] = await Livro.findOrCreate({
    where: { isbn: "9780000000001" },
    defaults: { titulo: "Dom Casmurro", ano: 1899, autorId: machado.id }
  });
  const [memorias] = await Livro.findOrCreate({
    where: { isbn: "9780000000002" },
    defaults: { titulo: "Memórias Póstumas de Brás Cubas", ano: 1881, autorId: machado.id }
  });
  const [hora] = await Livro.findOrCreate({
    where: { isbn: "9780000000003" },
    defaults: { titulo: "A Hora da Estrela", ano: 1977, autorId: clarice.id }
  });

  await domCasmurro.addCategorias([romance, classico]);
  await memorias.addCategorias([romance, classico]);
  await hora.addCategoria(romance);

  console.log("Seed concluído.");
  await sequelize.close();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
