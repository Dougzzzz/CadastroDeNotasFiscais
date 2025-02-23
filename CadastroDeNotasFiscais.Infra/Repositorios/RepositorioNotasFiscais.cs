using CadastroDeNotasFiscais.Dominio.Interfaces;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Infra.Repositorios
{
    public class RepositorioNotasFiscais : IRepositorioNotasFiscais
    {
        private readonly IMongoCollection<NotaFiscal> _collection;
        private readonly IMongoCollection<Contador> _contadoresCollection;

        public RepositorioNotasFiscais(IOptions<NotasFiscaisConfiguracoesDoBanco> notasFiscaisDatabase)
        {
            var mongoClient = new MongoClient(
            notasFiscaisDatabase.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                notasFiscaisDatabase.Value.DatabaseName);

            _contadoresCollection = mongoDatabase.GetCollection<Contador>("contadores");
            _collection = mongoDatabase.GetCollection<NotaFiscal>("notasFiscais");
        }

        public RepositorioNotasFiscais(IMongoDatabase database)
        {
            _contadoresCollection = database.GetCollection<Contador>("contadores");
            _collection = database.GetCollection<NotaFiscal>("notasFiscais");
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
            return _collection.Find(notasFiscais => true).ToList();
        }

        public int ObterProximoNumeroDaNotaFiscal()
        {
            var filtro = Builders<Contador>.Filter.Eq(c => c.Id, "ContadorNotasFiscais");
            var atualizacao = Builders<Contador>.Update.Inc(c => c.Sequencia, 1);
            var opcoes = new FindOneAndUpdateOptions<Contador>
            {
                ReturnDocument = ReturnDocument.After,
                IsUpsert = true
            };

            var contadorAtualizado = _contadoresCollection.FindOneAndUpdate(
                filtro,
                atualizacao,
                opcoes
            );

            return contadorAtualizado.Sequencia;
        }
    }
}