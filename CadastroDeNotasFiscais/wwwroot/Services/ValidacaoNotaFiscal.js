sap.ui.define([
], () => {
    "use strict";

    return {

        /**
         * Valida campos obrigatórios em um modelo, exibindo mensagens de erro nos inputs correspondentes.
         * @param {sap.ui.model.Model} modelo - O modelo que contém os dados a serem validados.
         * @param {Array<{caminho: string, input: sap.m.Input, mensagemI18n: string}>} caminhos - Uma lista de objetos que definem os campos a serem validados.
         *   Cada objeto deve conter:
         *   - `caminho`: O caminho da propriedade no modelo.
         *   - `input`: O controle de input associado ao campo.
         *   - `mensagemI18n`: A chave da mensagem de erro no recurso de internacionalização (i18n).
         * @param {sap.ui.model.resource.ResourceModel} recursosI18n - O recurso de internacionalização (i18n) para obter as mensagens de erro.
         * @returns {Array<string>} Uma lista de mensagens de erro para os campos que falharam na validação. Se todos os campos forem válidos, retorna um array vazio.
         */
        validarCamposObrigatorios: function (modelo, caminhos, recursosI18n) {
            const erros = caminhos.map(campo => {
                const valor = modelo.getProperty(campo.caminho);
                const input = campo.input;

                if (!valor || valor.trim() === "") {
                    const mensagemErro = recursosI18n.getText(campo.mensagemI18n);
                    input.setValueState("Error");
                    input.setValueStateText(mensagemErro);
                    return mensagemErro;
                } else {
                    input.setValueState("None");
                    return null;
                }
            }).filter(mensagem => mensagem !== null);

            return erros;
        }
    };
})