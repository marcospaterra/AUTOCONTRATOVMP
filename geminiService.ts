import { DocumentFile, ExtractedData } from "./types";

export async function processDocuments(files: DocumentFile[]): Promise<ExtractedData> {
  try {
    const response = await fetch("api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Erro de conexão à API: código ${response.status}`);
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || "A API não retornou dados válidos.");
    }
    return json.data as ExtractedData;
  } catch (error: any) {
    console.error("Erro ao chamar a API de análise de documentos:", error);
    throw error;
  }
}
