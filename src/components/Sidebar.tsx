import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'kanban', label: 'Kanban', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { id: 'list', label: 'Clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'form', label: 'Novo Cliente', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#141414] border-r border-[#2a2a2a] min-h-screen">
        <div className="p-5 border-b border-[#2a2a2a]">
          <h1 className="text-[#C9A84C] font-bold text-lg tracking-widest uppercase">Nexus CRM</h1>
          <p className="text-[#6b6b6b] text-xs mt-0.5">Gestao de Clientes</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-[#C9A84C] text-[#0d0d0d]'
                  : 'text-[#9A9A9A] hover:bg-[#2a2a2a] hover:text-[#F0EAD6]'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a2a2a]">
          <p className="text-[#3a3a3a] text-xs text-center">v1.0.0 &bull; Nexus</p>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414] border-t border-[#2a2a2a] flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentPage === item.id
                ? 'text-[#C9A84C]'
                : 'text-[#6b6b6b] hover:text-[#9A9A9A]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={currentPage === item.id ? 2.2 : 1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
