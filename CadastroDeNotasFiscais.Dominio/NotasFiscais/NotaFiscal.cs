using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;

namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class NotaFiscal
    {
        public string Id { get; set; }
        public string Numero { get; set; }
        public DateTime DataEmissao { get; set; }
        public string Valor { get; set; }
        public Fornecedor Fornecedor { get; set; }
        public Cliente Cliente { get; set; }
    }
}
