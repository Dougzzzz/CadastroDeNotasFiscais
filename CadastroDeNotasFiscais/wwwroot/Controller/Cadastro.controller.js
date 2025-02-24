sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "../Repositorios/ReservaRepository",
    "sap/m/MessageBox",
    "../Services/Validacao",
    "sap/ui/core/ValueState"
], (BaseController, Formatter, ReservaRepository, MessageBox, Validacao, ValueState) => {
    "use strict";

    const CAMINHO_ROTA_CADASTRO = "cadastroNotas.controller.Cadastro";
    const PARAMETRO_VALUE = "value";

    const ID_INPUTS = {
        idInputNome: "inputNome",
        idInputCpf: "inputCpf",
        idInputTelefone: "inputTelefone",
        idInputIdade: "inputIdade",
        idInputCheckIn: "inputCheckIn",
        idInputCheckOut: "inputCheckOut",
        idInputPrecoEstadia: "inputPrecoEstadia"
    };

    return BaseController.extend(CAMINHO_ROTA_CADASTRO, {
        formatter: Formatter,

        onInit() {
            const rotaCadastro = "cadastro";
            const rotaEdicao = "edicao";

            Validacao.definirRecursosi18n(this.obterRecursosI18n());
            this.vincularRota(rotaCadastro, this._aoCoincidirRotaCadastro);
            this.vincularRota(rotaEdicao, this._aoCoincidirRotaEdicao);
        },

        _aoCoincidirRotaCadastro() {
            this.exibirEspera(() => {
                this._definirTituloTelaCadastro();
                this._limparValueStateInputs();
                this._definirValorPadraoRadioButton();
                this._definirModeloPadraoCadastro();
            });
        },

        _aoCoincidirRotaEdicao(evento) {
            this.exibirEspera(() => {
                const idReserva = this._obterIdPeloParametro(evento);

                this._definirTituloTelaCadastro(idReserva);
                this._limparValueStateInputs();
                this._definirValorPadraoRadioButton();
                return this._definirReservaPeloId(idReserva);
            })
        },

        _modeloReserva(modelo) {
            const nomeModelo = "reserva";
            return this.modelo(nomeModelo, modelo);
        },

        _definirModeloPadraoCadastro() {
            let reserva = {
                nome: String(),
                cpf: String(),
                telefone: String(),
                idade: String(),
                sexo: String(),
                checkIn: new Date().toISOString(),
                checkOut: new Date().toISOString(),
                precoEstadia: String(),
                pagamentoEfetuado: false
            };

            this._modeloReserva(reserva);
        },

        _definirModeloPadraoEdicao(reserva) {
            reserva.precoEstadia = Formatter.formataPrecoEstadia(reserva.precoEstadia);
            this._modeloReserva(reserva);
        },

        _definirTituloTelaCadastro(idReserva) {
            const idTituloTelaCadastro = "tituloTelaCadastro";
            const tituloTelaCadastro = this.byId(idTituloTelaCadastro);

            const tituloCadastro = "tituloCadastro";
            const tituloEdicao = "tituloEdicao";

            const textoTituloCadastro = this.obterRecursosI18n().getText(tituloCadastro);
            const textoTituloEdicao = this.obterRecursosI18n().getText(tituloEdicao);

            idReserva
                ? tituloTelaCadastro.setTitle(textoTituloEdicao)
                : tituloTelaCadastro.setTitle(textoTituloCadastro)
        },

        _definirValorPadraoRadioButton() {
            const idRadioButtonPagamentoNaoEfetuado = "radioButtonPagamentoNaoEfetuado";
            this.byId(idRadioButtonPagamentoNaoEfetuado).setSelected(true);
        },

        _definirValueStateInputValidado(input, valueStateText) {
            valueStateText
                ? input.setValueState(ValueState.Error).setValueStateText(valueStateText)
                : input.setValueState(ValueState.Success);
        },

        _definirValueStateInputsSemAlteracao(listaErrosValidacao) {
            Object.values(ID_INPUTS).forEach((idInput, index) => {
                let input = this.byId(idInput);

                if (input.getValueState() == ValueState.None) {
                    this._definirValueStateInputValidado(input, listaErrosValidacao[index]);
                }
            })
        },

        _limparValueStateInputs() {
            Object
                .values(ID_INPUTS)
                .forEach(idInput => this.byId(idInput).setValueState(ValueState.None));
        },

        _obterIdPeloParametro(evento) {
            const parametroArguments = "arguments";
            return evento.getParameter(parametroArguments).id;
        },

        _obterReservaPreenchida() {
            let reserva = structuredClone(this._modeloReserva());

            reserva.idade = Number(reserva.idade);
            reserva.sexo = Number(reserva.sexo);
            reserva.precoEstadia = Number(Formatter.desformataPrecoEstadia(reserva.precoEstadia));

            return reserva;
        },

        _definirReservaPeloId(id) {
            try {
                return ReservaRepository.obterPorId(id)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(response);
                    })
                    .then(reserva => this._definirModeloPadraoEdicao(reserva))
                    .catch(async erro => MessageBox.warning(await erro.text()));
            }
            catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        _criarReserva(reservaParaCriar) {
            try {
                const sucessoCriar = "sucessoCriar";
                const mensagemSucessoCriar = this.obterRecursosI18n().getText(sucessoCriar);

                return ReservaRepository.criarReserva(reservaParaCriar)
                    .then(response => {
                        const statusCreated = 201;
                        return response.status == statusCreated
                            ? response.json()
                            : Promise.reject(response)
                    })
                    .then(reservaCriada => this.messageBoxSucesso(mensagemSucessoCriar, () => {
                        this._navegarParaDetalhesReserva(reservaCriada.id);
                    }))
                    .catch(async erro => MessageBox.warning(await erro.text()));
            }
            catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        _atualizarReserva(reservaParaAtualizar) {
            try {
                const sucessoEditar = "sucessoEditar";
                const mensagemSucessoEditar = this.obterRecursosI18n().getText(sucessoEditar);

                return ReservaRepository.atualizarReserva(reservaParaAtualizar)
                    .then(response => {
                        const statusNoContent = 204;
                        return response.status == statusNoContent
                            ? this.messageBoxSucesso(mensagemSucessoEditar, () => {
                                this._navegarParaDetalhesReserva(reservaParaAtualizar.id);
                            })
                            : Promise.reject(response)
                    })
                    .catch(async erro => MessageBox.warning(await erro.text()));
            }
            catch (erro) {
                MessageBox.warning(erro.message);
            }
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
                const idReserva = this._modeloReserva().id;

                this.messageBoxConfirmacao(mensagemConfirmacao, () => {
                    idReserva
                        ? this._navegarParaDetalhesReserva(idReserva)
                        : this._navegarParaTelaListagem();
                });
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

        aoMudarValidarTelefone(evento) {
            this.exibirEspera(() => {
                const inputTelefone = evento.getSource();
                const valorTelefone = evento.getParameter(PARAMETRO_VALUE);
                const mensagemErroValidacao = Validacao.validarTelefone(valorTelefone);

                this._definirValueStateInputValidado(inputTelefone, mensagemErroValidacao);
            });
        },

        aoMudarValidarIdade(evento) {
            this.exibirEspera(() => {
                const inputIdade = evento.getSource();
                const valorIdade = evento.getParameter(PARAMETRO_VALUE);
                const mensagemErroValidacao = Validacao.validarIdade(valorIdade);

                this._definirValueStateInputValidado(inputIdade, mensagemErroValidacao);
            });
        },

        aoMudarValidarCheckInECheckOut() {
            this.exibirEspera(() => {
                const idReserva = this._modeloReserva().id;

                const inputCheckIn = this.byId(ID_INPUTS.idInputCheckIn);
                const inputCheckOut = this.byId(ID_INPUTS.idInputCheckOut);

                const valorCheckOut = inputCheckOut.getValue();
                const valorCheckIn = inputCheckIn.getValue();

                let mensagemErroValidacaoCheckIn, mensagemErroValidacaoCheckOut;

                if (idReserva) {
                    mensagemErroValidacaoCheckIn = Validacao.validarCheckIn(valorCheckIn);
                    mensagemErroValidacaoCheckOut = Validacao.validarCheckOut(valorCheckOut, valorCheckIn);
                }
                else {
                    mensagemErroValidacaoCheckIn = Validacao.validarCheckInCadastro(valorCheckIn);
                    mensagemErroValidacaoCheckOut = Validacao.validarCheckOutCadastro(valorCheckOut, valorCheckIn);
                }

                this._definirValueStateInputValidado(inputCheckIn, mensagemErroValidacaoCheckIn);
                this._definirValueStateInputValidado(inputCheckOut, mensagemErroValidacaoCheckOut);
            });
        },

        aoMudarValidarPrecoEstadia(evento) {
            this.exibirEspera(() => {
                const inputPrecoEstadia = evento.getSource();
                const valorPrecoEstadia = evento.getParameter(PARAMETRO_VALUE);
                const mensagemErroValidacao = Validacao.validarPrecoEstadia(valorPrecoEstadia);

                this._definirValueStateInputValidado(inputPrecoEstadia, mensagemErroValidacao);

                if (!mensagemErroValidacao) inputPrecoEstadia.setValue(Formatter.formataPrecoEstadia(valorPrecoEstadia));
            });
        }
    })
})