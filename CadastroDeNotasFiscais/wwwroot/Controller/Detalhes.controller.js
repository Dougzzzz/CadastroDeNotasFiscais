sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "../Repositorios/ReservaRepository",
    "sap/m/MessageBox"
], (BaseController, Formatter, ReservaRepository, MessageBox) => {
    "use strict";

    const CAMINHO_ROTA_DETALHES = "cadastroNotas.controller.Detalhes";

    return BaseController.extend(CAMINHO_ROTA_DETALHES, {
        formatter: Formatter,

        onInit() {
            const rotaDetalhes = "detalhes";
            this.vincularRota(rotaDetalhes, this._aoCoincidirRota);
        },

        _aoCoincidirRota(evento) {
            this.exibirEspera(() => this._definirReservaPeloId(this._obterIdPeloParametro(evento)));
        },

        _modeloReserva(modelo) {
            const nomeModelo = "reserva";
            return this.modelo(nomeModelo, modelo);
        },

        _obterIdPeloParametro(evento) {
            const parametroArguments = "arguments";
            return evento.getParameter(parametroArguments).id;
        },

        _definirReservaPeloId(id) {
            try {
                return ReservaRepository.obterPorId(id)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(response);
                    })
                    .then(reserva => this._modeloReserva(reserva))
                    .catch(async erro => MessageBox.warning(await erro.text()));
            }
            catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        _removerReserva() {
            try {
                const idReserva = this._modeloReserva().id;
                const sucessoRemover = "sucessoRemover";
                const mensagemSucesso = this.obterRecursosI18n().getText(sucessoRemover);

                return ReservaRepository.removerReserva(idReserva)
                    .then(() => this.messageBoxSucesso(mensagemSucesso, () => {
                        this._navegarParaTelaListagem();
                    }))
                    .catch(async erro => MessageBox.warning(await erro.text()));
            } catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        _navegarParaTelaListagem() {
            const rotaListagem = "listagem";
            this.navegarPara(rotaListagem);
        },

        aoClicarNavegarParaTelaListagem() {
            this.exibirEspera(() => {
                this._navegarParaTelaListagem();
            });
        },

        aoClicarNavegarParaTelaEdicao() {
            this.exibirEspera(() => {
                const rotaEdicao = "edicao";
                const idReserva = this._modeloReserva().id;

                this.navegarPara(rotaEdicao, idReserva);
            });
        },

        aoClicarRemoverReserva() {
            this.exibirEspera(() => {
                const confirmacaoRemocao = "confirmacaoRemocao";
                const mensagemConfirmacao = this.obterRecursosI18n().getText(confirmacaoRemocao);

                this.messageBoxConfirmacao(mensagemConfirmacao, () => {
                    this._removerReserva();
                });
            });
        }
    })
})