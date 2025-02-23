using System.Collections.Generic;

namespace CadastroDeNotasFiscais.Dominio.Interfaces
{
    public interface IRepository<T>
    {
        void Inserir(T entidade);
        T ObterPorId(string id);
        List<T> ObterTodos();
    }
}