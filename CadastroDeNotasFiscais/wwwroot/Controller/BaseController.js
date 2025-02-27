sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator"
], (Controller, JSONModel, MessageBox, BusyIndicator) => {
    "use strict";

    const CAMINHO_ROTA_BASE_CONTROLLER = "cadastroNotas.controller.BaseController";

    return Controller.extend(CAMINHO_ROTA_BASE_CONTROLLER, {
        modelo(nome, modelo) {
            return modelo
                ? this.getView().setModel(new JSONModel(modelo), nome)
                : this.getView().getModel(nome)?.getData();
        },

        obterRecursosI18n() {
            const modeloi18n = "i18n";

            return this
                .getOwnerComponent()
                .getModel(modeloi18n)
                .getResourceBundle();
        },

        vincularRota(nomeDaRota, aoCoincidirRota) {
            return this
                .getOwnerComponent()
                .getRouter()
                .getRoute(nomeDaRota)
                .attachPatternMatched(aoCoincidirRota, this);
        },

        messageBoxConfirmacao(mensagem, metodo) {
            MessageBox.confirm(mensagem, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: (acao) => {
                    if (acao == MessageBox.Action.YES) metodo();
                }
            });
        },

        messageBoxSucesso(mensagem, metodo) {
            MessageBox.success(mensagem, {
                onClose: () => {
                    metodo();
                }
            });
        },

        navegarPara(nomeDaRota, parametroId) {
            return this
                .getOwnerComponent()
                .getRouter()
                .navTo(nomeDaRota, { id: parametroId });
        },

        exibirEspera(acao) {
            try {
                const delayBusyIndicator = 0;
                BusyIndicator.show(delayBusyIndicator);

                const promiseAcao = new Promise((resolve) => {
                    resolve(acao());
                });

                promiseAcao
                    .catch(erro => {
                        BusyIndicator.hide();
                        MessageBox.warning(erro.message);
                    })
                    .finally(() => BusyIndicator.hide())

            } catch (erro) {
                MessageBox.warning(erro.message);
            }
        }
    });
});