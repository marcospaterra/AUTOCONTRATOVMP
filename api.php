<?php
/**
 * VMP VEÍCULOS - API de Extracão de Documentos via Gemini AI
 * Hospede este arquivo na mesma pasta que os arquivos compilados do seu frontend (ex: public_html/geradordecontrato/).
 */

// 1. Configurar cabeçalhos CORS e limite de dados para upload de imagens base64 grandes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Se for requisição OPTIONS (Preflight de CORS), retorna OK imediatamente.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. CONFIGURAÇÃO PROTOCOLAR: COLOQUE SUA CHAVE DO GEMINI AQUI:
// Você pode colocar a chave diretamente nas aspas simples abaixo:
$gemini_api_key = 'SUA_CHAVE_GEMINI_AQUI';

// Se não preencheu acima, tenta pegar da variável de ambiente da hospedagem
if (empty($gemini_api_key) || $gemini_api_key === 'SUA_CHAVE_GEMINI_AQUI') {
    $gemini_api_key = getenv('GEMINI_API_KEY') ?: getenv('API_KEY') ?: '';
}

if (empty($gemini_api_key)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Configure o seu token de acesso nas configurações da API na Hostinger ou diretamente dentro de 'api.php'."
    ]);
    exit();
}

// 3. Receber e decodificar os dados enviados pelo frontend
$input_raw = file_get_contents("php://input");
$input_data = json_decode($input_raw, true);

if (!isset($input_data['files']) || !is_array($input_data['files']) || count($input_data['files']) === 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Nenhum arquivo ou documento válido foi recebido para análise."
    ]);
    exit();
}

$files = $input_data['files'];
$parts = [];

// 4. Formatar as fotos codificadas em base64 e enviadas para o padrão REST do Gemini
foreach ($files as $file) {
    $base64_data = $file['base64'];
    
    // Remove o cabeçalho base64 data:image/... se estiver presente
    if (strpos($base64_data, ';base64,') !== false) {
        $parts_exploded = explode(';base64,', $base64_data);
        $base64_data = end($parts_exploded);
    }
    
    // Adiciona o documento inline
    $parts[] = [
        "inlineData" => [
            "data" => trim($base64_data),
            "mimeType" => $file['mimeType']
        ]
    ];
}

// 5. Adicionar a instrução operacional para IA do Gemini
$prompt = "Extraia os dados dos documentos (CNH, CRLV e Comprovante de Residência).
Retorne estritamente um JSON com a estrutura abaixo.

Campos específicos:
- locador: Use os dados padrão \"CAIO ROBERTO DE SOUZA OLIVEIRA\", \"461.227.128-92\", \"(15) 996017089\". tipoDocumento: \"CPF\".
- cnh: Tente extrair Telefone, Telefone de Referência e Email se houver anotações manuais ou campos.
- extra: Tente identificar Valor do Ato, Valor da Parcela, Quantidade de Parcelas e Data de Início.

JSON:
{
  \"locador\": { \"nome\": \"\", \"documento\": \"\", \"tipoDocumento\": \"CPF\", \"telefone\": \"\" },
  \"cnh\": { \"nome\": \"\", \"cpf\": \"\", \"rg\": \"\", \"orgaoEmissor\": \"\", \"dataNascimento\": \"\", \"telefone\": \"\", \"telefoneReferencia\": \"\", \"email\": \"\" },
  \"residencia\": { \"endereco\": \"\", \"numero\": \"\", \"bairro\": \"\", \"cidade\": \"\", \"estado\": \"\", \"cep\": \"\" },
  \"crlv\": { \"marcaModelo\": \"\", \"anoModelo\": \"\", \"anoFabricacao\": \"\", \"placa\": \"\", \"renavam\": \"\", \"chassi\": \"\", \"cor\": \"\", \"combustivel\": \"\" },
  \"extra\": { \"valorTotal\": \"\", \"valorTotalExtenso\": \"\", \"valorAto\": \"\", \"valorAtoExtenso\": \"\", \"numeroParcelas\": \"\", \"valorParcela\": \"\", \"valorParcelaExtenso\": \"\", \"dataInicio\": \"\", \"dataEntrega\": \"\", \"diaVencimento\": \"\" }
}";

$parts[] = [
    "text" => $prompt
];

// Montar o corpo da chamada para a API REST da Google
$payload = [
    "contents" => [
        [
            "parts" => $parts
        ]
    ],
    "generationConfig" => [
        "responseMimeType" => "application/json"
    ]
];

// 6. Fazer a requisição para a API oficial do Gemini usando cURL
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" . rawurlencode($gemini_api_key);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: aistudio-build-php'
]);

// Configurações extras de timeout
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Erro na conexao com a IA no servidor Hostinger: " . $error_msg
    ]);
    exit();
}

curl_close($ch);

// 7. Retornar resposta
if ($http_code !== 200) {
    http_response_code($http_code);
    $response_decoded = json_decode($response, true);
    $err_desc = isset($response_decoded['error']['message']) ? $response_decoded['error']['message'] : 'Erro desconhecido na API do Gemini.';
    echo json_encode([
        "success" => false,
        "error" => "A Gemini AI retornou um erro (" . $http_code . "): " . $err_desc
    ]);
    exit();
}

$response_data = json_decode($response, true);
$extracted_text = "";

if (isset($response_data['candidates'][0]['content']['parts'][0]['text'])) {
    $extracted_text = $response_data['candidates'][0]['content']['parts'][0]['text'];
}

if (empty($extracted_text)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "A IA do Gemini processou o arquivo, mas não retornou nenhuma estrutura legível."
    ]);
    exit();
}

$parsed_data = json_decode(trim($extracted_text), true);

if (!$parsed_data) {
    // Caso a saída contenha markdown ou textos extras, tentamos extrair apenas o JSON
    $pattern = '/\{.*\}/s';
    if (preg_match($pattern, $extracted_text, $matches)) {
        $parsed_data = json_decode($matches[0], true);
    }
}

if (!$parsed_data) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Não foi possível formatar os dados extraídos no modelo de contrato."
    ]);
    exit();
}

// Sucesso! Retorna os dados extraídos perfeitamente para o React
echo json_encode([
    "success" => true,
    "data" => $parsed_data
]);
