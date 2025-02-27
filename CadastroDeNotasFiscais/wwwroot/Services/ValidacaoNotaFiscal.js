sap.ui.define([
], () => {
    "use strict";

    return {
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