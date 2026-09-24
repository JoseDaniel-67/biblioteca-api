class AutorController {
  constructor(service) {
    this.service = service;
  }

  criar = async (req, res) => {
    const autor = await this.service.cadastrar(req.body);
    res.status(201).json(autor);
  };

  listar = async (req, res) => {
    res.json(await this.service.listar());
  };

  buscarPorId = async (req, res) => {
    res.json(await this.service.buscarPorId(req.params.id));
  };

  atualizar = async (req, res) => {
    res.json(await this.service.atualizar(req.params.id, req.body));
  };

  excluir = async (req, res) => {
    await this.service.excluir(req.params.id);
    res.status(204).send();
  };
}

module.exports = AutorController;
