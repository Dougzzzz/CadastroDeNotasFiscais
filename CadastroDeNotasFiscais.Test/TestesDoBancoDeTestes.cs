using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Test
{
    public class TestesDoBancoDeTestes : TesteBase
    {
        protected readonly IMongoDatabase _database;
        public TestesDoBancoDeTestes() : base()
        {
            _database = ObterServico<IMongoDatabase>();
        }

        [Fact]
        public void DeveInserirNotaFiscal()
        {
            var notaFiscal = new NotaFiscal
            {
                Id = "teste1",
                Numero = "123",
                Valor = "1000"
            };
            
            var colecao = _database.GetCollection<NotaFiscal>("notasFiscais");
            colecao.InsertOne(notaFiscal);
            var notafiscalInserida = colecao.Find(x => x.Id == notaFiscal.Id).FirstOrDefault();

            Assert.NotNull(notafiscalInserida);
            Assert.Equal(notaFiscal.Id, notafiscalInserida.Id);
            Assert.Equal(notaFiscal.Numero, notafiscalInserida.Numero);
            Assert.Equal(notaFiscal.Valor, notafiscalInserida.Valor);
        }
    }
}
