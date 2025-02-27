sap.ui.define([
    "./BaseController",
    "../model/Formatter",
    "../Repositorios/RepositorioNotasFiscais",
    "sap/m/MessageBox",
    "../Services/ValidacaoNotaFiscal",
    "sap/ui/core/library"
], function (BaseController, Formatter, RepositorioNotasFiscais, MessageBox, ValidacaoNotaFiscal, library) {
    "use strict";

    const CAMINHO_ROTA_CADASTRO = "cadastroNotas.controller.Cadastro";

    return BaseController.extend(CAMINHO_ROTA_CADASTRO, {
        formatter: Formatter,

        onInit() {
            const rotaCadastro = "cadastro";
            this.vincularRota(rotaCadastro, this._aoCoincidirRotaCadastro);
        },

        _aoCoincidirRotaCadastro() {
            this.exibirEspera(() => {
                this._definirModeloPadraoCadastro();
            });
        },

        _definirModeloPadraoCadastro() {
            const modeloPadrao = {
                Valor: "",
                Fornecedor: {
                    NomeFornecedor: "",
                    InscricaoFornecedor: ""
                },
                Cliente: {
                    NomeCliente: "",
                    InscricaoCliente: ""
                }
            };
            this.modelo("notaFiscal", modeloPadrao);
        },

        _obterNotaFiscalPreenchida() {
            return this.modelo("notaFiscal");
        },

        aoClicarSalvarNotaFiscal() {
            this.exibirEspera(() => {
                const notaFiscal = this._obterNotaFiscalPreenchida();
                const modelo = this.getView()?.getModel("notaFiscal");
                const recursosI18n = this.obterRecursosI18n();

                const caminhosValidacao = [
                    { caminho: "/Valor", mensagemI18n: "msgValorObrigatorio", input: this.byId("inputValor") },
                    { caminho: "/Fornecedor/Nome", mensagemI18n: "msgNomeFornecedorObrigatorio", input: this.byId("inputNomeFornecedor") },
                    { caminho: "/Fornecedor/Inscricao", mensagemI18n: "msgInscricaoFornecedorObrigatorio", input: this.byId("inputInscricaoFornecedor") },
                    { caminho: "/Cliente/Nome", mensagemI18n: "msgNomeClienteObrigatorio", input: this.byId("inputNomeCliente") },
                    { caminho: "/Cliente/Inscricao", mensagemI18n: "msgInscricaoClienteObrigatorio", input: this.byId("inputInscricaoCliente") }
                ];

                const erros = ValidacaoNotaFiscal.validarCamposObrigatorios(modelo, caminhosValidacao, recursosI18n);

                if (erros.length > 0) {
                    MessageBox.error(erros.join("\n"));
                    return; 
                }

                this._salvar(notaFiscal);
            });
        },

        aoClicarCancelarCadastro() {
            this.exibirEspera(() => {
                this._navegarParaTelaListagem();
            });
        },

        _salvar(notaFiscal) {
            try {
                RepositorioNotasFiscais.adicionarNotaFiscal(notaFiscal)
                    .then(response => {
                        return response.ok
                            ? response.json()
                            : Promise.reject(response);
                    })
                    .then(() => this._navegarParaTelaListagem())
                    .catch(async erro => MessageBox.warning(await erro.text()));
            } catch (erro) {
                MessageBox.warning(erro.message);
            }
        },

        _navegarParaTelaListagem() {
            const rotaListagem = "listagem";
            this.navegarPara(rotaListagem);
        }
    });
});