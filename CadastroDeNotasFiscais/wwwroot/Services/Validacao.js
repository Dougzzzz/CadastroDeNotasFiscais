sap.ui.define([
    "../model/Formatter"
], (Formatter) => {
    "use strict";

    const INDICE_MENSAGEM_ERRO_NOME = 0;
    const INDICE_MENSAGEM_ERRO_CPF = 1;
    const INDICE_MENSAGEM_ERRO_TELEFONE = 2;
    const INDICE_MENSAGEM_ERRO_IDADE = 3;
    const INDICE_MENSAGEM_ERRO_CHECK_IN = 4;
    const INDICE_MENSAGEM_ERRO_CHECK_OUT = 5;
    const INDICE_MENSAGEM_ERRO_PRECO_ESTADIA = 6;

    let LISTA_ERROS = [];
    let RECURSOS_I18N;

    return {
        definirRecursosi18n(recursosi18n) {
            RECURSOS_I18N = recursosi18n;
        },

        obterListaErros() {
            return LISTA_ERROS;
        },

        contemValor(propriedade) {
            return Boolean(propriedade);
        },

        validarReserva(reserva) {
            this.validarNome(reserva.nome);
            this.validarCpf(reserva.cpf);
            this.validarTelefone(reserva.telefone);
            this.validarIdade(reserva.idade);
            this.validarPrecoEstadia(reserva.precoEstadia);
        },

        validarNome(nome) {
            const nomeFormatado = nome.trim();
            const tamanhoNome = nomeFormatado.length;
            const tamanhoMinimoNome = 3;
            const tamanhoMaximoNome = 50;
            const regexNome = "^[a-zA-ZáàâãäéèêëíìïóòôõöüúùçñÁÀÂÃÄÉÈÊËÍÌÏÓÒÔÕÖÜÚÙÇÑ ]*$";

            if (!this.contemValor(nomeFormatado)) {
                const nomeNaoPreenchido = "nomeNaoPreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME] = RECURSOS_I18N.getText(nomeNaoPreenchido);
            }
            else if (tamanhoNome < tamanhoMinimoNome) {
                const nomeCurto = "nomeCurto";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME] = RECURSOS_I18N.getText(nomeCurto);
            }
            else if (tamanhoNome > tamanhoMaximoNome) {
                const nomeLongo = "nomeLongo";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME] = RECURSOS_I18N.getText(nomeLongo);
            }
            else if (!nomeFormatado.match(regexNome)) {
                const nomeFormatoIncorreto = "nomeFormatoIncorreto";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME] = RECURSOS_I18N.getText(nomeFormatoIncorreto);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_NOME];
        },

        validarCpf(cpf) {
            const arrayDigitosCpf = Array.from(cpf, Number).filter(numero => !isNaN(numero));
            const tamanhoNumerosCpf = arrayDigitosCpf.length;
            const primeiroDigitoVerificador = arrayDigitosCpf[9];
            const segundoDigitoVerificador = arrayDigitosCpf[10]
            const multiplicadoresPrimeiroDigito = [10, 9, 8, 7, 6, 5, 4, 3, 2];
            const multiplicadoresSegundoDigito = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const tamanhoCpfPreenchido = 11;

            let somaPrimeiroDigito = 0;
            let somaSegundoDigito = 0;

            for (let i = 0; i < arrayDigitosCpf.length; i++) {

                if (i < multiplicadoresPrimeiroDigito.length) {
                    somaPrimeiroDigito += arrayDigitosCpf[i] * multiplicadoresPrimeiroDigito[i];
                }

                if (i < multiplicadoresSegundoDigito.length) {
                    somaSegundoDigito += arrayDigitosCpf[i] * multiplicadoresSegundoDigito[i];
                }
            }

            const restoPrimeiroDigito = somaPrimeiroDigito % 11;
            const restoSegundoDigito = somaSegundoDigito % 11;
            const primeiroCasoInvalido = restoPrimeiroDigito < 2 && primeiroDigitoVerificador != 0;
            const segundoCasoInvalido = restoPrimeiroDigito >= 2 && primeiroDigitoVerificador != (11 - restoPrimeiroDigito);
            const terceiroCasoInvalido = restoSegundoDigito < 2 && segundoDigitoVerificador != 0;
            const quartoCasoInvalido = restoSegundoDigito >= 2 && segundoDigitoVerificador != (11 - restoSegundoDigito);

            if (!this.contemValor(cpf)) {
                const cpfNaoPreenchido = "cpfNaoPreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CPF] = RECURSOS_I18N.getText(cpfNaoPreenchido);
            }
            else if (tamanhoNumerosCpf < tamanhoCpfPreenchido) {
                const cpfParcialmentePreenchido = "cpfParcialmentePreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CPF] = RECURSOS_I18N.getText(cpfParcialmentePreenchido);
            }
            else if (primeiroCasoInvalido || segundoCasoInvalido || terceiroCasoInvalido || quartoCasoInvalido) {
                const cpfInvalido = "cpfInvalido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CPF] = RECURSOS_I18N.getText(cpfInvalido);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CPF] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_CPF];
        },

        validarTelefone(telefone) {
            const regexNumeros = "[0-9]";
            let numerosTelefone = "";

            for (let char of telefone) {
                if (char.match(regexNumeros)) numerosTelefone += char;
            }

            const tamanhoNumerosTelefone = numerosTelefone.length;
            const tamanhoTelefonePreenchido = 11;

            if (!this.contemValor(telefone)) {
                const telefoneNaoPreenchido = "telefoneNaoPreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_TELEFONE] = RECURSOS_I18N.getText(telefoneNaoPreenchido);
            }
            else if (tamanhoNumerosTelefone < tamanhoTelefonePreenchido) {
                const telefoneParcialmentePreenchido = "telefoneParcialmentePreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_TELEFONE] = RECURSOS_I18N.getText(telefoneParcialmentePreenchido);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_TELEFONE] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_TELEFONE];
        },

        validarIdade(idade) {
            const regexNumeros = "^[0-9]*$";
            const numeroIdade = Number(idade);
            const valorMinimoIdade = 18;
            const valorMaximoIdade = 200;

            if (!this.contemValor(idade)) {
                const idadeNaoPreenchida = "idadeNaoPreenchida";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE] = RECURSOS_I18N.getText(idadeNaoPreenchida);
            }
            else if (!String(idade).match(regexNumeros)) {
                const idadeFormatoInvalido = "idadeFormatoInvalido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE] = RECURSOS_I18N.getText(idadeFormatoInvalido);
            }
            else if (numeroIdade < valorMinimoIdade) {
                const menorDeIdade = "menorDeIdade";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE] = RECURSOS_I18N.getText(menorDeIdade);
            }
            else if (numeroIdade >= valorMaximoIdade) {
                const idadeAcimaValorMaximo = "idadeAcimaValorMaximo";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE] = RECURSOS_I18N.getText(idadeAcimaValorMaximo);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_IDADE];
        },

        validarDataCadastro(data) {
            const anoAtual = new Date().getFullYear();
            const mesAtual = new Date().getMonth() + 1;
            const diaAtual = new Date().getDate();

            const separador = "-";
            const [ano, mes, dia] = data.split(separador);

            const primeiroCasoInvalido = ano < anoAtual;
            const segundoCasoInvalido = (ano == anoAtual) && (mes < mesAtual);
            const terceiroCasoInvalido = (ano == anoAtual) && (mes == mesAtual) && (dia < diaAtual);

            return !(primeiroCasoInvalido || segundoCasoInvalido || terceiroCasoInvalido);

        },

        validarCheckIn(checkIn) {
            if (!this.contemValor(checkIn)) {
                const checkInNaoPreenchido = "checkInNaoPreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN] = RECURSOS_I18N.getText(checkInNaoPreenchido);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN];
        },

        validarCheckOut(checkOut, checkIn) {
            const separador = "-";
            const [anoCheckOut, mesCheckOut, diaCheckOut] = checkOut.split(separador);
            const [anoCheckIn, mesCheckIn, diaCheckIn] = checkIn.split(separador);
            const primeiroCasoInvalido = (anoCheckOut < anoCheckIn);
            const segundoCasoInvalido = (anoCheckOut == anoCheckIn) && (mesCheckOut < mesCheckIn);
            const terceiroCasoInvalido = (anoCheckOut == anoCheckIn) && (mesCheckOut == mesCheckIn) && (diaCheckOut < diaCheckIn);

            if (!this.contemValor(checkOut)) {
                const checkOutNaoPreenchido = "checkOutNaoPreenchido";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT] = RECURSOS_I18N.getText(checkOutNaoPreenchido);
            }
            else if (primeiroCasoInvalido || segundoCasoInvalido || terceiroCasoInvalido) {
                const checkOutAnteriorCheckIn = "checkOutAnteriorCheckIn";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT] = RECURSOS_I18N.getText(checkOutAnteriorCheckIn);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT];
        },

        validarCheckInCadastro(checkIn) {
            LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN] = this.validarCheckIn(checkIn);

            if (!this.validarDataCadastro(checkIn)) {
                const checkInDatasPassadas = "checkInDatasPassadas";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN] = RECURSOS_I18N.getText(checkInDatasPassadas);
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_IN];
        },

        validarCheckOutCadastro(checkOut, checkIn) {
            LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT] = this.validarCheckOut(checkOut, checkIn);

            if (!this.validarDataCadastro(checkOut)) {
                const checkOutDatasPassadas = "checkOutDatasPassadas";
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT] = RECURSOS_I18N.getText(checkOutDatasPassadas);
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_CHECK_OUT];
        },

        validarPrecoEstadia(precoEstadia) {
            const regexValoresNaoPermitidos = /[^0-9\.,]+/g;
            const valorMaximoPrecoEstadia = 9999999999.99;
            const valorZero = 0;
            const numeroPrecoEstadia = Number(Formatter.desformataPrecoEstadia(precoEstadia));

            if (!this.contemValor(precoEstadia)) {
                const precoEstadiaNaoPreenchido = "precoEstadiaNaoPreenchido"
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA] = RECURSOS_I18N.getText(precoEstadiaNaoPreenchido);
            }
            else if (String(precoEstadia).match(regexValoresNaoPermitidos)) {
                const precoEstadiaFormatoInvalido = "precoEstadiaFormatoInvalido"
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA] = RECURSOS_I18N.getText(precoEstadiaFormatoInvalido);
            }
            else if (numeroPrecoEstadia > valorMaximoPrecoEstadia) {
                const precoEstadiaAcimaValorMaximo = "precoEstadiaAcimaValorMaximo"
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA] = RECURSOS_I18N.getText(precoEstadiaAcimaValorMaximo);
            }
            else if (numeroPrecoEstadia <= valorZero) {
                const precoEstadiaNegativoOuZero = "precoEstadiaNegativoOuZero"
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA] = RECURSOS_I18N.getText(precoEstadiaNegativoOuZero);
            }
            else {
                LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA] = undefined;
            }

            return LISTA_ERROS[INDICE_MENSAGEM_ERRO_PRECO_ESTADIA];
        }
    }
})