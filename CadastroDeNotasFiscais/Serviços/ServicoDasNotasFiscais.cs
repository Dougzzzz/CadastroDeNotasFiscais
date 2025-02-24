using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using FluentValidation;

namespace CadastroDeNotasFiscais.Serviços
{
    public class ServicoDasNotasFiscais
    {
        private readonly RepositorioNotasFiscais _repositorioNotasFiscais;
        private readonly IValidator<NotaFiscal> _validadorNotasFiscais;
        public ServicoDasNotasFiscais(RepositorioNotasFiscais repositorioNotasFiscais, IValidator<NotaFiscal> validadorNotasFiscais)
        {
            _repositorioNotasFiscais = repositorioNotasFiscais;
            _validadorNotasFiscais = validadorNotasFiscais;
        }
        public void Adicionar(NotaFiscal notaFiscal)
        {
            notaFiscal.Numero = _repositorioNotasFiscais.ObterProximoNumeroDaNotaFiscal();
            notaFiscal.DataEmissao = DateTime.Now.ToString("dd/MM/yyyy");
            var resultadoDaValidacao = _validadorNotasFiscais.Validate(notaFiscal);
            if (!resultadoDaValidacao.IsValid)
            {
                var erros = string.Join(",\n ", resultadoDaValidacao.Errors);
                throw new ValidationException($"Não foi possível salvar a nota: {erros}");
            }
            _repositorioNotasFiscais.Inserir(notaFiscal);
        }

        public NotaFiscal ObterPorId(string id)
        {
            var notaFiscal = _repositorioNotasFiscais.ObterPorId(id);
            if (notaFiscal == null)
            {
                throw new Exception("Nota fiscal não encontrada.");
            }
            return notaFiscal;
        }

        public List<NotaFiscal> ObterTodos(FiltroDasNotasFiscais filtro)
        {
            return _repositorioNotasFiscais.ObterTodos(filtro);
        }


    }
}
