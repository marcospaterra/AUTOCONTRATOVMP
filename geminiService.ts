
import { GoogleGenAI, Type } from "@google/genai";
import { DocumentFile, ExtractedData } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function processDocuments(files: DocumentFile[]): Promise<ExtractedData> {
  const model = 'gemini-3-flash-preview';
  
  const parts = files.map(file => ({
    inlineData: {
      data: file.base64,
      mimeType: file.mimeType,
    },
  }));

  const prompt = `
    Extraia os dados dos documentos (CNH, CRLV e Comprovante de Residência).
    Retorne estritamente um JSON com a estrutura abaixo.
    
    Campos específicos:
    - locador: Use os dados padrão "CAIO ROBERTO DE SOUZA OLIVEIRA", "461.227.128-92", "(15) 996017089". tipoDocumento: "CPF".
    - cnh: Tente extrair Telefone, Telefone de Referência e Email se houver anotações manuais ou campos.
    - extra: Tente identificar Valor do Ato, Valor da Parcela, Quantidade de Parcelas e Data de Início.
    
    JSON:
    {
      "locador": { "nome": "", "documento": "", "tipoDocumento": "CPF", "telefone": "" },
      "cnh": { "nome": "", "cpf": "", "rg": "", "orgaoEmissor": "", "dataNascimento": "", "telefone": "", "telefoneReferencia": "", "email": "" },
      "residencia": { "endereco": "", "numero": "", "bairro": "", "cidade": "", "estado": "", "cep": "" },
      "crlv": { "marcaModelo": "", "anoModelo": "", "anoFabricacao": "", "placa": "", "renavam": "", "chassi": "", "cor": "", "combustivel": "" },
      "extra": { "valorTotal": "", "valorTotalExtenso": "", "valorAto": "", "valorAtoExtenso": "", "numeroParcelas": "", "valorParcela": "", "valorParcelaExtenso": "", "dataInicio": "", "dataEntrega": "", "diaVencimento": "" }
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [...parts, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Falha na extração.");
    return JSON.parse(text) as ExtractedData;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
