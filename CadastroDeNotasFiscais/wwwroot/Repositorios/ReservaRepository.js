sap.ui.define([], () => {
    "use strict";

    const ENDPOINT_RESERVA = '/api/Reserva';

    return {
        obterTodos(filtro) {
            let query = ENDPOINT_RESERVA;
            if (filtro) {
                query += `?filtro=${filtro}`
            }

            return fetch(query);
        },

        obterPorId(id) {
            return fetch(`${ENDPOINT_RESERVA}/${id}`);
        },

        criarReserva(reservaParaCriar) {
            let configuracoesRequisicao = {
                method: "POST",
                body: JSON.stringify(reservaParaCriar),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };

            return fetch(ENDPOINT_RESERVA, configuracoesRequisicao);
        },

        atualizarReserva(reservaParaAtualizar) {
            let configuracoesRequisicao = {
                method: "PUT",
                body: JSON.stringify(reservaParaAtualizar),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            };

            return fetch(`${ENDPOINT_RESERVA}/${reservaParaAtualizar.id}`, configuracoesRequisicao);
        },

        removerReserva(idReserva) {
            let opcoes = {
                method: "DELETE",
            };

            return fetch(`${ENDPOINT_RESERVA}/${idReserva}`, opcoes);
        }
    }
})