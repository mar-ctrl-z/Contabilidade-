# Divulga+ - Sistema de Marketing com IA

## Solução para o Problema 4 - Marketing: Divulgação Informal e Sem Dados de Clientes

### Visão Geral

O **Divulga+** é um agente de IA de marketing com catálogo digital que resolve o problema de divulgação desorganizada e falta de dados de clientes.

### Funcionalidades Implementadas

#### 1. Catálogo Digital de Produtos (`/pages/catalog/`)
- **catalog.html**: Gerenciamento de produtos com adição, edição e exclusão
- **vitrine.html**: Vitrine pública para compartilhar com clientes
- **Integração WhatsApp**: Botões de pedido direto via WhatsApp Business
- **Responsivo**: Funciona perfeitamente em desktop e mobile

#### 2. Agenda de Posts com IA (`/pages/painel/agenda.html`)
- **Calendário visual**: Visualização mensal de posts agendados
- **Criação de posts**: Formulário para criar novos posts com título, conteúdo e agendamento
- **Multi-plataforma**: Suporte para Instagram, Facebook e WhatsApp
- **Sugestões da IA**: Cards com ideias de posts geradas automaticamente
- **Status de posts**: Agendado, Publicado e Rascunho

#### 3. CRM de Clientes (`/pages/painel/crm.html`)
- **Cadastro completo**: Nome, telefone, email, cidade e segmento
- **Segmentação por cidade**: Filtro por São Paulo, Curitiba, Rio de Janeiro, etc.
- **Métricas por cliente**:
  - Ticket médio
  - Frequência de compra
  - Total gasto
- **Status automático**: Ativo, Em risco, Inativo
- **Filtros avançados**: Por cidade, frequência, ticket médio e status

#### 4. Campanhas Automáticas (`/pages/painel/campanhas.html`)
- **Campanhas de baixo giro**: Produtos com poucas vendas recebem ofertas automáticas
- **Reativação de clientes**: Campanhas automáticas para clientes inativos (60+ dias)
- **Métricas em tempo real**:
  - Alcance
  - Pedidos gerados
  - Taxa de conversão
  - Faturamento
- **Progresso visual**: Barras de progresso para metas
- **Criação guiada**: Formulário para criar novas campanhas

#### 5. Painel de Resultados (`/pages/painel/relatorios.html`)
- **KPIs principais**:
  - Alcance total
  - Pedidos gerados
  - Custo por novo cliente
  - Faturamento do mês
- **Gráficos de evolução**: Visualização de alcance e pedidos ao longo do tempo
- **Origem dos pedidos**: Instagram, WhatsApp, Facebook, Catálogo Direto
- **Performance por campanha**: Tabela detalhada com ROI
- **Exportação**: Dados disponíveis para download em JSON

### Arquitetura do Sistema

```
Contabilidade/
├── index.html                    # Página principal
├── assets/
│   ├── css/
│   │   ├── styles.css           # Estilos globais
│   │   ├── catalog.css          # Catálogo de produtos
│   │   ├── vitrine.css          # Vitrine pública
│   │   ├── crm.css              # CRM de clientes
│   │   ├── agenda-layout.css    # Agenda de posts
│   │   ├── campanhas.css        # Campanhas automáticas
│   │   ├── relatorios.css       # Painel de resultados
│   │   ├── clientes.css         # Gestão de clientes
│   │   └── chat.css             # Agente de IA
│   └── js/
│       ├── routes.js            # Rotas do sistema
│       ├── catalog.js           # Lógica do catálogo
│       ├── vitrine.js           # Lógica da vitrine
│       ├── crm.js               # Lógica do CRM
│       ├── agenda.js            # Lógica da agenda
│       ├── campanhas.js         # Lógica das campanhas
│       └── relatorios.js        # Lógica dos relatórios
└── pages/
    ├── catalog/
    │   ├── catalog.html         # Gerenciar produtos
    │   └── vitrine.html         # Vitrine pública
    └── painel/
        ├── crm.html             # CRM de clientes
        ├── agenda.html          # Agenda de posts
        ├── campanhas.html       # Campanhas automáticas
        ├── relatorios.html      # Painel de resultados
        └── chat.html            # Agente de IA
```

### Como Ajuda o Empresário no Dia a Dia

1. **Divulgação profissional**: Posts criados pela IA com calendário organizado
2. **Presença nas redes sociais**: Frequência constante de publicações (3-4 por semana)
3. **Catálogo digital**: Link próprio para compartilhar, pedidos via WhatsApp
4. **Conquista de clientes**: Campanhas automáticas para produtos e reativação
5. **Dados organizados**: CRM completo com métricas por cidade e segmento
6. **ROI mensurável**: Custo por cliente, faturamento, conversões

### Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com variáveis CSS, Grid e Flexbox
- **JavaScript Vanilla**: Funcionalidades interativas sem dependências
- **Google Fonts**: Tipografia Manrope e Plus Jakarta Sans
- **Responsivo**: Mobile-first com breakpoints para tablet e desktop

### Próximos Passos (Sugestões de Implementação)

1. **Backend**: Node.js + Express ou Python + Flask para persistência de dados
2. **Banco de dados**: PostgreSQL ou MongoDB para armazenar clientes, produtos e campanhas
3. **Integração Instagram/Facebook API**: Publicação automática de posts
4. **WhatsApp Business API**: Envio automático de mensagens para reativação
5. **Autenticação**: Sistema de login para múltiplos usuários
6. **IA Real**: Integração com OpenAI ou Claude para geração de conteúdo

### Demonstração

Para visualizar o sistema:
1. Abra `index.html` em um navegador
2. Navegue pelas seções: Catálogo, CRM Clientes, Campanhas, Agenda, Relatórios
3. Teste as funcionalidades: adicionar produtos, criar posts, filtrar clientes

---

**Desenvolvido como solução para o Problema 4 - Marketing**
**Divulga+ © 2026**
