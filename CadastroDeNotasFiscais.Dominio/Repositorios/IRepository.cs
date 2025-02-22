using System.Collections.Generic;

namespace CadastroDeNotasFiscais.Dominio.Repositorios
{
    public interface IRepository<T>
    {
        void Inserir(T entidade);
        T ObterPorId(string id);
        List<T> ObterTodos();
    }
}