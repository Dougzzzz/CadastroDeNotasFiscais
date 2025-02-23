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
            var filtro = new FiltroDasNotasFiscais();
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);

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

        [Fact]
        public void DeveObterTodosComFiltroDeNumeroDaNota()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais { NumeroDaNota = 2 };
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void DeveObterTodosComFiltroDeDataEmissao()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais { DataEmissao = "02/01/2025" };
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void DeveObterTodosComFiltroDeNomeDoCliente()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais { NomeDoCliente = "tiao" };
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void DeveObterTodosComFiltroDeNomeDoFornecedor()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais { NomeDoFornecedor = "tinoco" };
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }


        private List<NotaFiscal> ObterNotasFiscais()
        {
            return new List<NotaFiscal>()
            {
                new NotaFiscal 
                {
                    Numero = 1,
                    Valor = 100,
                    DataEmissao = "01/01/2025",
                    Cliente = new Cliente { Nome = "Joao" },
                    Fornecedor = new Fornecedor { Nome = "Tunico" } 
                },
                new NotaFiscal
                {
                    Numero = 2,
                    Valor = 200,
                    DataEmissao = "02/01/2025",
                    Cliente = new Cliente { Nome = "Tiao" },
                    Fornecedor = new Fornecedor { Nome = "Tinoco" }
                },
                new NotaFiscal
                {
                    Numero = 3,
                    Valor = 300,
                    DataEmissao = "03/01/2025",
                    Cliente = new Cliente { Nome = "Carreiro" },
                    Fornecedor = new Fornecedor { Nome = "Jose" }
                }
            };
        }

        public void Dispose()
        {
            _runner.Dispose();
        }
    }


}