// CRM de Clientes - Funcionalidades

document.addEventListener('DOMContentLoaded', () => {
  // Modal
  const modal = document.getElementById('client-modal');
  const newClientBtn = document.getElementById('new-client-btn');
  const closeModalBtn = modal?.querySelector('.modal-close');
  const cancelBtn = modal?.querySelector('.btn-secondary');
  const form = document.getElementById('client-form');
  
  // Filtros
  const filterCity = document.getElementById('filter-city');
  const filterFrequency = document.getElementById('filter-frequency');
  const filterTicket = document.getElementById('filter-ticket');
  const filterStatus = document.getElementById('filter-status');
  const searchInput = document.getElementById('client-search');
  const clientsGrid = document.getElementById('clients-grid');
  
  // Abrir modal
  newClientBtn?.addEventListener('click', () => {
    modal.classList.add('active');
  });
  
  // Fechar modal
  closeModalBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  cancelBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Fechar ao clicar fora
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Submeter formulário
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const city = formData.get('city');
    const phone = formData.get('phone');
    const segment = formData.get('segment');
    
    // Gerar iniciais
    const initials = name.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
    
    // Gerar cor aleatória
    const colors = ['coral', 'lime', 'purple', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Mapear cidade para nome
    const cityNames = {
      'sao-paulo': 'São Paulo, SP',
      'curitiba': 'Curitiba, PR',
      'rio-janeiro': 'Rio de Janeiro, RJ',
      'belo-horizonte': 'Belo Horizonte, MG',
      'florianopolis': 'Florianópolis, SC',
      'other': 'Outra cidade'
    };
    
    // Criar novo card de cliente
    const article = document.createElement('article');
    article.className = 'client-card';
    article.dataset.city = city;
    article.dataset.frequency = 'low';
    article.dataset.ticket = 'basic';
    article.dataset.status = 'active';
    
    article.innerHTML = `
      <div class="client-header">
        <div class="client-avatar ${randomColor}">${initials}</div>
        <span class="client-status active">Ativo</span>
      </div>
      <div class="client-info">
        <h3>${name}</h3>
        <div class="client-location">📍 ${cityNames[city] || 'Cidade não informada'}</div>
      </div>
      <div class="client-metrics">
        <div class="metric">
          <div class="metric-value">R$ 0</div>
          <div class="metric-label">Ticket Médio</div>
        </div>
        <div class="metric">
          <div class="metric-value">0x</div>
          <div class="metric-label">Freq/mês</div>
        </div>
        <div class="metric">
          <div class="metric-value">R$ 0</div>
          <div class="metric-label">Total Gasto</div>
        </div>
      </div>
      <div class="client-actions">
        <button class="btn-outline">Ver Perfil</button>
        <button class="btn-lime">✦ Campanha</button>
      </div>
    `;
    
    // Adicionar ao grid
    clientsGrid?.prepend(article);
    
    // Fechar modal e resetar
    modal.classList.remove('active');
    form.reset();
    
    // Atualizar contadores (simulação)
    updateStats();
  });
  
  // Filtros
  function applyFilters() {
    const cityValue = filterCity?.value || '';
    const frequencyValue = filterFrequency?.value || '';
    const ticketValue = filterTicket?.value || '';
    const statusValue = filterStatus?.value || '';
    const searchValue = searchInput?.value.toLowerCase() || '';
    
    const cards = clientsGrid?.querySelectorAll('.client-card') || [];
    
    cards.forEach(card => {
      const matchCity = !cityValue || card.dataset.city === cityValue;
      const matchFrequency = !frequencyValue || card.dataset.frequency === frequencyValue;
      const matchTicket = !ticketValue || card.dataset.ticket === ticketValue;
      const matchStatus = !statusValue || card.dataset.status === statusValue;
      const matchSearch = !searchValue || card.textContent.toLowerCase().includes(searchValue);
      
      card.style.display = (matchCity && matchFrequency && matchTicket && matchStatus && matchSearch) ? '' : 'none';
    });
  }
  
  filterCity?.addEventListener('change', applyFilters);
  filterFrequency?.addEventListener('change', applyFilters);
  filterTicket?.addEventListener('change', applyFilters);
  filterStatus?.addEventListener('change', applyFilters);
  
  // Busca
  let searchTimeout;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
  });
  
  // Atualizar estatísticas
  function updateStats() {
    const cards = clientsGrid?.querySelectorAll('.client-card') || [];
    const activeCards = Array.from(cards).filter(c => c.dataset.status === 'active');
    const inactiveCards = Array.from(cards).filter(c => c.dataset.status === 'inactive');
    
    // Simular atualização de estatísticas
    console.log(`Clientes ativos: ${activeCards.length}`);
    console.log(`Clientes inativos: ${inactiveCards.length}`);
  }
  
  // Botão de criar campanha de reativação
  const createReactBtn = document.getElementById('create-reactivation-btn');
  createReactBtn?.addEventListener('click', () => {
    window.location.href = '/pages/painel/campanhas.html';
  });
  
  // Ações dos cards (delegação de eventos)
  clientsGrid?.addEventListener('click', (e) => {
    const card = e.target.closest('.client-card');
    if (!card) return;
    
    // Botão de ver perfil
    if (e.target.closest('.btn-outline')) {
      console.log('Ver perfil do cliente:', card.querySelector('h3')?.textContent);
    }
    
    // Botão de campanha
    if (e.target.closest('.btn-lime')) {
      window.location.href = '/pages/painel/campanhas.html';
    }
    
    // Botão de reativar
    if (e.target.textContent.includes('Reativar')) {
      window.location.href = '/pages/painel/campanhas.html';
    }
  });
});
