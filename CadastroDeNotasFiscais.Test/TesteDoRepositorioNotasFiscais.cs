using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using Mongo2Go;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Test
{
    public class TesteDoRepositorioNotasFiscais : IDisposable
    {
        private readonly MongoDbRunner _runner;
        private readonly IMongoDatabase _database;
        private readonly RepositorioNotasFiscais _repository;

        public TesteDoRepositorioNotasFiscais()
        {
            _runner = MongoDbRunner.Start();
            var client = new MongoClient(_runner.ConnectionString);
            _database = client.GetDatabase("TestDatabase");
            _repository = new RepositorioNotasFiscais(_database);
        }


        [Fact]
        public void DeveInserirNotaFiscal()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente {  Nome = "Cliente 1" },
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1" }
            };

            _repository.Inserir(notaFiscal);

            var notaFiscalInserida = _database.GetCollection<NotaFiscal>("notasFiscais")
                .Find(Builders<NotaFiscal>.Filter.Empty)
                .FirstOrDefault();

            Assert.NotNull(notaFiscalInserida);
            Assert.Equal(notaFiscal.Valor, notaFiscalInserida.Valor);
            Assert.Equal(notaFiscal.Cliente.Nome, notaFiscalInserida.Cliente.Nome);
            Assert.Equal(notaFiscal.Fornecedor.Nome, notaFiscalInserida.Fornecedor.Nome);
        }

        [Fact]
        public void DeveObterNotasFiscais()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);

            var notasFiscaisObtidas = _repository.ObterTodos();

            Assert.Equal(notasFiscais.Count, notasFiscaisObtidas.Count);
            Assert.Collection(notasFiscaisObtidas,
                item => Assert.Equal(notasFiscais[0].Valor, item.Valor),
                item => Assert.Equal(notasFiscais[1].Valor, item.Valor),
                item => Assert.Equal(notasFiscais[2].Valor, item.Valor)
            );
        }

        [Fact]
        public void DeveObterNotaFiscalPorId()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var notaFiscalObtida = _repository.ObterPorId(notasFiscais[1].Id);
            Assert.NotNull(notaFiscalObtida);
            Assert.Equivalent(notasFiscais[1], notaFiscalObtida);
        }

        private List<NotaFiscal> ObterNotasFiscais()
        {
            return new List<NotaFiscal>()
            {
                new NotaFiscal 
                { 
                    Valor = 100,
                    Cliente = new Cliente { Nome = "Cliente 1" },
                    Fornecedor = new Fornecedor { Nome = "Fornecedor 1" } 
                },
                new NotaFiscal
                {
                    Valor = 200,
                    Cliente = new Cliente { Nome = "Cliente 2" },
                    Fornecedor = new Fornecedor { Nome = "Fornecedor 2" }
                },
                new NotaFiscal
                {
                    Valor = 300,
                    Cliente = new Cliente { Nome = "Cliente 3" },
                    Fornecedor = new Fornecedor { Nome = "Fornecedor 3" }
                }
            };
        }

        public void Dispose()
        {
            _runner.Dispose();
        }
    }


}