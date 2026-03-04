import { useState } from 'react';
import { Client, ClientStatus } from '../types';
import { MockupGenerator } from '../components/MockupGenerator';
import { DollarSign, MapPin, Phone, Mail, StickyNote } from 'lucide-react';

const COLUMNS: ClientStatus[] = [
  'Novo Lead',
  'Em Contato',
  'Proposta Enviada',
  'Fechado',
  'Perdido',
];

interface KanbanProps {
  clients: Client[];
}

export function Kanban({ clients }: KanbanProps) {
  const [activeTab, setActiveTab] = useState<ClientStatus>('Novo Lead');

  const getClientsForColumn = (status: ClientStatus) =>
    clients.filter((c) => c.status === status);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const ClientCard = ({ client }: { client: Client }) => (
    <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 hover:border-[#C9A84C] transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-[#F0EAD6] text-sm">{client.name}</h4>
        <span className="text-[#C9A84C] font-bold text-sm">{formatCurrency(client.estimatedValue)}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-[#9A9A9A] text-xs">
          <Mail size={11} />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center gap-1 text-[#9A9A9A] text-xs">
          <Phone size={11} />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center gap-1 text-[#9A9A9A] text-xs">
          <MapPin size={11} />
          <span>{client.origin}</span>
        </div>
        {client.notes && (
          <div className="flex items-start gap-1 text-[#9A9A9A] text-xs mt-1">
            <StickyNote size={11} className="mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{client.notes}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <h2 className="text-2xl font-bold text-[#C9A84C] tracking-wide uppercase">Kanban</h2>
      </div>

      {/* MOBILE TABS */}
      <div className="overflow-x-auto pb-2 mb-4">
        <div className="flex gap-2 min-w-max">
          {COLUMNS.map((col) => {
            const count = getClientsForColumn(col).length;
            return (
              <button
                key={col}
                onClick={() => setActiveTab(col)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                  activeTab === col
                    ? 'bg-gradient-to-r from-[#B8860B] to-[#C9A84C] text-[#1a1a1a] border-[#C9A84C]'
                    : 'bg-[#2a2a2a] text-[#9A9A9A] border-[#3a3a3a] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                }`}
              >
                {col} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE COLUMN CONTENT */}
      <div className="flex-1 min-h-[500px] overflow-y-auto">
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span className="text-[#9A9A9A] text-xs font-bold uppercase tracking-widest">{activeTab}</span>
            </div>
            <span className="bg-[#C9A84C] text-[#1a1a1a] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getClientsForColumn(activeTab).length}
            </span>
          </div>
          <div className="space-y-3">
            {getClientsForColumn(activeTab).length === 0 ? (
              <p className="text-[#9A9A9A] text-xs text-center py-8">Nenhum cliente nesta etapa</p>
            ) : (
              getClientsForColumn(activeTab).map((client) => (
                <ClientCard key={client.id} client={client} />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <MockupGenerator pageName="Kanban Board" />
      </div>
    </div>
  );
}
