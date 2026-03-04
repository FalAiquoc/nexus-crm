import { useState } from 'react';
import { Client } from '../types';
import { Search } from 'lucide-react';

interface ClientListProps {
  clients: Client[];
}

const STATUS_COLORS: Record<string, string> = {
  'Novo Lead': 'bg-[#C9A84C] text-[#1a1a1a]',
  'Em Contato': 'bg-[#2563EB] text-white',
  'Proposta Enviada': 'bg-[#7C3AED] text-white',
  'Fechado': 'bg-[#2D6A4F] text-white',
  'Perdido': 'bg-[#8B2020] text-white',
};

export function ClientList({ clients }: ClientListProps) {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h2 className="text-2xl font-bold text-[#C9A84C] tracking-wide uppercase">Clientes</h2>
        <span className="text-[#9A9A9A] text-sm">({filteredClients.length})</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" size={16} />
        <input
          type="text"
          placeholder="Buscar por nome, email ou telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-3 text-[#F0EAD6] text-sm placeholder-[#9A9A9A] focus:outline-none focus:border-[#C9A84C] transition-colors"
        />
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-16 text-[#9A9A9A]">
          <p className="text-lg font-semibold">Nenhum cliente encontrado</p>
          <p className="text-sm mt-1">Tente outra busca ou adicione um novo cliente</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-5 hover:border-[#C9A84C] transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-[#F0EAD6] text-base">{client.name}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    STATUS_COLORS[client.status] || 'bg-[#3a3a3a] text-[#9A9A9A]'
                  }`}
                >
                  {client.status}
                </span>
              </div>
              <div className="space-y-1 text-xs text-[#9A9A9A]">
                <p>{client.email}</p>
                <p>{client.phone}</p>
                <p>{client.origin} &bull; {client.createdAt}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-[#3a3a3a]">
                <span className="text-[#C9A84C] font-bold text-sm">{formatCurrency(client.estimatedValue)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
