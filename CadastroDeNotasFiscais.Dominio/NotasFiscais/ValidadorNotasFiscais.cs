using CadastroDeNotasFiscais.Dominio.Clientes;
using CadastroDeNotasFiscais.Dominio.Fornecedores;
using FluentValidation;

namespace CadastroDeNotasFiscais.Dominio.NotasFiscais
{
    public class ValidadorNotasFiscais : AbstractValidator<NotaFiscal>
    {
        public ValidadorNotasFiscais()
        {
            RuleFor(notaFiscal => notaFiscal.Numero)
                .NotEmpty()
                .WithMessage("O número da nota fiscal é obrigatório.");
            RuleFor(notaFiscal => notaFiscal.DataEmissao)
                .NotEmpty()
                .WithMessage("A data de emissão da nota fiscal é obrigatória.");
            RuleFor(notaFiscal => notaFiscal.Valor)
                .NotEmpty()
                .LessThan(0)
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
