﻿using CadastroDeNotasFiscais.Dominio.Fornecedores;
using CadastroDeNotasFiscais.Dominio.Interfaces;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using CadastroDeNotasFiscais.Infra.Repositorios;
using CadastroDeNotasFiscais.Serviços;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace CadastroDeNotasFiscais
{
    public static class ModuloDeInjecaoDeDependencia
    {
        public static void AdicionarServicos(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<NotasFiscaisConfiguracoesDoBanco>(configuration.GetSection("NotasFiscaisDatabase"));
            services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<NotasFiscaisConfiguracoesDoBanco>>().Value);

            services.AddScoped<RepositorioNotasFiscais>();
            services.AddScoped<ServicoDasNotasFiscais>();
            services.AddScoped<IValidator<Fornecedor>, ValidadorDosFornecedores>();
            services.AddScoped<IValidator<NotaFiscal>, ValidadorNotasFiscais>();

            services.AddControllers()
                        .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }
    }
}
