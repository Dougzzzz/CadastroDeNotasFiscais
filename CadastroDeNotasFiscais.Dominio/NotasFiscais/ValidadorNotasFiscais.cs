﻿using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using FluentValidation;

namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class ValidadorNotasFiscais : AbstractValidator<NotaFiscal>
    {
        public ValidadorNotasFiscais()
        {
            RuleFor(notaFiscal => notaFiscal.Valor)
                .GreaterThanOrEqualTo(0)
                .WithMessage("O valor da nota fiscal é obrigatório e não pode ser menor que 0.");
            RuleFor(notaFiscal => notaFiscal.Fornecedor)
                .NotNull()
                .WithMessage("O fornecedor da nota fiscal é obrigatório.")
                .SetValidator(new ValidadorDosFornecedores());
            RuleFor(notaFiscal => notaFiscal.Cliente)
                .NotNull()
                .WithMessage("O cliente da nota fiscal é obrigatório.")
                .SetValidator(new ValidadorDosClientes());
        }
    }
}
