sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    const MODEL_I18N = "i18n";

    return {
        formataSexo(sexo) {
            const textoSexoMasculino = "sexo0";
            const textoSexoFeminino = "sexo1";
            const resourceBundle = this.getOwnerComponent().getModel(MODEL_I18N).getResourceBundle();

            return resourceBundle.getText(sexo ? textoSexoFeminino : textoSexoMasculino)
        },

        formataPrecoEstadia(precoEstadia) {
            const charVirgula = ",";
            const charPonto = ".";
            const regexPontos = /\./g;
            const stringVazia = "";

            return NumberFormat
                .getCurrencyInstance({ currencyCode: false })
                .format(parseFloat(String(precoEstadia)
                    .replace(regexPontos, stringVazia)
                    .replace(charVirgula, charPonto)));
        },

        desformataPrecoEstadia(precoEstadia) {
            const regexPontos = /\./g;
            const regexVirgulas = /,/;
            const charPonto = ".";

            return String(precoEstadia)
                .replace(regexPontos, String())
                .replace(regexVirgulas, charPonto);
        },

        formataPagamentoEfetuado(pagamentoEfetuado) {
            const textoPagamentoFoiEfetuado = "pagamentoEfetuadoTrue";
            const textoPagamentoNaoFoiEfetuado = "pagamentoEfetuadoFalse";
            const recursosI18n = this.getOwnerComponent().getModel(MODEL_I18N).getResourceBundle();

            return recursosI18n.getText(pagamentoEfetuado ? textoPagamentoFoiEfetuado : textoPagamentoNaoFoiEfetuado);
        },

        formataData(data) {
            const formatoData = "yyyy-MM-dd";
            return DateFormat.getDateInstance({ pattern: formatoData }).format(new Date(data));
        },

        formataListaErros(listaErros) {
            const separador = "\n";
            return listaErros.filter(mensagemErro => mensagemErro != undefined).join(separador);
        }
    }
});