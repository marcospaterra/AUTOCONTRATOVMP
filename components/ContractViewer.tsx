
import React from 'react';
import { ExtractedData } from '../types';
import { Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ContractViewerProps {
  data: ExtractedData;
  onReset: () => void;
}

const ContractViewer: React.FC<ContractViewerProps> = ({ data, onReset }) => {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('contract-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`contrato_${data.cnh.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Houve um erro ao gerar o PDF. Tente usar a opção de Imprimir -> Salvar como PDF.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 uppercase">Revisão do Documento</h2>
          <p className="text-sm text-slate-500 italic">Visualize o contrato antes de imprimir.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadPDF} 
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <Download size={18} /> Salvar PDF
          </button>
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg border hover:bg-slate-200 transition-all active:scale-95"
          >
            <Printer size={18} /> Imprimir
          </button>
        </div>
      </div>

      <div 
        id="contract-content" 
        className="bg-white p-16 shadow-2xl rounded-sm border border-slate-300 text-slate-900 print-area" 
        style={{ 
          fontFamily: '"Times New Roman", Times, serif', 
          fontSize: '13.5px', 
          lineHeight: '1.4',
          color: '#000'
        }}
      >
        <div className="text-center mb-6">
          <h1 className="text-[17px] font-normal tracking-tight uppercase">Contrato de Aluguel com Direito a compra</h1>
          <h2 className="text-[17px] font-normal tracking-tight mt-1 uppercase">E Recibo de Entrega de Veículo</h2>
        </div>

        <div className="mb-4 border-b-2 border-black pb-1">
          <p className="font-bold text-[#D00] uppercase">
            LOCADOR: <span className="underline">{data.locador.nome.toUpperCase()}</span> {data.locador.tipoDocumento} {data.locador.documento} TELEFONE: {data.locador.telefone}
          </p>
        </div>

        <div className="space-y-5 text-justify">
          <p>
            LOCATARIO : <span className="bg-yellow-100 px-1">{data.cnh.nome.toUpperCase()}</span> CPF:<span className="bg-yellow-100 px-1">{data.cnh.cpf}</span> e do 
            RG <span className="bg-yellow-100 px-1">{data.cnh.rg}</span> <span className="bg-yellow-100 px-1">{data.cnh.orgaoEmissor}</span> Residente e domiciliado a Rua:<span className="bg-yellow-100 px-1">{data.residencia.endereco}</span> <span className="bg-yellow-100 px-1">{data.residencia.numero}</span>,<span className="bg-yellow-100 px-1">{data.residencia.bairro}</span> CEP:<span className="bg-yellow-100 px-1">{data.residencia.cep}</span> <span className="bg-yellow-100 px-1">{data.residencia.cidade}</span> <span className="bg-yellow-100 px-1">{data.residencia.estado}</span> TELEFONE:<span className="bg-yellow-100 px-1">{data.cnh.telefone}</span> <span className="bg-yellow-100 px-1">{data.cnh.telefoneReferencia && `(REF: ${data.cnh.telefoneReferencia})`}</span>
            EMAIL:<span className="bg-yellow-100 px-1">{data.cnh.email}</span> VEICULO DO CONTRATO – AUTOMOVEL:
          </p>

          <p className="font-bold">
            VEICULO: <span className="bg-yellow-100 px-1">{data.crlv.marcaModelo.toUpperCase()}</span> / REN: <span className="bg-yellow-100 px-1">{data.crlv.renavam}</span> PLACA:<span className="bg-yellow-100 px-1">{data.crlv.placa}</span> COR: <span className="bg-yellow-100 px-1">{data.crlv.cor.toUpperCase()}</span> ANO/ MODE: <span className="bg-yellow-100 px-1">{data.crlv.anoModelo}</span>
          </p>

          <p className="font-bold">VEICULOS SEM GARANTIA DE MOTOR E CAMBIO OBS EESE VEICULO COM GARANTIA 3 MESES</p>

          <p className="text-[#D00] uppercase font-bold">
            PAGAMENTO DAS PARCELAS POR TOTAL RESPONSABILIDADE DO COMPRADOR – EM CASO DE 
            ATRASO O VEICULO SERÁ IMEDIATAMENTE DISPOSTO A BUSCA E APREENSÃO .
          </p>

          <p className="font-bold">
            DOCUMENTAÇÃO: LICENCIAMENTO 2025 PAGO OBS :<span className="text-[#D00]">LICENCIAMENTO 2026 SER PAGO PELO LOCATARIO</span>
          </p>

          <p>
            3.1 Constituí Objeto do contrato de Aluguel com Direito de Compra,o veiculo (carro ou moto) acima Descrito (item 3) 
            para a posse e uso do carro pelo cliente,exclusivamente em território nacional,durante o pagamento dos aluguéis 
            (parcelas)do veículo,Certo que o carro/moto da locadora não poderá ser objeto de uso inadequado e ilegal. <span className="underline">Veiculo não 
            poderá ser vendido enquanto não quitar as parcelas.</span>
          </p>

          <p className="font-bold">4-DO PAGAMENTO “ALUGUEL-PARCELA,CUSTOS E MULTAS”</p>

          <p>► [OBS</p>

          <p>
            COMO PARTE DE PAGAMENTO NO VALOR DE : <span className="bg-yellow-100 px-1">R$ {data.extra.valorAto}</span> <span className="bg-yellow-100 px-1">{data.extra.valorAtoExtenso}</span> REAIS NO ATO ,E O RESTANTE FICARÁ DA SEGUINTE 
            FORMA: <span className="bg-yellow-100 px-1 font-bold uppercase">Restante será pago em : {data.extra.numeroParcelas} x vezes de R$ {data.extra.valorParcela} ( {data.extra.valorParcelaExtenso} )</span>
          </p>

          <p>
            Iniciadas em : <span className="bg-yellow-100 px-1 font-bold uppercase">{data.extra.dataInicio}</span> -vencendo todo dia <span className="bg-yellow-100 px-1 font-bold uppercase">{data.extra.diaVencimento}</span> de cada mês subsequente.
          </p>

          <p className="bg-yellow-200 font-bold uppercase py-1 px-1">APÓS 05 (CINCO) DIAS DE ATRASO O NOME SERA PROTESTADO EM CARTORIO</p>

          <p className="text-[11px] uppercase leading-tight font-normal">
            4.2”CLIENTE” <span className="text-[#D00] font-bold">CIENTE QUE O “RECIBO DE COMPRA E VENDA” SÓ SERÁ ENTREGUE APÓS A QUITAÇÃO TOTAL DO CARRO/MOTO</span> ,PARA QUE 
            O LOCATÁRIO”CLIENTE” FAÇA A TRANFERÊNCIA DA TITULARIDADE ; AS PARTES CONCORDAM QUE ,O VEÍCULO FICARÁ EM NOME DA 
            LOCADORA ATÉ O PAGAMENTO DE TODAS PARCELAS ACIMA DESCRITAS.
          </p>

          <p className="text-[11px] uppercase font-normal">
            4.3 CASO TRANSCORRAM 10 (DEZ) DIAS DE ATRASO NO PAGAMENTO DE QUALQUER PARCELA,O CONTRATO SERA AUTOMATICAMENTE 
            RESCINDIDO POR CULPA DO LOCATÁRIO E O VEÍCULO SERÁ DEVOLVIDO IMEDIATAMENTE À LOCADORA,SEM QULQUER DEVOLUÇÃO 
            DOS VALORES PAGOS PELO “CLIENTE”.
          </p>

          <div className="text-[11px] uppercase space-y-2 font-normal">
            <p>4.4 – CASO O LOCATÁRIO ENTREGUE O VEÍCULO NA LOJA PARA A DESISTÊNCIA DO NEGÓCIO,DEVERÁ COMPARECER PARA ASSINAR O TERMO DE ENTREGA E EFETUAR O PAGAMENTO...</p>
            <p>4.5 – AS PARTES CONVENCIONAM QUE AS MULTAS DEVERÁ SER INFORMADAS À LOCADORA...</p>
            <p className="text-[#D00] font-bold">4.6 – LICENCIAMENTO 2024 PAGO. – Posteriores a compra o cliente assume de pagar .</p>
            <p>4.7 – AS MULTAS ,DEMAIS CUSTOS COM IPVA,DPVAT E LICENCIAMENTO... SÃO DE RESPONSABILIDADE EXCLUSIVA DO LOCATÁRIO...</p>
          </div>

          <p className="text-[11px] text-[#D00] uppercase font-bold">
            4.8 – O LOCATÁRIO ESTÁ CIENTE QUE O VEICULO FOI LOCADO NO ESTADO EM QUE SE ENCONTRA.VEICULO SEM GARANTIA...
          </p>

          <div className="mt-10 text-center space-y-6">
            <p className="bg-yellow-200 font-bold p-1">Data da Entrega do Veículo <span className="bg-yellow-100 px-1">{data.extra.dataEntrega}</span></p>
            <p className="font-bold text-sm">Cliente assina abaixo declarando ler todas as cláusulas e concordando com o acordo firmado.</p>
            
            <div className="flex justify-between pt-16 px-10">
              <div className="text-center">
                <div className="border-t-2 border-black w-72 pt-2">
                  <p className="font-bold">{data.cnh.nome.toUpperCase()}</p>
                  <p className="text-sm font-bold mt-2">CPF: {data.cnh.cpf}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t-2 border-black w-72 pt-2">
                  <p className="font-bold">REPRESENTANTE:____________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-12 no-print">
        <button 
          onClick={onReset}
          className="px-12 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
        >
          Voltar e Iniciar Novo
        </button>
      </div>
    </div>
  );
};

export default ContractViewer;
