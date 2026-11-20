// Campanhas Automáticas - Funcionalidades

document.addEventListener('DOMContentLoaded', () => {
  // Modal
  const modal = document.getElementById('campaign-modal');
  const newCampaignBtn = document.getElementById('new-campaign-btn');
  const createStockBtn = document.getElementById('create-stock-campaign');
  const createReactivationBtn = document.getElementById('create-reactivation-campaign');
  const closeModalBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('campaign-form');
  
  // Abrir modal
  newCampaignBtn?.addEventListener('click', () => {
    openModal();
  });
  
  createStockBtn?.addEventListener('click', () => {
    openModal('stock');
  });
  
  createReactivationBtn?.addEventListener('click', () => {
    openModal('reactivation');
  });
  
  function openModal(preselectedType = '') {
    modal.classList.add('active');
    if (preselectedType) {
      const typeSelect = document.getElementById('campaign-type');
      if (typeSelect) {
        typeSelect.value = preselectedType;
      }
    }
  }
  
  // Fechar modal
  closeModalBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Fechar ao clicar fora
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Cancelar
  const cancelBtn = modal?.querySelector('.btn-secondary');
  cancelBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // Submeter formulário
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const type = formData.get('type');
    const name = formData.get('name');
    const product = formData.get('product');
    const discount = formData.get('discount');
    const startDate = formData.get('start');
    const endDate = formData.get('end');
    
    console.log('Nova campanha:', {
      type,
      name,
      product,
      discount,
      startDate,
      endDate
    });
    
    // Fechar modal e resetar
    modal.classList.remove('active');
    form.reset();
    
    // Mostrar feedback (simulação)
    alert(`Campanha "${name}" criada com sucesso!`);
    
    // Recarregar página para mostrar nova campanha
    // window.location.reload();
  });
  
  // Botão de otimizar com IA
  const aiOptimizeBtn = document.getElementById('ai-optimize-btn');
  aiOptimizeBtn?.addEventListener('click', () => {
    window.location.href = '/pages/painel/chat.html';
  });
  
  // Ações das campanhas (delegação de eventos)
  const campaignsList = document.querySelector('.campaigns-list');
  campaignsList?.addEventListener('click', (e) => {
    const card = e.target.closest('.campaign-card');
    if (!card) return;
    
    const campaignName = card.querySelector('.campaign-title')?.textContent;
    
    // Pausar campanha
    if (e.target.textContent === 'Pausar') {
      const status = card.querySelector('.campaign-status');
      if (status) {
        status.className = 'campaign-status paused';
        status.textContent = 'Pausada';
      }
      e.target.textContent = 'Retomar';
      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-lime');
    }
    
    // Retomar campanha
    if (e.target.textContent === 'Retomar') {
      const status = card.querySelector('.campaign-status');
      if (status) {
        status.className = 'campaign-status active';
        status.textContent = 'Ativa';
      }
      e.target.textContent = 'Pausar';
      e.target.classList.remove('btn-lime');
      e.target.classList.add('btn-outline');
    }
    
    // Ver detalhes
    if (e.target.textContent === 'Ver Detalhes') {
      console.log('Ver detalhes da campanha:', campaignName);
      window.location.href = '/pages/painel/relatorios.html';
    }
  });
  
  // Atualizar data mínima dos campos de data
  const startInput = document.getElementById('campaign-start');
  const endInput = document.getElementById('campaign-end');
  
  if (startInput && endInput) {
    const today = new Date().toISOString().split('T')[0];
    startInput.min = today;
    endInput.min = today;
    
    startInput.addEventListener('change', () => {
      endInput.min = startInput.value;
    });
  }
  
  // Atualizar preço do produto quando selecionado
  const productSelect = document.getElementById('campaign-product');
  productSelect?.addEventListener('change', () => {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const priceMatch = selectedOption.text.match(/R\$ (\d+)/);
    console.log('Produto selecionado:', selectedOption.text);
  });
});
