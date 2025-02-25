using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using CadastroDeNotasFiscais.Serviços;
using FluentValidation;
using Mongo2Go;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Test
{
    public class TesteDoServicoDeNotasFiscais : IDisposable
    {
        private readonly MongoDbRunner _runner;
        private readonly IMongoDatabase _database;
        private readonly RepositorioNotasFiscais _repository;
        private readonly ValidadorNotasFiscais _validadorNotasFiscais;
        private readonly ServicoDasNotasFiscais _servicoDasNotasFiscais;

        public TesteDoServicoDeNotasFiscais()
        {
            _runner = MongoDbRunner.Start();
            var client = new MongoClient(_runner.ConnectionString);
            _database = client.GetDatabase("TestDatabase");
            _repository = new RepositorioNotasFiscais(_database);
            _validadorNotasFiscais = new ValidadorNotasFiscais();
            _servicoDasNotasFiscais = new ServicoDasNotasFiscais(_repository, _validadorNotasFiscais);
        }

        [Fact]
        public void deve_inserir_nota_fiscal()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Nome = "Cliente 1", Inscricao = "inscricao" },
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1", Inscricao = "inscricao" }
            };
            _servicoDasNotasFiscais.Adicionar(notaFiscal);
            var notaFiscalInserida = _database.GetCollection<NotaFiscal>("notasFiscais")
                .Find(Builders<NotaFiscal>.Filter.Empty)
                .FirstOrDefault();

            Assert.NotNull(notaFiscalInserida);
            Assert.NotEmpty(notaFiscalInserida.Id);
            Assert.NotEmpty(notaFiscalInserida.DataEmissao);
            Assert.True(notaFiscalInserida.Numero > 0);
            Assert.Equal(notaFiscal.Valor, notaFiscalInserida.Valor);
            Assert.Equal(notaFiscal.Cliente.Nome, notaFiscalInserida.Cliente.Nome);
            Assert.Equal(notaFiscal.Fornecedor.Nome, notaFiscalInserida.Fornecedor.Nome);
        }

        [Fact]
        public void deve_obter_todas_notas_fiscais()
        {
            var notasFiscais = ObterNotasFiscais();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais(null,null,null,null);
            var notasFiscaisObtidas = _servicoDasNotasFiscais.ObterTodos(filtro);
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
            var notaFiscalObtida = _servicoDasNotasFiscais.ObterPorId(notasFiscais[0].Id);
            Assert.NotNull(notaFiscalObtida);
            Assert.Equal(notasFiscais[0].Valor, notaFiscalObtida.Valor);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_com_valor_negativo()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = -100,
                Cliente = new Cliente { Nome = "Cliente 1", Inscricao = "inscricao" },
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1", Inscricao = "inscricao" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: O valor da nota fiscal é obrigatório e não pode ser menor que 0.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_sem_cliente()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = null,
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1", Inscricao = "inscricao" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: O cliente da nota fiscal é obrigatório.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_sem_fornecedor()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Nome = "Cliente 1", Inscricao = "inscricao" },
                Fornecedor = null
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: O fornecedor da nota fiscal é obrigatório.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_com_cliente_sem_nome()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Inscricao = "Inscricao" },
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1", Inscricao = "inscricao" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: O nome do cliente é obrigatório.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_com_cliente_sem_inscricao()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Nome = "Cliente 1" },
                Fornecedor = new Fornecedor { Nome = "Fornecedor 1", Inscricao = "inscricao" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: A inscrição do cliente é obrigatória.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_com_fornecedor_sem_nome()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Nome = "Fornecedor 1", Inscricao = "inscricao" },
                Fornecedor = new Fornecedor { Inscricao = "Inscricao" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: O nome do fornecedor é obrigatório.", excecao.Message);
        }

        [Fact]
        public void deve_estourar_validacao_ao_inserir_nota_fiscal_com_fornecedor_sem_inscricao()
        {
            var notaFiscal = new NotaFiscal
            {
                Valor = 100,
                Cliente = new Cliente { Nome = "Fornecedor 1", Inscricao = "inscricao" },
                Fornecedor = new Fornecedor { Nome = "Cliente 1" }
            };
            var excecao = Assert.Throws<ValidationException>(() => _servicoDasNotasFiscais.Adicionar(notaFiscal));
            Assert.Equal("Não foi possível salvar a nota: A inscrição do fornecedor é obrigatória.", excecao.Message);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_numero_da_nota()
        {
            var notasFiscais = ObterNotasFiscaisParaFiltros();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais (null, null, null, 2);
            var notasFiscaisObtidas = _servicoDasNotasFiscais.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_data_emissao()
        {
            var notasFiscais = ObterNotasFiscaisParaFiltros();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais (null, null, "02/01/2025", null);
            var notasFiscaisObtidas = _servicoDasNotasFiscais.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void deve_obter_todos_com_filtro_de_nome_do_cliente()
        {
            var notasFiscais = ObterNotasFiscaisParaFiltros();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais ("tiao", null, null, null);
            var notasFiscaisObtidas = _servicoDasNotasFiscais.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }

        [Fact]
        public void DeveObterTodosComFiltroDeNomeDoFornecedor()
        {
            var notasFiscais = ObterNotasFiscaisParaFiltros();
            _database.GetCollection<NotaFiscal>("notasFiscais").InsertMany(notasFiscais);
            var filtro = new FiltroDasNotasFiscais (null, "tinoco", null, null);
            var notasFiscaisObtidas = _servicoDasNotasFiscais.ObterTodos(filtro);
            Assert.Single(notasFiscaisObtidas);
            Assert.Equivalent(notasFiscais[1], notasFiscaisObtidas[0]);
        }


        private List<NotaFiscal> ObterNotasFiscaisParaFiltros()
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
