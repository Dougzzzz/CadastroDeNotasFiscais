namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public record FiltroDasNotasFiscais(string? NomeDoCliente, string? NomeDoFornecedor, string? DataEmissao, int? NumeroDaNota);
}
