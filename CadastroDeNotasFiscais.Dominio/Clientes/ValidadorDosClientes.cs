using FluentValidation;

namespace CadastroDeNotasFiscais.Dominio.Clientes
{
    public class ValidadorDosClientes : AbstractValidator<Cliente>
    {
        public ValidadorDosClientes()
        {
            RuleFor(cliente => cliente.Nome)
                .NotEmpty()
                .WithMessage("O nome do cliente é obrigatório.");
            RuleFor(cliente => cliente.Inscricao)
                .NotEmpty()
                .WithMessage("A inscrição do cliente é obrigatória.");
        }
    }
}
