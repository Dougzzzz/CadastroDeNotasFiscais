using Microsoft.Extensions.DependencyInjection;

namespace CadastroDeNotasFiscais.Test
{
    public class TesteBase
    {
        protected readonly IServiceCollection _serviceCollection;
        public TesteBase()
        {
            _serviceCollection = DefinirInjecaoDeDependencia();
        }

        private IServiceCollection DefinirInjecaoDeDependencia()
        {
            var servicos = new ServiceCollection();

            return servicos;
        }

        protected T ObterServico<T>()
        {
            var provedor = _serviceCollection.BuildServiceProvider();
            return provedor.GetService<T>();
        }
    }
}