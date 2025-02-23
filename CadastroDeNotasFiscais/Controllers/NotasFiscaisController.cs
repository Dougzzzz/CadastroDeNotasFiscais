using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Serviços;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CadastroDeNotasFiscais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasFiscaisController : ControllerBase
    {
        private readonly ServicoDasNotasFiscais _servicoDasNotasFiscais;

        public NotasFiscaisController(ServicoDasNotasFiscais servicoDasNotasFiscais)
        {
            _servicoDasNotasFiscais = servicoDasNotasFiscais;
        }

        [HttpGet]
        public IActionResult ObterTodos()
        {
            var listaDeNotasFiscais = _servicoDasNotasFiscais.ObterTodos();

            return Ok(listaDeNotasFiscais);
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody] NotaFiscal notaFiscal)
        {
            try
            {
                _servicoDasNotasFiscais.Adicionar(notaFiscal);

            }catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Created("Nota fiscal salva com sucesso", notaFiscal);
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(string id)
        {
            try
            {
                var notaFiscal = _servicoDasNotasFiscais.ObterPorId(id);
                return Ok(notaFiscal);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
