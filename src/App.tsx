/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Kanban } from './pages/Kanban';
import { ClientForm } from './pages/ClientForm';
import { ClientList } from './pages/ClientList';
import { Page, Client } from './types';
import { mockClients } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [clients, setClients] = useState<Client[]>(mockClients);

  const handleAddClient = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1a1a1a]">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-3 md:p-6 flex flex-col">
        {currentPage === 'dashboard' && <Dashboard clients={clients} />}
        {currentPage === 'kanban' && <Kanban clients={clients} />}
        {currentPage === 'form' && <ClientForm onAddClient={handleAddClient} />}
        {currentPage === 'list' && <ClientList clients={clients} />}
      </main>
    </div>
  );
}
