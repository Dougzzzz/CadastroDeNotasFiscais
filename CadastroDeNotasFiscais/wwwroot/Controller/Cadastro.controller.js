sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "../Repositorios/RepositorioNotasFiscais",
    "sap/m/MessageBox",
    "../Services/Validacao",
    "sap/ui/core/library"
], (BaseController, Formatter, RepositorioNotasFiscais, MessageBox, Validacao, library) => {
    "use strict";

    const CAMINHO_ROTA_CADASTRO = "cadastroNotas.controller.Cadastro";
    const PARAMETRO_VALUE = "value";

    return BaseController.extend(CAMINHO_ROTA_CADASTRO, {
        formatter: Formatter,

        onInit() {
            const rotaCadastro = "cadastro";

            // Validacao.definirRecursosi18n(this.obterRecursosI18n());
            this.vincularRota(rotaCadastro, this._aoCoincidirRotaCadastro);
        },

        _aoCoincidirRotaCadastro() {
            this.exibirEspera(() => {
                // this._definirTituloTelaCadastro();
                // this._limparValueStateInputs();
                // this._definirValorPadraoRadioButton();
                // this._definirModeloPadraoCadastro();
            });
        },


        _navegarParaTelaListagem() {
            const rotaListagem = "listagem";
            this.navegarPara(rotaListagem);
        },

        _navegarParaDetalhesReserva(id) {
            const rotaDetalhes = "detalhes";
            this.navegarPara(rotaDetalhes, id);
        },

        aoClicarNavegarParaTelaAnterior() {
            this.exibirEspera(() => {
                const idReserva = this._modeloReserva().id;

                idReserva
                    ? this._navegarParaDetalhesReserva(idReserva)
                    : this._navegarParaTelaListagem();
            });
        },

        aoClicarSalvarReserva() {
            this.exibirEspera(() => {
                const reservaPreenchida = this._obterReservaPreenchida();
                Validacao.validarReserva(reservaPreenchida);

                const listaErrosValidacao = Validacao.obterListaErros();
                const mensagensErroValidacao = Formatter.formataListaErros(listaErrosValidacao);
                this._definirValueStateInputsSemAlteracao(listaErrosValidacao);

                mensagensErroValidacao
                    ? MessageBox.warning(mensagensErroValidacao)
                    : reservaPreenchida.id
                        ? this._atualizarReserva(reservaPreenchida)
                        : this._criarReserva(reservaPreenchida);
            });
        },

        aoClicarCancelarCadastro() {
            this.exibirEspera(() => {
                const confirmacaoCancelar = "confirmacaoCancelar";
                const mensagemConfirmacao = this.obterRecursosI18n().getText(confirmacaoCancelar);

                this.messageBoxConfirmacao(mensagemConfirmacao, () => this._navegarParaTelaListagem());
            });
        },

        aoMudarValidarNome(evento) {
            this.exibirEspera(() => {
                const inputNome = evento.getSource();
                const valorNome = evento.getParameter(PARAMETRO_VALUE);
                const mensagemErroValidacao = Validacao.validarNome(valorNome);

                this._definirValueStateInputValidado(inputNome, mensagemErroValidacao);
            })
        },

        aoMudarValidarCpf(evento) {
            this.exibirEspera(() => {
                const inputCpf = evento.getSource();
                const valorCpf = evento.getParameter(PARAMETRO_VALUE);
                const mensagemErroValidacao = Validacao.validarCpf(valorCpf);

                this._definirValueStateInputValidado(inputCpf, mensagemErroValidacao);
            })
        },

    })
})