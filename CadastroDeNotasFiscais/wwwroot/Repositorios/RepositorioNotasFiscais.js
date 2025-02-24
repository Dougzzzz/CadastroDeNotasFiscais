sap.ui.define([], () => {
    "use strict";

    const ENDPOINT_NOTAS_FISCAIS = '/api/NotasFiscais';

    return {
        obterTodos(filtro) {
            let query = ENDPOINT_NOTAS_FISCAIS;
            if (filtro) {
                query += `?filtro=${filtro}`
            }

            return fetch(query);
        },

        obterPorId(id) {
            return fetch(`${ENDPOINT_NOTAS_FISCAIS}/${id}`);
        },

        adicionarNotaFiscal(notaParaCadastro) {
            let configuracoesRequisicao = {
                method: "POST",
                body: JSON.stringify(notaParaCadastro),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };

            return fetch(ENDPOINT_NOTAS_FISCAIS, configuracoesRequisicao);
        },
    }
})