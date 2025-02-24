namespace CadastroDeNotasFiscais.Dominio.Interfaces
{
    public class NotasFiscaisConfiguracoesDoBanco
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;
    }
}

