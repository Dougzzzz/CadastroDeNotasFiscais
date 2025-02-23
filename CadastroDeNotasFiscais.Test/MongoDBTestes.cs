using Mongo2Go;
using MongoDB.Driver;

namespace CadastroDeNotasFiscais.Test
{
    public class MongoDBTestes : IDisposable
    {
        public MongoDbRunner Runner { get; private set; }
        public IMongoDatabase Database { get; private set; }
        public MongoDBTestes()
        {
            Runner = MongoDbRunner.Start();

            var client = new MongoClient(Runner.ConnectionString);
            Database = client.GetDatabase("BaseDeTestes");
        }
        public void Dispose()
        {
            Runner.Dispose();
        }
    }
}
