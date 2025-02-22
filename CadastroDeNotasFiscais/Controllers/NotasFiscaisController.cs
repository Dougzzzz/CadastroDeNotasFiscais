using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using Microsoft.AspNetCore.Mvc;

namespace CadastroDeNotasFiscais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasFiscaisController
    {
        private readonly RepositorioNotasFiscais _repositorio;

        public NotasFiscaisController(RepositorioNotasFiscais repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            return new OkObjectResult(_repositorio.ObterTodos());
        }

        [HttpPost]
        public IActionResult Inserir([FromBody] NotaFiscal notaFiscal)
        {
            _repositorio.Inserir(notaFiscal);
            return new OkResult();
        }
    }
}
