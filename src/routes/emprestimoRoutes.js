const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const EmprestimoRepository = require("../repositories/EmprestimoRepository");
const LivroRepository = require("../repositories/LivroRepository");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const EmprestimoService = require("../services/EmprestimoService");
const EmprestimoController = require("../controllers/EmprestimoController");

const service = new EmprestimoService(
  new EmprestimoRepository(),
  new LivroRepository(),
  new UsuarioRepository()
);
const controller = new EmprestimoController(service);

const router = Router();

router.post("/", asyncHandler(controller.criar));
router.get("/", asyncHandler(controller.listar));
router.get("/:id", asyncHandler(controller.buscarPorId));
router.put("/:id/devolucao", asyncHandler(controller.devolver));

module.exports = router;
