import { useState } from 'react';
import { Client, ClientOrigin, ClientStatus } from '../types';

interface ClientFormProps {
  onAddClient: (client: Client) => void;
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  origin: 'WhatsApp' as ClientOrigin,
  estimatedValue: '',
  notes: '',
};

export function ClientForm({ onAddClient }: ClientFormProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [toast, setToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      origin: form.origin,
      estimatedValue: parseFloat(form.estimatedValue) || 0,
      notes: form.notes,
      status: 'Novo Lead' as ClientStatus,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddClient(newClient);
    setForm(INITIAL_FORM);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const inputClass =
    'w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-[#F0EAD6] text-sm placeholder-[#9A9A9A] focus:outline-none focus:border-[#C9A84C] transition-colors';

  const labelClass = 'block text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#B8860B] to-[#C9A84C] text-[#1a1a1a] px-6 py-3 rounded-lg font-bold text-sm shadow-lg">
          Cliente salvo com sucesso!
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        <h2 className="text-2xl font-bold text-[#C9A84C] tracking-wide uppercase">Novo Cliente</h2>
      </div>

      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nome completo"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Telefone *</label>
              <input
                type="text"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="(00) 00000-0000"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>E-mail *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="email@exemplo.com"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Origem</label>
              <select
                value={form.origin}
                onChange={e => setForm(f => ({ ...f, origin: e.target.value as ClientOrigin }))}
                className={inputClass}
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Indicacao">Indicacao</option>
                <option value="Site">Site</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Valor Estimado (R$)</label>
            <input
              type="number"
              value={form.estimatedValue}
              onChange={e => setForm(f => ({ ...f, estimatedValue: e.target.value }))}
              placeholder="0.00"
              min="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Notas</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Observacoes sobre o cliente..."
              rows={3}
              className={inputClass + ' resize-none'}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8860B] to-[#C9A84C] text-[#1a1a1a] font-bold py-3 rounded-lg text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Salvar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}
