using CadastroDeNotasFiscais.Dominio.NotasFiscais;

namespace CadastroDeNotasFiscais.Dominio.Interfaces
{
    public interface IRepositorioNotasFiscais : IRepository<NotaFiscal, FiltroDasNotasFiscais>
    {
    }
}
