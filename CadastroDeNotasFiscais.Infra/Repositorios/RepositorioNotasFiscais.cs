using CadastroDeNotasFiscais.Dominio.Interfaces;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text.RegularExpressions;

namespace CadastroDeNotasFiscais.Infra.Repositorios
{
    public class RepositorioNotasFiscais : IRepositorioNotasFiscais
    {
        private readonly IMongoCollection<NotaFiscal> _collection;
        private readonly IMongoCollection<ContadorNotasFiscais> _contadoresCollection;
        private readonly MongoClient _mongoClient;
        private readonly bool _isTestEnvironment;

        public RepositorioNotasFiscais(IOptions<NotasFiscaisConfiguracoesDoBanco> notasFiscaisDatabase)
        {
            _mongoClient = new MongoClient(notasFiscaisDatabase.Value.ConnectionString);

            var mongoDatabase = _mongoClient.GetDatabase(
                notasFiscaisDatabase.Value.DatabaseName);

            _contadoresCollection = mongoDatabase.GetCollection<ContadorNotasFiscais>("contadores");
            _collection = mongoDatabase.GetCollection<NotaFiscal>("notasFiscais");
        }

        public RepositorioNotasFiscais(IMongoDatabase database, bool isTestEnvironment = false)
        {
            _mongoClient = new MongoClient(database.Client.Settings);
            _contadoresCollection = database.GetCollection<ContadorNotasFiscais>("contadores");
            _collection = database.GetCollection<NotaFiscal>("notasFiscais");
            _isTestEnvironment = isTestEnvironment;
        }

        public void Inserir(NotaFiscal notaFiscal)
        {
            ExecutarTransaction(() =>
            {
                _collection.InsertOne(notaFiscal);
            });
        }

        public NotaFiscal ObterPorId(string id)
        {
            return _collection.Find(notaFiscal => notaFiscal.Id == id).FirstOrDefault();
        }

        public List<NotaFiscal> ObterTodos(FiltroDasNotasFiscais filtro)
        {
            var query = _collection.AsQueryable();
            if (filtro != null)
            {
                if (filtro.NumeroDaNota != null)
                {
                    query = query.Where(notaFiscal =>
                            notaFiscal.Numero == filtro.NumeroDaNota);
                }
                if (filtro.DataEmissao != null)
                {
                    query = query.Where(notaFiscal =>
                            notaFiscal.DataEmissao == filtro.DataEmissao);
                }
                if (filtro.NomeDoCliente != null)
                {
                    query = query.Where(notaFiscal =>
                                    Regex.IsMatch(notaFiscal.Cliente.Nome, filtro.NomeDoCliente, RegexOptions.IgnoreCase));
                }
                if (filtro.NomeDoFornecedor != null)
                {
                    query = query.Where(notaFiscal =>
                                    Regex.IsMatch(notaFiscal.Fornecedor.Nome, filtro.NomeDoFornecedor, RegexOptions.IgnoreCase));
                }

            }
            return query.ToList();
        }

        public int ObterProximoNumeroDaNotaFiscal()
        {
            var filtro = Builders<ContadorNotasFiscais>.Filter.Eq(c => c.Id, "ContadorNotasFiscais");
            var atualizacao = Builders<ContadorNotasFiscais>.Update.Inc(c => c.Sequencia, 1);
            var opcoes = new FindOneAndUpdateOptions<ContadorNotasFiscais>
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

        private void ExecutarTransaction(Action action)
        {
            if (_isTestEnvironment)
            {
                action();
                return;
            }

            try
            {
                using (var session = _mongoClient.StartSession())
                {
                    session.StartTransaction();
                    try
                    {
                        action();
                        session.CommitTransaction();
                    }
                    catch
                    {
                        session.AbortTransaction();
                        throw;
                    }
                }
            }
            catch (NotSupportedException)
            {
                action();
            }
        }
    }
}