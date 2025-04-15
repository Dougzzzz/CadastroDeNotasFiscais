export interface NotaFiscal {
    Id?: string;
    Numero: number;
    DataEmissao: string;
    Valor: number;
    Fornecedor: {
        Nome: string;
        Inscricao: string;
    };
    Cliente: {
        Nome: string;
        Inscricao: string;
    };
}