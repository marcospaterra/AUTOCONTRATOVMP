
export const CONTRACT_TEMPLATE = `
Contrato de Aluguel com Direito a compra 
E Recibo de Entrega de Veículo 
LOCADOR: CAIO ROBERTO DE SOUZA OLIVEIRA CPF 461.227.128-92 TELEFONE: (15) 996017089

LOCATARIO : {{LOCATARIO_NOME}} CPF:{{LOCATARIO_CPF}} e do 
RG {{LOCATARIO_RG}} {{LOCATARIO_ORGAO}} Residente e domiciliado a Rua:{{ENDERECO}},{{NUMERO}},{{BAIRRO}} CEP:{{CEP}} {{CIDADE}} {{ESTADO}} TELEFONE: {{TELEFONE}} 
EMAIL: {{EMAIL}} VEICULO DO CONTRATO – AUTOMOVEL: 

VEICULO: {{VEICULO_MARCA_MODELO}} / REN: {{VEICULO_RENAVAM}} PLACA:{{VEICULO_PLACA}} COR: {{VEICULO_COR}} ANO/ MODE: {{VEICULO_ANO}}
VEICULOS SEM GARANTIA DE MOTOR E CAMBIO OBS EESE VEICULO COM GARANTIA 3 MESES

PAGAMENTO DAS PARCELAS POR TOTAL RESPONSABILIDADE DO COMPRADOR – EM CASO DE 
ATRASO O VEICULO SERÁ IMEDIATAMENTE DISPOSTO A BUSCA E APREENSÃO .

DOCUMENTAÇÃO: LICENCIAMENTO 2025 PAGO OBS :LICENCIAMENTO 2026 SER PAGO PELO 
LOCATARIO

3.1 Constituí Objeto do contrato de Aluguel com Direito de Compra,o veiculo (carro ou moto) acima Descrito (item 3) 
para a posse e uso do carro pelo cliente,exclusivamente em território nacional,durante o pagamento dos aluguéis 
(parcelas)do veículo,Certo que o carro/moto da locadora não poderá ser objeto de uso inadequado e ilegal. Veiculo não 
poderá ser vendido enquanto não quitar as parcelas. 

4-DO PAGAMENTO “ALUGUEL-PARCELA,CUSTOS E MULTAS” 

► [OBS 

COMO PARTE DE PAGAMENTO NO VALOR DE : {{VALOR_TOTAL_NUMERICO}} {{VALOR_TOTAL_EXTENSO}} NO ATO ,E O RESTANTE FICARÁ DA SEGUINTE 
FORMA: RESTANTE SERÁ PAGO EM : {{PARCELAS_QUANTIDADE}} x vezes de R$ {{VALOR_PARCELA}} ( {{VALOR_PARCELA_EXTENSO}} ) 

Iniciadas em : {{DATA_INICIO}} -vencendo todo dia {{DIA_VENCIMENTO}} d e cada mês subsequente.

APÓS 05 (CINCO) DIAS DE ATRASO O NOME SERA PROTESTADO EM CARTORIO

4.2”CLIENTE” CIENTE QUE O “RECIBO DE COMPRA E VENDA” SÓ SERÁ ENTREGUE APÓS A QUITAÇÃO TOTAL DO CARRO/MOTO ,PARA QUE 
O LOCATÁRIO”CLIENTE” FAÇA A TRANFERÊNCIA DA TITULARIDADE ; AS PARTES CONCORDAM QUE ,O VEÍCULO FICARÁ EM NOME DA 
LOCADORA ATÉ O PAGAMENTO DE TODAS PARCELAS ACIMA DESCRITAS. 

4.3 CASO TRANSCORRAM 10 (DEZ) DIAS DE ATRASO NO PAGAMENTO DE QUALQUER PARCELA,O CONTRATO SERA AUTOMATICAMENTE 
RESCINDIDO POR CULPA DO LOCATÁRIO E O VEÍCULO SERÁ DEVOLVIDO IMEDIATAMENTE À LOCADORA,SEM QULQUER DEVOLUÇÃO 
DOS VALORES PAGOS PELO “CLIENTE”. 

4.4 – CASO O LOCATÁRIO ENTREGUE O VEÍCULO NA LOJA PARA A DESISTÊNCIA DO NEGÓCIO,DEVERÁ COMPARECER PARA ASSINAR O 
TERMO DE ENTREGA E EFETUAR O PAGAMENTO DE EVENTUAIS PARCELAS EM ATRASO OU DÉBITOS DO VEÍCULO,JUNTO AOS 
ORGÃOS.NENHUM VALOR SERÁ DEVOLVIDO PELO TEMPO DE ALUGUEL DO CARRO (USUFRUTO) 

4.5 – AS PARTES CONVENCIONAM QUE AS MULTAS DEVERÁ SER INFORMADAS À LOCADORA,COM A INDICAÇÃO DO CONDUTOR 
RESPONSÁVEL PARA PROVIDÊNCIAS 

JUNTO AO DETRAN. (CASO LOCATÁRIO NÃO INDIQUE O CONDUTOR DAS MULTAS TOMADAS PELO MESMO,A INDICAÇÃO SERÁ DE 
R$100,00 (CEM REAIS) POR MULTA. 

4.6 – LICENCIAMENTO 2024 PAGO. – Posteriores a compra o cliente assume de pagar .

4.7 – AS MULTAS ,DEMAIS CUSTOS COM IPVA,DPVAT E LICENCIAMENTO,EVENTUAIS DANOS E AVARIAS NO VEÍCULO SÃO DE 
RESPONSABILIDADE EXCLUSIVA DO LOCATÁRIO “CLIENTE” A PARTIR DA DATA DE HOJE. 

4.8 – O LOCATÁRIO ESTÁ CIENTE QUE O VEICULO FOI LOCADO NO ESTADO EM QUE SE ENCONTRA.VEICULO SEM GARANTIA E SEM 
QUALQUER GARANTIA POR PARTE DA LOCADORA > VEICULO LEVADO PARA TESTE E EM MECANICO DE CONFIANÇA DO CLIENTE ANTES 
DE FECHAR NEGOCIO . TODOS OS DETALHES DO VEICULO VISTOS PREVIAMENTE PELO CLIENTE . 

4.9 – A Locadora não efetuará substituição do carro/moto em caso de furto,Roubo,Incêndio,colisão,apropriação indébita,apreensão pelas autoridades 
competentes;perda,furto ou roubo de chaves e documentos,ou pane provocada por uso inadequado do carro,SENDO OBRIGATÓRIO AO LOCATÁRIO A 
ADESÃO DE UMA APÓLICE DE SEGURO DO VEÍCULO NO MOMENTO DA ASSINATURA . 

5.0 – A LOCADORA ,TEM POR OBRIGAÇÃO,INTALAR RASTREADOR NO VEÍCULO PERTENCENTE A ELA,JUNTO A EMPRESA DE 
RASTREAMENTO,SALVO DE QUE SÓ SERÁ RETIRADO O APARELHO RASTREADOR,APÓS A QUITAÇÃO DO VEÍCULO,CASO 
LOCATARIO,DANIFIQUE OU EXTRAVIE O EQUIPAMENTO SERA COBRADO O VALOR ATUALIZADO DO EQUPAMENTO. 

(Contrato-Termo de Aluguel com Direito a Compra Pag 01-de 02) 

6- Da Recisão do Termo de Aluguel com Direito a Compra 

6.1-O contrato poderá ser automaticamente rescindido pela Locadora,idependente de Qualquer notificação,e sem maiores formalidades ,procedendo -se à retomada 
do Veículo,sem que isso enseje ao cliente,qualquer direito de retenção ou ação de natureza indenizatória,reparatória ou compensatória quando: 6.2-O Cliente não 
quitar seus débitos nos respectivos vencimentos,conforme item (4.3) 

Caso ocorram 10 (dez) dias de Atraso no pagamento de qualquer parcela,o contrato será automaticamente rescindido por culpa do Locatário e o veículo será 
devolvido imediatamente à Locadora,sem qualquer devolução dos Valores Pagos pelo “Cliente” e com protes tos dos cheques não pagos e vencidos. 

6. 3-No Caso de recisão de Contrato,o Locatário Obriga-se a devolver o Carro ou moto Na Loja/Locadora imediatamente,sob pena de caracterização de 
Apropriação indébita do veículo e esbulho. E a multa por quebra de contrato será de 20% (vinte porcento) sobre o valor total da negociação ( veiculo da compra 
) 

6.4- Na Hipótese de o carro/moto Alugado, por qualquer Motivo, vir a ser Rebocado por autoridades competentes, A Locadora somente 
reconhecerá a devolução do carro ou moto, e o encerramento da Locação quando estiver com a posse do bem. 

6.5- Na Hipótese de Acidente ou Incêndio envolvendo o carro/moto Alugado, A Locadora somente reconhecerá a devolução do carro ou moto e 
o encerramento da locação quando estiver com a posse física do bem. 

6.6-Ocorrendo furto ou Roubo do carro/moto Alugado, a Locadora somente reconhecerá o encerramento da locação na Data e Hora do Boletim de Ocorrência 
entregue pelo Cliente, indepentente da data da ocorrência do fato. 

7- DO FORO COMPETENTE E MULTA CONTRATUAL 

7. 1-No caso de cobrança Judicial ou extrajudiucial de valores inadimplentes do Locatário, Além da Atualização monetária e juros simples, A Locadora 
Aplicará uma multa no importe de 20% (vinte por cento) sobre o débito final a título de multa contratual. 

7.2- O Foro competente para Dirimir Quaisquer pendencias relativas ao Contrato é o da 
Sede da Locadora,com renúncia expressa das partes a qualquer outro, por mais privilegiado que seja o Local. 

7.3- O veículo Locado, junto a Locadora ,em Hipótese alguma poderá ser previamente terceirado ,locado ou vendido a terceiros,caso ocorra ,será 
reincidido contrato imediatamente,e resgatado o veículo junto a Locadora e configura-se em, apropriação indébita do veículo 

7.4- em caso de falecimento do proprietário legal do carro/moto aqui citados , faça-se cumprir o contrato . custos por conta de familiares. 

7.5- Como já citado na clausula 4.2 do contrato o recibo só será entregue após a quitação . 

A partir da data e Entrega ,qualquer responsabilidade civil e criminal que indica sobre o Veículo passa a ser de total responsabilidade do Locatário (pretenso 
comprador) a partir da data descriminada deste documento. 

Data da Entrega do Veículo {{DATA_ENTREGA}}

Cliente assina abaixo declarando ler todas as cláusulas e concordando com o acordo firmado. 

_________________________________ ___________________________________ 
{{LOCATARIO_NOME}}
CPF:{{LOCATARIO_CPF}} REPRESENTANTE:____________________
`;
