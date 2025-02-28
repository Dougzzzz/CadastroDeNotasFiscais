sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/BusyIndicator"
], (Controller, JSONModel, MessageBox, BusyIndicator) => {
    "use strict";

    const CAMINHO_ROTA_BASE_CONTROLLER = "cadastroNotas.controller.BaseController";

    return Controller.extend(CAMINHO_ROTA_BASE_CONTROLLER, {

        /**
         * Define ou obtém um modelo JSON para a view.
         * @param {string} nome - O nome do modelo.
         * @param {object} [modelo] - Os dados do modelo a serem definidos. Se não fornecido, o método retorna os dados do modelo existente.
         * @returns {object|undefined} Os dados do modelo se o parâmetro `modelo` não for fornecido; caso contrário, undefined.
         */
        modelo(nome, modelo) {
            return modelo
                ? this.getView().setModel(new JSONModel(modelo), nome)
                : this.getView().getModel(nome)?.getData();
        },

        /**
         * Obtém o recurso de internacionalização (i18n) para traduções.
         * @returns {sap.ui.model.resource.ResourceModel} O recurso de internacionalização.
         */
        obterRecursosI18n() {
            const modeloi18n = "i18n";

            return this
                .getOwnerComponent()
                .getModel(modeloi18n)
                .getResourceBundle();
        },

        /**
         * Vincula uma rota a um método de callback que será executado quando a rota for correspondida.
         * @param {string} nomeDaRota - O nome da rota.
         * @param {function} aoCoincidirRota - A função de callback a ser executada quando a rota for correspondida.
         * @returns {void}
         */
        vincularRota(nomeDaRota, aoCoincidirRota) {
            return this
                .getOwnerComponent()
                .getRouter()
                .getRoute(nomeDaRota)
                .attachPatternMatched(aoCoincidirRota, this);
        },

        /**
         * Exibe uma caixa de diálogo de confirmação com opções "Sim" e "Não".
         * @param {string} mensagem - A mensagem a ser exibida na caixa de diálogo.
         * @param {function} metodo - A função a ser executada se o usuário escolher "Sim".
         * @returns {void}
         */
        messageBoxConfirmacao(mensagem, metodo) {
            MessageBox.confirm(mensagem, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: (acao) => {
                    if (acao == MessageBox.Action.YES) metodo();
                }
            });
        },

        /**
         * Exibe uma caixa de diálogo de sucesso com uma mensagem e executa um método após o fechamento.
         * @param {string} mensagem - A mensagem de sucesso a ser exibida.
         * @param {function} metodo - A função a ser executada após o fechamento da caixa de diálogo.
         * @returns {void}
         */
        messageBoxSucesso(mensagem, metodo) {
            MessageBox.success(mensagem, {
                onClose: () => {
                    metodo();
                }
            });
        },

        /**
         * Navega para uma rota específica com um parâmetro de ID.
         * @param {string} nomeDaRota - O nome da rota para a qual navegar.
         * @param {string} parametroId - O parâmetro de ID a ser passado para a rota.
         * @returns {void}
         */
        navegarPara(nomeDaRota, parametroId) {
            return this
                .getOwnerComponent()
                .getRouter()
                .navTo(nomeDaRota, { id: parametroId });
        },

        /**
         * Exibe um indicador de carregamento (BusyIndicator) enquanto executa uma ação assíncrona.
         * @param {function} acao - A função assíncrona a ser executada.
         * @returns {void}
         */
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