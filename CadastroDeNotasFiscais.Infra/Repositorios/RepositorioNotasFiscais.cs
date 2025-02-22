using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Dominio.Repositorios;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Infra.Repositorios
{
    public class RepositorioNotasFiscais : IRepositorioNotasFiscais
    {
        private readonly IMongoCollection<NotaFiscal> _collection;
        
        public RepositorioNotasFiscais(IOptions<NotasFiscaisConfiguracoesDoBanco> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                bookStoreDatabaseSettings.Value.DatabaseName);

            _collection = mongoDatabase.GetCollection<NotaFiscal>("notasFiscais");
        }

        public void Inserir(NotaFiscal notaFiscal)
        {
            _collection.InsertOne(notaFiscal);
        }

        public NotaFiscal ObterPorId(string id)
        {
            return _collection.Find<NotaFiscal>(notaFiscal => notaFiscal.Id == id).FirstOrDefault();
        }

        public List<NotaFiscal> ObterTodos()
        {
            return _collection.Find(notaFiscal => true).ToList();
        }
    }
}