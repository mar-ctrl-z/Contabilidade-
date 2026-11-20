// Agenda de Posts - Funcionalidades

document.addEventListener('DOMContentLoaded', () => {
  // Modal
  const modal = document.getElementById('post-modal');
  const newPostBtn = document.getElementById('new-post-btn');
  const closeModalBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('post-form');
  const postsList = document.getElementById('posts-list');
  
  // Abrir modal
  newPostBtn?.addEventListener('click', () => {
    modal.classList.add('active');
  });
  
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
  
  // Submeter formulário
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const date = formData.get('date');
    const content = formData.get('content');
    const platform = formData.get('platform');
    
    // Formatar data
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const month = monthNames[dateObj.getMonth()];
    const time = dateObj.toTimeString().slice(0, 5);
    
    // Mapear plataforma
    const platformNames = {
      'instagram': 'Instagram',
      'facebook': 'Facebook',
      'whatsapp': 'WhatsApp',
      'all': 'Todas'
    };
    
    // Criar novo post
    const article = document.createElement('article');
    article.className = 'post-item';
    
    article.innerHTML = `
      <div class="post-date">
        <div class="day">${day}</div>
        <div class="month">${month}</div>
        <div class="time">${time}</div>
      </div>
      <div class="post-content">
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="post-platforms">
          <span class="platform-tag ${platform}">${platformNames[platform]}</span>
        </div>
      </div>
      <div class="post-status">
        <span class="status-badge scheduled">Agendado</span>
        <div class="post-actions">
          <button aria-label="Editar">✎</button>
          <button aria-label="Publicar agora">▶</button>
        </div>
      </div>
    `;
    
    // Adicionar à lista
    postsList?.prepend(article);
    
    // Fechar modal e resetar
    modal.classList.remove('active');
    form.reset();
    
    // Atualizar calendário
    updateCalendar();
  });
  
  // Atualizar calendário
  function updateCalendar() {
    // Simular atualização - adicionar indicador de post ao dia
    console.log('Calendário atualizado');
  }
  
  // Filtros de posts
  const filterButtons = document.querySelectorAll('.posts-filters button');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe ativo de todos
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.textContent.toLowerCase();
      const posts = postsList?.querySelectorAll('.post-item') || [];
      
      posts.forEach(post => {
        if (filter === 'todos') {
          post.style.display = '';
        } else {
          const platforms = post.querySelector('.post-platforms');
          const hasPlatform = platforms?.textContent.toLowerCase().includes(filter);
          post.style.display = hasPlatform ? '' : 'none';
        }
      });
    });
  });
  
  // Sugestões da IA
  const aiSuggestions = document.getElementById('ai-suggestions');
  aiSuggestions?.addEventListener('click', (e) => {
    if (e.target.classList.contains('ai-card-action')) {
      const card = e.target.closest('.ai-card');
      const title = card?.querySelector('h3')?.textContent || '';
      
      // Abrir modal com título preenchido
      modal.classList.add('active');
      const titleInput = document.getElementById('post-title');
      if (titleInput) {
        titleInput.value = title;
      }
    }
  });
  
  // Botão de criar posts com IA
  const aiCreateBtn = document.getElementById('ai-create-btn');
  aiCreateBtn?.addEventListener('click', () => {
    window.location.href = '/pages/painel/chat.html';
  });
  
  // Botão de sugestões IA
  const aiSuggestBtn = document.getElementById('ai-suggest-btn');
  aiSuggestBtn?.addEventListener('click', () => {
    window.location.href = '/pages/painel/chat.html';
  });
  
  // Navegação do calendário
  const calendarNav = document.querySelectorAll('.calendar-nav button');
  calendarNav.forEach(button => {
    button.addEventListener('click', () => {
      console.log('Navegar calendário');
    });
  });
  
  // Ações dos posts
  postsList?.addEventListener('click', (e) => {
    const post = e.target.closest('.post-item');
    if (!post) return;
    
    // Editar
    if (e.target.getAttribute('aria-label') === 'Editar') {
      console.log('Editar post:', post.querySelector('h3')?.textContent);
    }
    
    // Publicar agora
    if (e.target.getAttribute('aria-label') === 'Publicar agora') {
      const status = post.querySelector('.status-badge');
      if (status) {
        status.className = 'status-badge published';
        status.textContent = 'Publicado';
      }
      e.target.remove(); // Remove botão de publicar
    }
    
    // Ver métricas
    if (e.target.getAttribute('aria-label') === 'Ver métricas') {
      window.location.href = '/pages/painel/relatorios.html';
    }
    
    // Aprovar rascunho
    if (e.target.getAttribute('aria-label') === 'Aprovar') {
      const status = post.querySelector('.status-badge');
      if (status) {
        status.className = 'status-badge scheduled';
        status.textContent = 'Agendado';
      }
    }
  });
});
