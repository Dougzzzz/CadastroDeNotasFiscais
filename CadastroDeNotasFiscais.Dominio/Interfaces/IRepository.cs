using System.Collections.Generic;

namespace CadastroDeNotasFiscais.Dominio.Interfaces
{
    public interface IRepository<T, TFiltro>
    {
        void Inserir(T entidade);
        T ObterPorId(string id);
        List<T> ObterTodos(TFiltro filtro = default);
    }
}