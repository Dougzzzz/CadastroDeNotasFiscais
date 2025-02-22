namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class ServicoDasNotasFiscais 
    {
        protected readonly IRepositorio _repositorio;

        public ServicoDasNotasFiscais(IRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        public List<NotaFiscal> ObterTodos()
        {
            return _repositorio.ObterTodos();
        }
    }
}
