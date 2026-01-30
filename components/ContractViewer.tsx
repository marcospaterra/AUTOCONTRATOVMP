
import React, { useState } from 'react';
import { ExtractedData } from '../types';
import { Download, Printer, ArrowLeft, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ContractViewerProps {
  data: ExtractedData;
  onReset: () => void;
}

const ContractViewer: React.FC<ContractViewerProps> = ({ data, onReset }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('contract-content');
    if (!element) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Maior qualidade
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`contrato_vmp_${data.cnh.nome.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Use a função de Imprimir -> Salvar como PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-6 animate-in fade-in duration-700">
      {/* Barra de Ações - Estilo Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 no-print sticky top-24 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onReset}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Voltar e Iniciar Novo"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-none">REVISÃO FINAL</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Pronto para assinatura</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isExporting}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} 
            SALVAR PDF
          </button>
          <button 
            onClick={handlePrint} 
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-black rounded-xl border border-slate-200 hover:bg-slate-200 transition-all active:scale-95"
          >
            <Printer size={20} /> IMPRIMIR
          </button>
        </div>
      </div>

      {/* Papel do Contrato - 100% Original */}
      <div 
        id="contract-content" 
        className="bg-white p-[2.5cm] shadow-2xl rounded-sm border border-slate-300 text-black print-area" 
        style={{ 
          fontFamily: '"Times New Roman", Times, serif', 
          fontSize: '12.5pt', 
          lineHeight: '1.4',
          minHeight: '29.7cm'
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-[16pt] font-bold tracking-tight uppercase leading-none">Contrato de Aluguel com Direito a compra</h1>
          <h2 className="text-[16pt] font-bold tracking-tight mt-1 uppercase leading-none">E Recibo de Entrega de Veículo</h2>
        </div>

        <div className="mb-6 border-b-[1.5pt] border-black pb-2">
          <p className="font-bold text-[#E00000] uppercase text-[11pt]">
            LOCADOR: <span className="underline decoration-[1.5pt] underline-offset-4">{data.locador.nome.toUpperCase()}</span> 
            <span className="ml-2">{data.locador.tipoDocumento} {data.locador.documento}</span> 
            <span className="ml-2">TELEFONE: {data.locador.telefone}</span>
          </p>
        </div>

        <div className="space-y-5 text-justify leading-relaxed">
          <p>
            <span className="font-bold">LOCATARIO :</span> <span className="bg-yellow-200 px-1 font-bold">{data.cnh.nome.toUpperCase()}</span> CPF:<span className="bg-yellow-200 px-1 font-bold">{data.cnh.cpf}</span> e do 
            RG <span className="bg-yellow-200 px-1 font-bold">{data.cnh.rg}</span> <span className="bg-yellow-200 px-1 font-bold">{data.cnh.orgaoEmissor}</span> Residente e domiciliado a Rua:<span className="bg-yellow-200 px-1 font-bold">{data.residencia.endereco}</span> <span className="bg-yellow-200 px-1 font-bold">{data.residencia.numero}</span>,<span className="bg-yellow-200 px-1 font-bold">{data.residencia.bairro}</span> CEP:<span className="bg-yellow-200 px-1 font-bold">{data.residencia.cep}</span> <span className="bg-yellow-200 px-1 font-bold">{data.residencia.cidade}</span> <span className="bg-yellow-200 px-1 font-bold">{data.residencia.estado}</span> TELEFONE:<span className="bg-yellow-200 px-1 font-bold">{data.cnh.telefone}</span> <span className="bg-yellow-100 px-1">{data.cnh.telefoneReferencia && `(REF: ${data.cnh.telefoneReferencia})`}</span> 
            EMAIL:<span className="bg-yellow-200 px-1 font-bold">{data.cnh.email}</span> <span className="font-bold">VEICULO DO CONTRATO – AUTOMOVEL:</span>
          </p>

          <p className="font-bold">
            VEICULO: <span className="bg-yellow-200 px-1">{data.crlv.marcaModelo.toUpperCase()}</span> / REN: <span className="bg-yellow-200 px-1">{data.crlv.renavam}</span> PLACA:<span className="bg-yellow-200 px-1">{data.crlv.placa}</span> COR: <span className="bg-yellow-200 px-1">{data.crlv.cor.toUpperCase()}</span> ANO/ MODE: <span className="bg-yellow-200 px-1">{data.crlv.anoModelo}</span>
          </p>

          <p className="font-bold">VEICULOS SEM GARANTIA DE MOTOR E CAMBIO OBS EESE VEICULO COM GARANTIA 3 MESES</p>

          <p className="text-[#E00000] uppercase font-bold text-[11pt] border border-[#E00000] p-2 text-center">
            PAGAMENTO DAS PARCELAS POR TOTAL RESPONSABILIDADE DO COMPRADOR – EM CASO DE 
            ATRASO O VEICULO SERÁ IMEDIATAMENTE DISPOSTO A BUSCA E APREENSÃO .
          </p>

          <p className="font-bold">
            DOCUMENTAÇÃO: LICENCIAMENTO 2025 PAGO OBS :<span className="text-[#E00000]">LICENCIAMENTO 2026 SER PAGO PELO LOCATARIO</span>
          </p>

          <p>
            <span className="font-bold">3.1</span> Constituí Objeto do contrato de Aluguel com Direito de Compra, o veiculo (carro ou moto) acima Descrito (item 3) 
            para a posse e uso do carro pelo cliente, exclusivamente em território nacional, durante o pagamento dos aluguéis 
            (parcelas) do veículo, Certo que o carro/moto da locadora não poderá ser objeto de uso inadequado e ilegal. <span className="underline decoration-1 underline-offset-2">Veiculo não 
            poderá ser vendido enquanto não quitar as parcelas.</span>
          </p>

          <p className="font-bold underline text-[13pt]">4- DO PAGAMENTO “ALUGUEL-PARCELA, CUSTOS E MULTAS”</p>

          <p className="font-bold">► [OBS]</p>

          <p>
            COMO PARTE DE PAGAMENTO NO VALOR DE : <span className="bg-yellow-200 px-1 font-bold">R$ {data.extra.valorAto}</span> <span className="bg-yellow-200 px-1 font-bold">{data.extra.valorAtoExtenso}</span> REAIS NO ATO, E O RESTANTE FICARÁ DA SEGUINTE 
            FORMA: <span className="bg-yellow-200 px-1 font-bold uppercase block mt-2 border-l-4 border-black pl-3">Restante será pago em : {data.extra.numeroParcelas} x vezes de R$ {data.extra.valorParcela} ( {data.extra.valorParcelaExtenso} )</span>
          </p>

          <p>
            Iniciadas em : <span className="bg-yellow-200 px-1 font-bold uppercase">{data.extra.dataInicio}</span> - vencendo todo dia <span className="bg-yellow-200 px-1 font-bold uppercase">{data.extra.diaVencimento}</span> de cada mês subsequente.
          </p>

          <p className="bg-black text-white font-bold uppercase py-2 px-3 text-center text-[10pt]">APÓS 05 (CINCO) DIAS DE ATRASO O NOME SERA PROTESTADO EM CARTORIO</p>

          <p className="text-[10pt] uppercase leading-tight">
            <span className="font-bold">4.2 ”CLIENTE”</span> <span className="text-[#E00000] font-bold">CIENTE QUE O “RECIBO DE COMPRA E VENDA” SÓ SERÁ ENTREGUE APÓS A QUITAÇÃO TOTAL DO CARRO/MOTO</span>, PARA QUE 
            O LOCATÁRIO ”CLIENTE” FAÇA A TRANFERÊNCIA DA TITULARIDADE; AS PARTES CONCORDAM QUE, O VEÍCULO FICARÁ EM NOME DA 
            LOCADORA ATÉ O PAGAMENTO DE TODAS PARCELAS ACIMA DESCRITAS.
          </p>

          <p className="text-[10pt] uppercase italic font-bold">
            4.3 CASO TRANSCORRAM 10 (DEZ) DIAS DE ATRASO NO PAGAMENTO DE QUALQUER PARCELA, O CONTRATO SERA AUTOMATICAMENTE 
            RESCINDIDO POR CULPA DO LOCATÁRIO E O VEÍCULO SERÁ DEVOLVIDO IMEDIATAMENTE À LOCADORA.
          </p>

          <div className="mt-12 text-center space-y-8">
            <div className="bg-slate-100 border border-slate-300 py-3 font-bold text-[11pt]">
              Data da Entrega do Veículo: <span className="bg-white border-b-2 border-black px-4">{data.extra.dataEntrega}</span>
            </div>
            
            <p className="font-bold text-[10pt] uppercase">Cliente assina abaixo declarando ler todas as cláusulas e concordando com o acordo firmado.</p>
            
            <div className="flex flex-col sm:flex-row justify-between pt-16 gap-12 sm:gap-4">
              <div className="flex-1 text-center">
                <div className="border-t-[1.5pt] border-black pt-2">
                  <p className="font-bold text-[11pt]">{data.cnh.nome.toUpperCase()}</p>
                  <p className="text-[10pt] font-bold mt-1">LOCATÁRIO (CPF: {data.cnh.cpf})</p>
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="border-t-[1.5pt] border-black pt-2">
                  <p className="font-bold text-[11pt]">REPRESENTANTE LEGAL</p>
                  <p className="text-[10pt] font-bold mt-1">VMP VEÍCULOS</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 text-[9pt] text-slate-400 text-center italic border-t border-slate-100 mt-10">
            (Página 01 de 01 - Documento Gerado em {new Date().toLocaleDateString('pt-BR')})
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-12 no-print">
        <button 
          onClick={onReset}
          className="flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
        >
          <ArrowLeft size={22} /> NOVO CONTRATO
        </button>
      </div>
    </div>
  );
};

export default ContractViewer;