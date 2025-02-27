using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Serviços;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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
        [SwaggerOperation(Summary = "Obter todas as notas fiscais", Description = "Retorna uma lista de notas fiscais, opcionalmente filtrada.")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<NotaFiscal>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult ObterTodos([FromQuery] FiltroDasNotasFiscais filtro = null)
        {
            var listaDeNotasFiscais = _servicoDasNotasFiscais.ObterTodos(filtro);

            return Ok(listaDeNotasFiscais);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Adicionar uma nova nota fiscal", Description = "Adiciona uma nova nota fiscal ao sistema.")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(NotaFiscal))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Adicionar([FromBody] NotaFiscal notaFiscal)
        {
            try
            {
                _servicoDasNotasFiscais.Adicionar(notaFiscal);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Created(notaFiscal.Id, notaFiscal);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Obter uma nota fiscal por ID", Description = "Retorna uma nota fiscal específica com base no ID fornecido.")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(NotaFiscal))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
