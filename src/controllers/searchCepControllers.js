const AppError = require("../utils/appError");

class SearchCepControllers {
  async show(request, response) {
    const { cep } = request.body;

    try {
      const fetch = await import("node-fetch");

      const fetchedData = await fetch.default(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await fetchedData.json();
      
      if (data.erro) {
        throw new AppError("CEP não encontrado", 404);
      }
      
      const address = data;

      response.json({
        street: address.logradouro,
        district: address.bairro,
        city: address.localidade,
        country: address.uf,
        cep: address.cep,
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = new SearchCepControllers();
