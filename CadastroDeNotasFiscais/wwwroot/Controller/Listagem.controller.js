sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "../Repositorios/RepositorioNotasFiscais",
    "sap/m/MessageBox",
    'sap/f/library'
], (BaseController, Formatter, RepositorioNotasFiscais, MessageBox,library) => {
    "use strict";

    const CAMINHO_ROTA_LISTAGEM = "cadastroNotas.controller.Listagem";
    const MODELO_LISTA = "listaNotasFiscais";

    return BaseController.extend(CAMINHO_ROTA_LISTAGEM, {
        formatter: Formatter,

        onInit() {
            const rotaListagem = "listagem";
            this.vincularRota(rotaListagem, this._aoCoincidirRota);
        },

        _aoCoincidirRota() {
            this.exibirEspera(() => this._modeloListaNotas());
        },

        _modeloListaNotas(filtro) {
            try {
                return RepositorioNotasFiscais.obterTodos(filtro)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(response);
                    })
                    .then(notas => this.modelo(MODELO_LISTA, notas))
                    .catch(async erro => MessageBox.warning(await erro.text()))
            }
            catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        aoSelecionarItemNaLista: function (evento) {            
            this.exibirEspera(() => {
                let notaFiscalSelecionada = evento.getSource().getBindingContext(MODELO_LISTA).getObject();
                this.modelo("notaFiscalSelecionada", notaFiscalSelecionada);
                this.byId("flexibleColumnLayoutNotasFiscais").setLayout(sap.f.LayoutType.TwoColumnsBeginExpanded);
            });
            
        },

        aoPesquisarFiltrarNotas(filtro) {
            this.exibirEspera(() => {
                const parametroQuery = "query";
                const stringFiltro = filtro.getParameter(parametroQuery);

                this._modeloListaNotas(stringFiltro);
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
                const idNotaFiscal = evento
                    .getSource()
                    .getBindingContext(MODELO_LISTA)
                    .getProperty(propriedadeId);

                const rotaDetalhes = "detalhes";
                this.navegarPara(rotaDetalhes, idNotaFiscal);
            });
        }
    });
});