# Sistema de Cadastro de Notas Fiscais
Descrição do Projeto

Este projeto é um sistema de cadastro de notas fiscais desenvolvido com arquitetura Domain-Driven Design (DDD). Ele permite realizar operações básicas de leitura e salvamento de notas fiscais, oferecendo uma API robusta e escalável para gerenciar esses dados.
Tecnologias Utilizadas

    Linguagem de Programação: .NET (C#)

    Banco de Dados Principal: MongoDB

    Banco de Dados para Testes: Mongo2Go (biblioteca para testes com MongoDB em memória)
## Configuração do projeto:
no arquivo `appsettings.json` inclua essa estrutura:

```json
{
  "NotasFiscaisDatabase": {
    "ConnectionString": {cole aqui a sua connection string do mongoDB},
    "DatabaseName": "cadastroDeNotasFiscais"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```
