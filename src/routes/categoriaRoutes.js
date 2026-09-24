const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const CategoriaRepository = require("../repositories/CategoriaRepository");
const CategoriaService = require("../services/CategoriaService");
const CategoriaController = require("../controllers/CategoriaController");

const controller = new CategoriaController(new CategoriaService(new CategoriaRepository()));

const router = Router();

router.post("/", asyncHandler(controller.criar));
router.get("/", asyncHandler(controller.listar));
router.get("/:id", asyncHandler(controller.buscarPorId));
router.put("/:id", asyncHandler(controller.atualizar));
router.delete("/:id", asyncHandler(controller.excluir));

module.exports = router;
