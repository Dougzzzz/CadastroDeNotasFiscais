using CadastroDeNotasFiscais.Dominio.NotasFiscais;

namespace CadastroDeNotasFiscais.Dominio.Interfaces
{
    public interface IRepositorioNotasFiscais : IRepository<NotaFiscal, FiltroDasNotasFiscais>
    {
        void Inserir(NotaFiscal notaFiscal);
        NotaFiscal ObterPorId(string id);
        List<NotaFiscal> ObterTodos(FiltroDasNotasFiscais filtro);
    }
}
