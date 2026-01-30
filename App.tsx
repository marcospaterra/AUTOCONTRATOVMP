
import React, { useState } from 'react';
import { ShieldCheck, FileText, ChevronRight, Edit3 } from 'lucide-react';
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
      alert("Erro ao processar documentos. Por favor, tente novamente ou use o preenchimento manual.");
      console.error(error);
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
  };

  const handleReset = () => {
    setExtractedData(null);
    setIsProcessing(false);
    setStep('UPLOAD');
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-12 no-print">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${step === 'UPLOAD' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
        Início
      </div>
      <ChevronRight className="text-slate-300" />
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${step === 'VERIFY' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
        Preenchimento
      </div>
      <ChevronRight className="text-slate-300" />
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${step === 'CONTRACT' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
        Finalizar
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">VMP VEÍCULOS</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest leading-none mt-1">Gestão de Contratos</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <ShieldCheck className="text-green-500" size={18} />
              Seguro e Criptografado
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-12 no-print">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4 uppercase">
            {step === 'UPLOAD' && 'Inicie seu Contrato'}
            {step === 'VERIFY' && 'Dados do Contrato'}
            {step === 'CONTRACT' && 'Contrato Gerado'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {step === 'UPLOAD' && 'Escolha entre usar a Inteligência Artificial para ler documentos ou preencher tudo manualmente.'}
            {step === 'VERIFY' && 'Confira e complete todas as informações abaixo para gerar o documento.'}
            {step === 'CONTRACT' && 'O contrato foi gerado seguindo o modelo padrão da empresa.'}
          </p>
        </div>

        <StepIndicator />

        {step === 'UPLOAD' && (
          <div className="space-y-12">
            <FileUploader 
              onFilesReady={handleFilesReady} 
              isProcessing={isProcessing} 
            />
            
            <div className="flex flex-col items-center gap-4 pt-8 border-t border-slate-200 no-print">
              <p className="text-slate-500 font-medium">Não tem os documentos agora?</p>
              <button 
                onClick={handleManualEntry}
                className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
              >
                <Edit3 size={20} /> Preencher Manualmente
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
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-3 px-6 text-center text-xs text-slate-400 no-print">
        VMP VEÍCULOS © 2024 - Sistema Interno de Documentação.
      </footer>
    </div>
  );
};

export default App;
