using Microsoft.Extensions.DependencyInjection;
using Mongo2Go;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Test
{
    public class TesteBase : IDisposable
    {
        protected readonly IServiceCollection _serviceCollection;
        private readonly MongoDbRunner _runner;
        private readonly IMongoDatabase _database;

        public TesteBase()
        {
            _runner = MongoDbRunner.Start();
            var client = new MongoClient(_runner.ConnectionString);
            _database = client.GetDatabase("teste");
            _serviceCollection = DefinirInjecaoDeDependencia();
        }

        private IServiceCollection DefinirInjecaoDeDependencia()
        {
            var servicos = new ServiceCollection();
            servicos.AddSingleton<IMongoClient>(new MongoClient(_runner.ConnectionString));
            servicos.AddSingleton(_database);

            return servicos;
        }

        protected T ObterServico<T>()
        {
            var provedor = _serviceCollection.BuildServiceProvider();
            return provedor.GetService<T>();
        }

        public void Dispose()
        {
            _runner.Dispose();
        }
    }
}