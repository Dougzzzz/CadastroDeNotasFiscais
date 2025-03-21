﻿using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class NotaFiscal
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; init; }
        public int? Numero { get; set; }
        public string? DataEmissao { get; set; }
        public decimal Valor { get; set; }
        public Fornecedor Fornecedor { get; set; } = null!;
        public Cliente Cliente { get; set; } = null!;
    }
}
