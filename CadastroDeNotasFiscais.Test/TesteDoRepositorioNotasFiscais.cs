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
        public void deve_inserir_nota_fiscal()
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
        public void deve_obter_notas_fiscais()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais(null,null,null,null);
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);

            Assert.Equal(notasFiscais.Count, notasFiscaisObtidas.Count);
            Assert.Collection(notasFiscaisObtidas,
                item => Assert.Equal(notasFiscais[0].Valor, item.Valor),
                item => Assert.Equal(notasFiscais[1].Valor, item.Valor),
                item => Assert.Equal(notasFiscais[2].Valor, item.Valor)
            );
        }

        [Fact]
        public void deve_obter_nota_fiscal_por_id()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var notaFiscalObtida = _repository.ObterPorId(notasFiscais[1].Id);
            Assert.NotNull(notaFiscalObtida);
            Assert.Equivalent(notasFiscais[1], notaFiscalObtida);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_numero_da_nota()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais(null, null, null, 2);
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_data_emissao()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais(null, null, "02/01/2025", null);
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_nome_do_cliente()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais ("tiao", null, null, null);
            var notasFiscaisObtidas = _repository.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_nome_do_fornecedor()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais (null, "tinoco", null, null);
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