class EmprestimoController {
  constructor(service) {
    this.service = service;
  }

  criar = async (req, res) => {
    const { usuarioId, livroId } = req.body || {};
    res.status(201).json(await this.service.emprestar({ usuarioId, livroId }));
  };

  listar = async (req, res) => {
    res.json(await this.service.listar());
  };

  buscarPorId = async (req, res) => {
    res.json(await this.service.buscarPorId(req.params.id));
  };

  devolver = async (req, res) => {
    res.json(await this.service.devolver(req.params.id));
  };
}

module.exports = EmprestimoController;
