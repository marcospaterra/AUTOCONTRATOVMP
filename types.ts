
export interface ExtractedData {
  locador: {
    nome: string;
    documento: string;
    tipoDocumento: 'CPF' | 'CNPJ';
    telefone: string;
  };
  cnh: {
    nome: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    dataNascimento: string;
    telefone: string;
    telefoneReferencia: string;
    email: string;
  };
  residencia: {
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  crlv: {
    marcaModelo: string;
    anoModelo: string;
    anoFabricacao: string;
    placa: string;
    renavam: string;
    chassi: string;
    cor: string;
    combustivel: string;
  };
  extra: {
    valorTotal: string;
    valorTotalExtenso: string;
    valorAto: string;
    valorAtoExtenso: string;
    numeroParcelas: string;
    valorParcela: string;
    valorParcelaExtenso: string;
    dataInicio: string;
    dataEntrega: string;
    diaVencimento: string;
  };
}

export type AppStep = 'UPLOAD' | 'VERIFY' | 'CONTRACT';

export interface DocumentFile {
  type: 'CNH' | 'CRLV' | 'RESIDENCIA';
  base64: string;
  mimeType: string;
}
