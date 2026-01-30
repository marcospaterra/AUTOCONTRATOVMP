
import React, { useState } from 'react';
import { ExtractedData } from '../types';
import { User, Home, Car, DollarSign, Shield, PhoneForwarded, Mail, Phone } from 'lucide-react';
import { numeroParaExtenso } from '../utils/numberToWords';

interface DataVerificationProps {
  data: ExtractedData;
  onConfirm: (finalData: ExtractedData) => void;
  onCancel: () => void;
}

const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-2 mb-6 border-b pb-2">
    <Icon className="text-indigo-600" size={20} />
    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">{title}</h3>
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text", icon: Icon }: { label: string, value: string, onChange: (val: string) => void, placeholder?: string, type?: string, icon?: any }) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">{label}</label>
    <div className="relative">
      {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon size={16} /></div>}
      <input 
        type={type} 
        value={value || ''} 
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-medium`}
      />
    </div>
  </div>
);

const DataVerification: React.FC<DataVerificationProps> = ({ data, onConfirm, onCancel }) => {
  const [formData, setFormData] = useState<ExtractedData>(data);

  const handleChange = (section: keyof ExtractedData, field: string, value: string) => {
    setFormData(prev => {
      const updatedSection = { ...prev[section], [field]: value };
      
      if (section === 'extra') {
        if (field === 'valorAto') {
          (updatedSection as any).valorAtoExtenso = numeroParaExtenso(value).toUpperCase();
        } else if (field === 'valorParcela') {
          (updatedSection as any).valorParcelaExtenso = numeroParaExtenso(value).toUpperCase();
        }
      }

      return { ...prev, [section]: updatedSection };
    });
  };

  const toggleLocadorDoc = (type: 'CPF' | 'CNPJ') => {
    setFormData(prev => ({
      ...prev,
      locador: { ...prev.locador, tipoDocumento: type }
    }));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-500 mb-10 border border-slate-100">
      <div className="p-8 sm:p-12">
        <h2 className="text-2xl font-black text-slate-900 mb-10 text-center uppercase tracking-tighter">Preencha os Dados do Contrato</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Coluna Esquerda */}
          <div className="space-y-10">
            <section>
              <SectionHeader icon={Shield} title="Dados do Locador" />
              <div className="grid gap-5">
                <InputField label="Nome / Razão Social" value={formData.locador.nome} onChange={(v) => handleChange('locador', 'nome', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documento</label>
                    <div className="flex bg-slate-100 rounded-xl p-1 h-[46px]">
                      <button 
                        onClick={() => toggleLocadorDoc('CPF')}
                        className={`flex-1 py-1 text-xs font-black rounded-lg transition-all ${formData.locador.tipoDocumento === 'CPF' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                      >CPF</button>
                      <button 
                        onClick={() => toggleLocadorDoc('CNPJ')}
                        className={`flex-1 py-1 text-xs font-black rounded-lg transition-all ${formData.locador.tipoDocumento === 'CNPJ' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                      >CNPJ</button>
                    </div>
                  </div>
                  <InputField label={`Número do ${formData.locador.tipoDocumento}`} value={formData.locador.documento} onChange={(v) => handleChange('locador', 'documento', v)} />
                </div>
                <InputField label="Telefone do Locador" icon={Phone} value={formData.locador.telefone} onChange={(v) => handleChange('locador', 'telefone', v)} />
              </div>
            </section>

            <section>
              <SectionHeader icon={User} title="Dados do Locatário" />
              <div className="grid gap-5">
                <InputField label="Nome Completo" value={formData.cnh.nome} onChange={(v) => handleChange('cnh', 'nome', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="CPF" value={formData.cnh.cpf} onChange={(v) => handleChange('cnh', 'cpf', v)} />
                  <InputField label="RG / Órgão Emissor" value={`${formData.cnh.rg} ${formData.cnh.orgaoEmissor}`} onChange={(v) => handleChange('cnh', 'rg', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Telefone Principal" icon={Phone} value={formData.cnh.telefone} onChange={(v) => handleChange('cnh', 'telefone', v)} />
                  <InputField label="Telefone de Referência" icon={PhoneForwarded} value={formData.cnh.telefoneReferencia} onChange={(v) => handleChange('cnh', 'telefoneReferencia', v)} />
                </div>
                <InputField label="Email para Contrato" icon={Mail} value={formData.cnh.email} onChange={(v) => handleChange('cnh', 'email', v)} type="email" />
              </div>
            </section>

            <section>
              <SectionHeader icon={Home} title="Endereço Residencial" />
              <div className="grid gap-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2"><InputField label="Rua / Avenida" value={formData.residencia.endereco} onChange={(v) => handleChange('residencia', 'endereco', v)} /></div>
                  <InputField label="Número" value={formData.residencia.numero} onChange={(v) => handleChange('residencia', 'numero', v)} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField label="Bairro" value={formData.residencia.bairro} onChange={(v) => handleChange('residencia', 'bairro', v)} />
                  <InputField label="Cidade" value={formData.residencia.cidade} onChange={(v) => handleChange('residencia', 'cidade', v)} />
                  <InputField label="Estado (UF)" value={formData.residencia.estado} onChange={(v) => handleChange('residencia', 'estado', v)} />
                </div>
                <InputField label="CEP" value={formData.residencia.cep} onChange={(v) => handleChange('residencia', 'cep', v)} />
              </div>
            </section>
          </div>

          {/* Coluna Direita */}
          <div className="space-y-10">
            <section>
              <SectionHeader icon={Car} title="Informações do Veículo" />
              <div className="grid gap-5">
                <InputField label="Marca e Modelo" value={formData.crlv.marcaModelo} onChange={(v) => handleChange('crlv', 'marcaModelo', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="RENAVAM" value={formData.crlv.renavam} onChange={(v) => handleChange('crlv', 'renavam', v)} />
                  <InputField label="Placa" value={formData.crlv.placa} onChange={(v) => handleChange('crlv', 'placa', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Cor Predominante" value={formData.crlv.cor} onChange={(v) => handleChange('crlv', 'cor', v)} />
                  <InputField label="Ano Modelo" value={formData.crlv.anoModelo} onChange={(v) => handleChange('crlv', 'anoModelo', v)} />
                </div>
              </div>
            </section>

            <section>
              <SectionHeader icon={DollarSign} title="Condições Financeiras" />
              <div className="grid gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Valor de Entrada (Ato) R$" value={formData.extra.valorAto} onChange={(v) => handleChange('extra', 'valorAto', v)} />
                  <InputField label="Ato por Extenso" value={formData.extra.valorAtoExtenso} onChange={(v) => handleChange('extra', 'valorAtoExtenso', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Qtd. de Parcelas" value={formData.extra.numeroParcelas} onChange={(v) => handleChange('extra', 'numeroParcelas', v)} />
                  <InputField label="Valor da Parcela R$" value={formData.extra.valorParcela} onChange={(v) => handleChange('extra', 'valorParcela', v)} />
                </div>
                <InputField label="Parcela por Extenso" value={formData.extra.valorParcelaExtenso} onChange={(v) => handleChange('extra', 'valorParcelaExtenso', v)} />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2"><InputField label="Data do 1º Pagamento" value={formData.extra.dataInicio} onChange={(v) => handleChange('extra', 'dataInicio', v)} /></div>
                  <InputField label="Dia de Venc." value={formData.extra.diaVencimento} onChange={(v) => handleChange('extra', 'diaVencimento', v)} />
                </div>
                <InputField label="Data e Hora da Entrega" value={formData.extra.dataEntrega} onChange={(v) => handleChange('extra', 'dataEntrega', v)} placeholder="Ex: 20/05/2024 às 14:00" />
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-end gap-5 border-t border-slate-100 pt-10">
            <button 
              onClick={onCancel} 
              className="px-8 py-3 text-slate-400 font-bold hover:text-red-500 transition-colors uppercase text-sm tracking-widest"
            >
              Descartar e Voltar
            </button>
            <button 
              onClick={() => onConfirm(formData)} 
              className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:translate-y-0 uppercase tracking-tighter text-lg"
            >
              Gerar Contrato Final
            </button>
        </div>
      </div>
    </div>
  );
};

export default DataVerification;
