export type Page = 'dashboard' | 'kanban' | 'form' | 'list';

export type ClientStatus =
  | 'Novo Lead'
  | 'Em Contato'
  | 'Proposta Enviada'
  | 'Fechado'
  | 'Perdido';

export type ClientOrigin = 'WhatsApp' | 'Instagram' | 'Indicacao' | 'Site';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  origin: ClientOrigin;
  estimatedValue: number;
  notes: string;
  status: ClientStatus;
  createdAt: string;
}
