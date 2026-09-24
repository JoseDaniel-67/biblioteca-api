class UsuarioController {
  constructor(service) {
    this.service = service;
  }

  criar = async (req, res) => {
    res.status(201).json(await this.service.cadastrar(req.body));
  };

  listar = async (req, res) => {
    res.json(await this.service.listar());
  };

  buscarPorId = async (req, res) => {
    res.json(await this.service.buscarPorId(req.params.id));
  };
}

module.exports = UsuarioController;
