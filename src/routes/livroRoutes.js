const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const LivroRepository = require("../repositories/LivroRepository");
const AutorRepository = require("../repositories/AutorRepository");
const CategoriaRepository = require("../repositories/CategoriaRepository");
const LivroService = require("../services/LivroService");
const LivroController = require("../controllers/LivroController");

const service = new LivroService(
  new LivroRepository(),
  new AutorRepository(),
  new CategoriaRepository()
);
const controller = new LivroController(service);

const router = Router();

router.post("/", asyncHandler(controller.criar));
router.get("/", asyncHandler(controller.listar));
router.get("/:id", asyncHandler(controller.buscarPorId));
router.put("/:id", asyncHandler(controller.atualizar));
router.delete("/:id", asyncHandler(controller.excluir));

router.post("/:livroId/categorias/:categoriaId", asyncHandler(controller.associarCategoria));
router.delete("/:livroId/categorias/:categoriaId", asyncHandler(controller.desassociarCategoria));

module.exports = router;
