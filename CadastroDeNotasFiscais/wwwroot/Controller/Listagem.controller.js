sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "sap/m/MessageBox"
], (BaseController, Formatter,  MessageBox) => {
    "use strict";

    const CAMINHO_ROTA_LISTAGEM = "cadastroDeNotasFiscais.controller.Listagem";
    const MODELO_LISTA = "TabelaReservas";

    return BaseController.extend(CAMINHO_ROTA_LISTAGEM, {
        formatter: Formatter,

        onInit() {
            const rotaListagem = "listagem";
            this.vincularRota(rotaListagem, this._aoCoincidirRota);
        },

        _aoCoincidirRota() {
            this.exibirEspera(() => this._modeloListaReservas());
        },

        _modeloListaReservas(filtro) {

        },

        aoPesquisarFiltrarReservas(filtro) {
            this.exibirEspera(() => {
                const parametroQuery = "query";
                const stringFiltro = filtro.getParameter(parametroQuery);

                this._modeloListaReservas(stringFiltro);
            });
        },

        aoClicarAbrirCadastro() {
            this.exibirEspera(() => {
                const rotaCadastro = "cadastro";
                this.navegarPara(rotaCadastro);
            });
        },

        aoClicarAbrirDetalhes(evento) {
            this.exibirEspera(() => {
                const propriedadeId = "id";
                const idReserva = evento
                    .getSource()
                    .getBindingContext(MODELO_LISTA)
                    .getProperty(propriedadeId);

                const rotaDetalhes = "detalhes";
                this.navegarPara(rotaDetalhes, idReserva);
            });
        }
    });
});