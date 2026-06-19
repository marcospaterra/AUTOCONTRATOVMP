import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { DocumentFile, ExtractedData } from "./types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Permitir CORS de qualquer origem para facilitar a integração nativa com o Elementor (WordPress)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Let's support larger base64 file payloads for document analysis
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Initialize Gemini client on the server side
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for document processing with Gemini
  app.post("/api/process-documents", async (req, res) => {
    try {
      const { files } = req.body as { files: DocumentFile[] };
      if (!files || !Array.isArray(files) || files.length === 0) {
        res.status(400).json({ error: "Nenhum arquivo enviado para análise." });
        return;
      }

      if (!apiKey) {
        res.status(500).json({ error: "Sua chave de API do Gemini não está configurada nos Segredos do Sistema." });
        return;
      }

      const model = 'gemini-3.5-flash';
      
      const parts = files.map(file => {
        // Strip out base64 visual headers if present (e.g. "data:image/png;base64,")
        let base64Data = file.base64;
        if (base64Data.includes(";base64,")) {
          base64Data = base64Data.split(";base64,").pop() || "";
        }
        return {
          inlineData: {
            data: base64Data,
            mimeType: file.mimeType,
          },
        };
      });

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
        if (!text) {
          throw new Error("Resposta vazia da inteligência artificial.");
        }

        // Validate that it's parseable JSON
        const parsedData = JSON.parse(text) as ExtractedData;
        res.json({ success: true, data: parsedData });
      } catch (geminiErr: any) {
        console.error("Gemini Error:", geminiErr);
        res.status(500).json({ error: geminiErr.message || "Falha na análise via Gemini AI." });
      }
    } catch (err: any) {
      console.error("Server processing error:", err);
      res.status(500).json({ error: err.message || "Erro no processamento interno do servidor." });
    }
  });

  // Serve static assets & route UI
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} under ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
