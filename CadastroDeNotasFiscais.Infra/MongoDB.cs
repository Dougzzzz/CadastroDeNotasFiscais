using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using CadastroDeNotasFiscais.Dominio.NotasFiscais;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Infra
{
    public class MongoDB
    {
        public IMongoDatabase database;
        public MongoDB(IConfiguration configuracao)
        {
            try
            {
                var client = new MongoClient(configuracao["ConectionString"]);
                database = client.GetDatabase(configuracao["NomeDoBanco"]);
                MapClasses();
            }
            catch (Exception ex)
            {
                throw new MongoException("Não foi possível conectar ao banco de dados", ex);
            }
        }

        private void MapClasses()
        {
            if (!BsonClassMap.IsClassMapRegistered(typeof(NotaFiscal)))
            {
                BsonClassMap.RegisterClassMap<NotaFiscal>(map =>
                {
                    map.AutoMap();
                    map.MapIdMember(x => x.Id);
                    map.SetIgnoreExtraElements(true);
                });
            }

            if (!BsonClassMap.IsClassMapRegistered(typeof(Cliente)))
            {
                BsonClassMap.RegisterClassMap<Cliente>(map =>
                {
                    map.AutoMap();
                    map.SetIgnoreExtraElements(true);
                });
            }

            if (!BsonClassMap.IsClassMapRegistered(typeof(Fornecedor)))
            {
                BsonClassMap.RegisterClassMap<Fornecedor>(map =>
                {
                    map.AutoMap();
                    map.SetIgnoreExtraElements(true);
                });
            }
        }
    }
}
