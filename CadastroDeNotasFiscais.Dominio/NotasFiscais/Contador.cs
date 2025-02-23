using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class Contador
    {
        public string? Id { get; set; }
        public int Sequencia { get; set; }
    }
}
