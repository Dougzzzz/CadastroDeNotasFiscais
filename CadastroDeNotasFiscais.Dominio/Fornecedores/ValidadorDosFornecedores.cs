using FluentValidation;

namespace CadastroDeNotasFiscais.Dominio.Fornecedores
{
    public class ValidadorDosFornecedores : AbstractValidator<Fornecedor>
    {
        public ValidadorDosFornecedores()
        {
            RuleFor(fornecedor => fornecedor.Nome)
                .NotEmpty()
                .WithMessage("O nome do fornecedor é obrigatório.");
            RuleFor(fornecedor => fornecedor.Inscricao)
                .NotEmpty()
                .WithMessage("A inscrição do fornecedor é obrigatória.");
        }
    }
}
