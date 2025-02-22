using CadastroDeNotasFiscais.Dominio.NotasFiscais;

namespace CadastroDeNotasFiscais.Dominio
{
    public interface IRepositorio
    {
        void Inserir(NotaFiscal notaFiscal);
        NotaFiscal ObterPorId(int id);
        List<NotaFiscal> ObterTodos();
    }
}
