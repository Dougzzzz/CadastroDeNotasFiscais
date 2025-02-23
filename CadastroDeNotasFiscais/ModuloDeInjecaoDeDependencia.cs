using CadastroDeNotasFiscais.Dominio.Fornecedores;
using CadastroDeNotasFiscais.Dominio.Interfaces;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using FluentValidation;

namespace CadastroDeNotasFiscais
{
    public static class ModuloDeInjecaoDeDependencia
    {
        public static void AdicionarServicos(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<NotasFiscaisConfiguracoesDoBanco>(
                configuration.GetSection("NotasFiscaisDatabase"));

            services.AddSingleton<RepositorioNotasFiscais>();

            services.AddScoped<IValidator<Fornecedor>, ValidadorDosFornecedores>();
            services.AddScoped<IValidator<NotaFiscal>, ValidadorNotasFiscais>();

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

        }
    }
}
