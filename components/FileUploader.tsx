
import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle, Trash2 } from 'lucide-react';
import { DocumentFile } from '../types';

interface FileUploaderProps {
  onFilesReady: (files: DocumentFile[]) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesReady, isProcessing }) => {
  const [uploads, setUploads] = useState<{ [key: string]: DocumentFile | null }>({
    CNH: null,
    CRLV: null,
    RESIDENCIA: null
  });

  const handleFileChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      setUploads(prev => ({
        ...prev,
        [type]: { type: type as any, base64, mimeType: file.type }
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: string) => {
    setUploads(prev => ({ ...prev, [type]: null }));
  };

  const isReady = !!uploads.CNH && !!uploads.CRLV && !!uploads.RESIDENCIA;

  const handleSubmit = () => {
    if (isReady) {
      onFilesReady(Object.values(uploads).filter(Boolean) as DocumentFile[]);
    }
  };

  const UploadCard = ({ type, label, description }: { type: string, label: string, description: string }) => {
    const file = uploads[type];
    return (
      <div className={`p-6 border-2 border-dashed rounded-xl transition-all ${file ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-indigo-400 bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${file ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
              {file ? <FileCheck size={24} /> : <Upload size={24} />}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{label}</h3>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
          </div>
          {file && (
            <button 
              onClick={() => removeFile(type)}
              className="p-1 hover:bg-red-100 text-red-500 rounded-md transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {!file && (
          <label className="block w-full cursor-pointer">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(type, e)}
              disabled={isProcessing}
            />
            <div className="py-2 px-4 bg-indigo-50 text-indigo-600 font-medium text-center rounded-lg hover:bg-indigo-100 transition-colors">
              Selecionar Arquivo
            </div>
          </label>
        )}
        
        {file && (
          <div className="text-xs text-green-600 font-medium flex items-center gap-1">
            <FileCheck size={14} /> Documento carregado com sucesso
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <UploadCard 
          type="CNH" 
          label="CNH" 
          description="Frente e verso (JPG/PNG/PDF)" 
        />
        <UploadCard 
          type="CRLV" 
          label="CRLV Veículo" 
          description="Documento do carro (JPG/PNG/PDF)" 
        />
        <UploadCard 
          type="RESIDENCIA" 
          label="Residência" 
          description="Comprovante atual (JPG/PNG/PDF)" 
        />
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex gap-3 text-indigo-700 text-sm">
        <AlertCircle className="flex-shrink-0" size={20} />
        <p>Os documentos são processados temporariamente para extração dos dados e não são armazenados em nossos servidores após a geração do contrato.</p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!isReady || isProcessing}
          className={`px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
            isReady && !isProcessing 
            ? 'bg-indigo-600 hover:bg-indigo-700' 
            : 'bg-slate-300 cursor-not-allowed shadow-none'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando Inteligência Artificial...
            </span>
          ) : 'Analisar Documentos'}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
