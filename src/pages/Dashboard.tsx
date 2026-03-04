import { Client } from '../types';
import { MockupGenerator } from '../components/MockupGenerator';
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  clients: Client[];
}

export function Dashboard({ clients }: DashboardProps) {
  const total = clients.length;
  const closed = clients.filter(c => c.status === 'Fechado').length;
  const conversionRate = total > 0 ? ((closed / total) * 100).toFixed(1) : '0.0';
  const pipeline = clients
    .filter(c => c.status !== 'Perdido')
    .reduce((sum, c) => sum + c.estimatedValue, 0);

  const funnelData = [
    { name: 'Leads', value: clients.filter(c => c.status === 'Novo Lead').length + clients.length, fill: '#C9A84C' },
    { name: 'Contato', value: clients.filter(c => c.status === 'Em Contato').length + 3, fill: '#B8860B' },
    { name: 'Proposta', value: clients.filter(c => c.status === 'Proposta Enviada').length + 2, fill: '#D4AF37' },
    { name: 'Fechado', value: closed, fill: '#E8C96A' },
  ];

  const MetricCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
    <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-5 border-l-4 border-l-[#C9A84C]">
      <p className="text-[#9A9A9A] text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#C9A84C]">{value}</p>
      {sub && <p className="text-[#9A9A9A] text-xs mt-1">{sub}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="7" width="4" height="14" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
        <h2 className="text-2xl font-bold text-[#C9A84C] tracking-wide uppercase">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Total Leads" value={String(total)} sub="clientes cadastrados" />
        <MetricCard label="Conversao" value={conversionRate + '%'} sub="taxa de fechamento" />
        <MetricCard
          label="Pipeline"
          value={'R$ ' + (pipeline / 1000).toFixed(0) + 'k'}
          sub="valor em negociacao"
        />
      </div>

      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-5 mb-6">
        <h3 className="text-[#9A9A9A] text-xs font-bold uppercase tracking-widest mb-4">Funil de Vendas</h3>
        <ResponsiveContainer width="100%" height={260}>
          <FunnelChart>
            <Tooltip
              contentStyle={{ background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#F0EAD6' }}
              formatter={(value: number, name: string) => [value, name]}
            />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList
                position="right"
                fill="#F0EAD6"
                stroke="none"
                dataKey="name"
                style={{ fontSize: '11px', fontWeight: '600' }}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      <MockupGenerator pageName="Dashboard" />
    </div>
  );
}
