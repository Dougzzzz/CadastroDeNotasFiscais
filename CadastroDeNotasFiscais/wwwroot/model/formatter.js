sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    return {
        formatadorDeCpfOuCnpj: function (valor) {
            const regexCNPJ = "(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})";
            const replaceCnpj = "$1.$2.$3/$4-$5";
            const regexCPF = "(\\d{3})(\\d{3})(\\d{3})(\\d{2})";
            const replaceCpf = "$1.$2.$3-$4";
            valor = (valor || "").replace(/[^0-9]/g, "");

            if (valor.length === 11) {
                const regex = new RegExp(regexCPF);
                return valor.replace(regex, replaceCpf);
            }

            if (valor.length === 14) {
                const regex = new RegExp(regexCNPJ);
                return valor.replace(regex, replaceCnpj);
            }

            return valor;
        },

        formatarValor(valor){
			const oFormat = NumberFormat.getCurrencyInstance({
				"currencyCode": false,
				"customCurrencies": {
					"BRL": {
						"isoCode": "BRL",
						"decimals": 2
					}
				}
			});
			return oFormat.format(valor, "BRL")
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