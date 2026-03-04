# Nexus CRM

> CRM elegante com paleta Ouro & Cinza Chumbo — design premium, mobile-first, gerado com Gemini AI no Google AI Studio.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-Apache--2.0-green)

## Demonstracao

Acesse o app ao vivo no Google AI Studio:
https://aistudio.google.com/apps/0977b7aa-c0cc-47ce-b0a3-2a6f1529d8b5

## Funcionalidades

- **Dashboard** — cards de metricas (Total Leads, Conversao, Pipeline), grafico de funil interativo com Recharts
- **Kanban Board** — colunas: Novo Lead / Em Contato / Proposta Enviada / Fechado / Perdido, com sistema de abas no mobile
- **Novo Cliente** — formulario com validacao, campo Origem como select (WhatsApp / Instagram / Indicacao / Site), toast de sucesso
- **Lista de Clientes** — busca em tempo real, cards responsivos no mobile
- **Gerar Mockup com IA** — integrado ao Gemini (Nano Banana) para gerar mockups visuais de cada tela
- **Estado compartilhado** — clientes adicionados aparecem em todas as paginas instantaneamente

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| Gold | `#C9A84C` | Cor primaria, botoes, destaques |
| Gold Light | `#E8C96A` | Secundaria, hover |
| Lead Dark | `#1a1a1a` | Background principal |
| Lead | `#2a2a2a` | Cards e paineis |
| Lead Mid | `#212121` | Sidebar/nav |
| Cream | `#F0EAD6` | Texto principal |
| Gray | `#9A9A9A` | Texto secundario |

## Stack Tecnologica

- **React 18** + **TypeScript**
- **Tailwind CSS** (utility-first, mobile-first)
- **Vite** (bundler)
- **Recharts** (graficos)
- **lucide-react** (icones SVG profissionais)
- **Gemini 3.1 Pro Preview** (gerado no Google AI Studio)

## Como Rodar Localmente

```bash
# Clone o repositorio
git clone https://github.com/FalAiquoc/nexus-crm.git
cd nexus-crm

# Instale as dependencias
npm install

# Configure as variaveis de ambiente
cp .env.example .env
# Adicione sua GOOGLE_API_KEY no .env

# Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
src/
  App.tsx                  # Roteamento e estado global de clientes
  data.ts                  # Mock data de clientes
  types.ts                 # Interfaces TypeScript
  index.css                # Estilos globais e variaveis CSS
  components/
    Sidebar.tsx            # Navegacao lateral (desktop) + bottom nav (mobile)
    MockupGenerator.tsx    # Integracao com Gemini AI para mockups
  pages/
    Dashboard.tsx          # Cards de metricas + FunnelChart
    Kanban.tsx             # Board com abas mobile + scroll desktop
    ClientForm.tsx         # Formulario de novo cliente com toast
    ClientList.tsx         # Lista com busca real-time
```

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| Mobile (< 768px) | Bottom navigation bar, cards empilhados, Kanban em abas |
| Tablet (768-1023px) | Sidebar lateral compacta, 2 colunas |
| Desktop (>= 1024px) | Sidebar completa, Kanban horizontal com scroll |

## Bugs Corrigidos

- Kanban sem cards (mismatch de estado/filtro) — refatorado completamente
- Labels do funil truncadas — margem e fonte ajustadas
- Busca nao era real-time — onChange implementado
- Salvar cliente sem feedback — toast + estado global
- Campo Origem era input livre — convertido para select
- Emojis fofos removidos — substituidos por icones lucide profissionais

## Licenca

Apache 2.0 — veja [LICENSE](LICENSE) para detalhes.

---

Feito com Gemini 3.1 Pro Preview no Google AI Studio.
