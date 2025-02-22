using CadastroDeNotasFiscais.Dominio.NotasFiscais;

namespace CadastroDeNotasFiscais.Dominio.Repositorios
{
    public interface IRepositorioNotasFiscais : IRepository<NotaFiscal>
    {
        void Inserir(NotaFiscal notaFiscal);
        NotaFiscal ObterPorId(string id);
        List<NotaFiscal> ObterTodos();
    }
}
