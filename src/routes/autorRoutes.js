const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const AutorRepository = require("../repositories/AutorRepository");
const AutorService = require("../services/AutorService");
const AutorController = require("../controllers/AutorController");

const controller = new AutorController(new AutorService(new AutorRepository()));

const router = Router();

router.post("/", asyncHandler(controller.criar));
router.get("/", asyncHandler(controller.listar));
router.get("/:id", asyncHandler(controller.buscarPorId));
router.put("/:id", asyncHandler(controller.atualizar));
router.delete("/:id", asyncHandler(controller.excluir));

module.exports = router;
