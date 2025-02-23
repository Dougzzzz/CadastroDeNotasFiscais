sap.ui.define([
    
], () => {
    "use strict";    

        return ("ui5.cadastroDeNotasFiscais.repositorios.HttpRequest", {
        request(URL, metodoHttp, cabecalho = {}, corpo){
            return fetch(
                URL, {
                    method: metodoHttp,
                    headers: cabecalho,
                    body: corpo
                }
            )
        }
    });
});