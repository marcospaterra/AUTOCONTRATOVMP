
import React, { useState } from 'react';
import { ShieldCheck, FileText, ChevronRight, Edit3, Car } from 'lucide-react';
import FileUploader from './components/FileUploader';
import DataVerification from './components/DataVerification';
import ContractViewer from './components/ContractViewer';
import { AppStep, DocumentFile, ExtractedData } from './types';
import { processDocuments } from './geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('UPLOAD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const emptyData: ExtractedData = {
    locador: { 
      nome: 'CAIO ROBERTO DE SOUZA OLIVEIRA', 
      documento: '461.227.128-92', 
      tipoDocumento: 'CPF', 
      telefone: '(15) 996017089' 
    },
    cnh: { nome: '', cpf: '', rg: '', orgaoEmissor: '', dataNascimento: '', telefone: '', telefoneReferencia: '', email: '' },
    residencia: { endereco: '', numero: '', bairro: '', cidade: '', estado: '', cep: '' },
    crlv: { marcaModelo: '', anoModelo: '', anoFabricacao: '', placa: '', renavam: '', chassi: '', cor: '', combustivel: '' },
    extra: { 
      valorTotal: '', valorTotalExtenso: '', valorAto: '', valorAtoExtenso: '', 
      numeroParcelas: '', valorParcela: '', valorParcelaExtenso: '', 
      dataInicio: '', dataEntrega: '', diaVencimento: '' 
    }
  };

  const handleFilesReady = async (files: DocumentFile[]) => {
    setIsProcessing(true);
    try {
      const data = await processDocuments(files);
      setExtractedData(data);
      setStep('VERIFY');
    } catch (error) {
      alert("Houve um problema na análise automática. Vamos tentar o preenchimento manual.");
      handleManualEntry();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualEntry = () => {
    setExtractedData(emptyData);
    setStep('VERIFY');
  };

  const handleConfirmData = (finalData: ExtractedData) => {
    setExtractedData(finalData);
    setStep('CONTRACT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (confirm("Deseja realmente voltar? Todos os dados preenchidos serão perdidos.")) {
      setExtractedData(null);
      setIsProcessing(false);
      setStep('UPLOAD');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 no-print">
      {[
        { id: 'UPLOAD', label: 'Início', num: '1' },
        { id: 'VERIFY', label: 'Dados', num: '2' },
        { id: 'CONTRACT', label: 'Finalizar', num: '3' }
      ].map((s, idx) => (
        <React.Fragment key={s.id}>
          <div className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full font-bold transition-all ${step === s.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === s.id ? 'bg-white text-indigo-600' : 'bg-slate-300'}`}>
              {s.num}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-wider">{s.label}</span>
          </div>
          {idx < 2 && <ChevronRight size={16} className="text-slate-300" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Profissional */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 no-print shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-indigo-200 shadow-lg">
              <Car size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">VMP <span className="text-indigo-600">VEÍCULOS</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-none mt-1">Contratos Inteligentes</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="text-emerald-500" size={18} />
              Ambiente Seguro
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <div className="text-center mb-10 no-print">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            {step === 'UPLOAD' && 'GERADOR DE CONTRATOS'}
            {step === 'VERIFY' && 'REVISÃO DE DADOS'}
            {step === 'CONTRACT' && 'CONTRATO PRONTO'}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">
            {step === 'UPLOAD' && 'Analise documentos com IA ou preencha manualmente para gerar seu contrato jurídico em segundos.'}
            {step === 'VERIFY' && 'Confira todos os campos antes de gerar a versão final para impressão.'}
            {step === 'CONTRACT' && 'O contrato foi gerado seguindo o padrão VMP VEÍCULOS. Você pode imprimir ou salvar em PDF.'}
          </p>
        </div>

        <StepIndicator />

        <div className="step-enter">
          {step === 'UPLOAD' && (
            <div className="space-y-12">
              <FileUploader 
                onFilesReady={handleFilesReady} 
                isProcessing={isProcessing} 
              />
              
              <div className="flex flex-col items-center gap-4 py-8 border-t border-slate-200 no-print">
                <span className="bg-white px-4 -mt-11 text-slate-400 font-bold text-xs uppercase tracking-widest">Ou</span>
                <button 
                  onClick={handleManualEntry}
                  className="flex items-center gap-3 px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:border-indigo-600 hover:text-indigo-600 hover:shadow-xl transition-all active:scale-95 group"
                >
                  <Edit3 size={22} className="group-hover:rotate-12 transition-transform" /> 
                  PREENCHER MANUALMENTE
                </button>
              </div>
            </div>
          )}

          {step === 'VERIFY' && extractedData && (
            <DataVerification 
              data={extractedData} 
              onConfirm={handleConfirmData}
              onCancel={handleReset}
            />
          )}

          {step === 'CONTRACT' && extractedData && (
            <ContractViewer 
              data={extractedData} 
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 py-3 px-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest no-print z-40">
        VMP VEÍCULOS © 2024 • TECNOLOGIA PARA GESTÃO VEICULAR
      </footer>
    </div>
  );
};

export default App;