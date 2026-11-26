
// Agenda de Posts - Funcionalidades

document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById('post-modal');
  const modalTitle = modal?.querySelector('.modal-header h2');
  const submitBtn = modal?.querySelector('button[type="submit"]');
  const draftBtn = modal?.querySelector('.form-actions button[type="button"]');
  const newPostBtn = document.getElementById('new-post-btn');
  const closeModalBtn = modal?.querySelector('.modal-close');
  const form = document.getElementById('post-form');
  const postsList = document.getElementById('posts-list');
  const calendarGrid = document.querySelector('.calendar-grid');

  let editingPost = null;

  // O calendário começa em novembro de 2026
  let currentCalendarDate = new Date(2026, 10, 1);

  const monthNames = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const fullMonthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const platformNames = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    all: 'Todas'
  };

  // Formata datas para o calendário e para os posts
  function formatDateParts(dateValue) {
    const dateObj = dateValue ? new Date(dateValue) : new Date();

    if (Number.isNaN(dateObj.getTime())) {
      return {
        day: 13,
        month: 'Nov',
        time: '10:00',
        isoLocal: ''
      };
    }

    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    const time = `${hours}:${minutes}`;

    const year = dateObj.getFullYear();
    const monthNum = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dayNum = String(day).padStart(2, '0');

    const isoLocal = `${year}-${monthNum}-${dayNum}T${hours}:${minutes}`;

    return { day, month, time, isoLocal };
  }

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Obtém a data completa de um post
  function getPostDate(postArticle) {
    const dateElement = postArticle.querySelector('.post-date');

    if (dateElement?.dataset.date) {
      return new Date(dateElement.dataset.date);
    }

    const day = Number(
      dateElement?.querySelector('.day')?.textContent.trim()
    );

    const monthText = dateElement?.querySelector('.month')?.textContent.trim();

    const monthIndex = monthNames.indexOf(monthText);

    if (!day || monthIndex < 0) {
      return null;
    }

    return new Date(2026, monthIndex, day);
  }

  // Abre o modal para criar um post
  function openModalForCreate(prefillTitle = '', prefillDate = '') {
    editingPost = null;

    form?.reset();

    if (modalTitle) modalTitle.textContent = 'Novo Post';
    if (submitBtn) submitBtn.textContent = 'Agendar Post';

    const titleInput = document.getElementById('post-title');
    const dateInput = document.getElementById('post-date');

    if (titleInput && prefillTitle) {
      titleInput.value = prefillTitle;
    }

    if (dateInput && prefillDate) {
      dateInput.value = prefillDate;
    }

    modal?.classList.add('active');
  }

  // Abre o modal para editar um post
  function openModalForEdit(postArticle) {
    editingPost = postArticle;

    if (modalTitle) modalTitle.textContent = 'Editar Post';
    if (submitBtn) submitBtn.textContent = 'Salvar alterações';

    const title = postArticle.querySelector('.post-content h3')?.textContent.trim() || '';
    const content = postArticle.querySelector('.post-content p')?.textContent.trim() || '';
    const timeText = postArticle.querySelector('.post-date .time')?.textContent.trim() || '10:00';
    const firstTag = postArticle.querySelector('.post-platforms .platform-tag');

    let platform = 'instagram';

    if (firstTag) {
      for (const key of Object.keys(platformNames)) {
        if (firstTag.classList.contains(key)) {
          platform = key;
          break;
        }
      }
    }

    const postDate = getPostDate(postArticle);

    const dateValue = postDate
      ? `${postDate.getFullYear()}-${String(postDate.getMonth() + 1).padStart(2, '0')}-${String(postDate.getDate()).padStart(2, '0')}T${timeText}`
      : '';

    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');
    const dateInput = document.getElementById('post-date');
    const platformInput = document.getElementById('post-platform');

    if (titleInput) titleInput.value = title;
    if (contentInput) contentInput.value = content;
    if (platformInput) platformInput.value = platform;
    if (dateInput) dateInput.value = dateValue;

    modal?.classList.add('active');
  }

  // Fecha o modal
  function closeModal() {
    modal?.classList.remove('active');
    editingPost = null;
    form?.reset();
  }

  // Marca os dias que possuem posts no mês exibido
  function syncCalendarWithPosts() {
    if (!calendarGrid || !postsList) return;

    const activeDates = new Set();

    postsList.querySelectorAll('.post-item').forEach(post => {
      const date = getPostDate(post);

      if (date) {
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        activeDates.add(key);
      }
    });

    calendarGrid.querySelectorAll('.calendar-day:not(.other-month)').forEach(cell => {
      const day = Number(cell.dataset.day);

      const key = `${currentCalendarDate.getFullYear()}-${currentCalendarDate.getMonth()}-${day}`;

      cell.classList.toggle('has-post', activeDates.has(key));
    });
  }

  // Monta o HTML dos botões de ação
  function buildActionsHtml(statusType) {
    if (statusType === 'published') {
      return `<button type="button" aria-label="Ver métricas">📊</button>`;
    }

    if (statusType === 'draft') {
      return `
        <button type="button" aria-label="Editar">✎</button>
        <button type="button" aria-label="Aprovar">✓</button>
      `;
    }

    return `
      <button type="button" aria-label="Editar">✎</button>
      <button type="button" aria-label="Publicar agora">▶</button>
    `;
  }

  // Monta o conteúdo de um post
  function buildPostInnerHtml({
    title,
    content,
    date,
    platform,
    statusType = 'scheduled',
    statusLabel = 'Agendado'
  }) {
    const { day, month, time, isoLocal } = formatDateParts(date);

    const safeTitle = escapeHtml(title);
    const safeContent = escapeHtml(content);

    const safePlatform = Object.prototype.hasOwnProperty.call(platformNames, platform)
      ? platform
      : 'instagram';

    const platformLabel = platformNames[safePlatform];

    return `
      <div class="post-date" data-date="${isoLocal}">
        <div class="day">${day}</div>
        <div class="month">${month}</div>
        <div class="time">${time}</div>
      </div>

      <div class="post-content">
        <h3>${safeTitle}</h3>
        <p>${safeContent}</p>
        <div class="post-platforms">
          <span class="platform-tag ${safePlatform}">${platformLabel}</span>
        </div>
      </div>

      <div class="post-status">
        <span class="status-badge ${statusType}">${statusLabel}</span>
        <div class="post-actions">
          ${buildActionsHtml(statusType)}
        </div>
      </div>
    `;
  }

  // Salva ou atualiza um post
  function savePostFromForm(statusType = 'scheduled', statusLabel = 'Agendado') {
    if (!form) return;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const title = String(formData.get('title') || '').trim();
    const date = String(formData.get('date') || '');
    const content = String(formData.get('content') || '').trim();
    const platform = String(formData.get('platform') || 'instagram');

    const postData = {
      title,
      content,
      date,
      platform,
      statusType,
      statusLabel
    };

    if (editingPost) {
      editingPost.innerHTML = buildPostInnerHtml(postData);
    } else {
      const article = document.createElement('article');

      article.className = 'post-item';
      article.innerHTML = buildPostInnerHtml(postData);

      postsList?.prepend(article);
    }

    renderCalendar();
    closeModal();
  }

  // Renderiza os dias do mês selecionado
  function renderCalendar() {
    if (!calendarGrid) return;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const title = document.querySelector('.calendar-header h3');

    if (title) {
      title.textContent = `${fullMonthNames[month]} ${year}`;
    }

    // Remove somente os dias, preservando DOM, SEG, TER etc.
    calendarGrid.querySelectorAll('.calendar-day').forEach(day => {
      day.remove();
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = document.createElement('div');

      cell.className = 'calendar-day other-month';
      cell.textContent = daysInPreviousMonth - i;

      calendarGrid.appendChild(cell);
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');

      cell.className = 'calendar-day';
      cell.textContent = day;
      cell.dataset.day = day;

      const today = new Date();

      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        cell.classList.add('today');
      }

      calendarGrid.appendChild(cell);
    }

    // Completa a última semana
    const totalCells = firstDay + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;

    for (let day = 1; day <= remainingCells; day++) {
      const cell = document.createElement('div');

      cell.className = 'calendar-day other-month';
      cell.textContent = day;

      calendarGrid.appendChild(cell);
    }

    syncCalendarWithPosts();
  }

  // Navegação entre os meses
  const previousMonthBtn = document.querySelector(
    '.calendar-nav button[aria-label="Mês anterior"]'
  );

  const nextMonthBtn = document.querySelector(
    '.calendar-nav button[aria-label="Próximo mês"]'
  );

  previousMonthBtn?.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn?.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });

  // Abrir e fechar modal
  newPostBtn?.addEventListener('click', () => openModalForCreate());

  closeModalBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Submeter formulário
  form?.addEventListener('submit', e => {
    e.preventDefault();
    savePostFromForm('scheduled', 'Agendado');
  });

  // Salvar rascunho
  draftBtn?.addEventListener('click', () => {
    savePostFromForm('draft', 'Rascunho');
  });

  // Clicar em um dia abre o modal com a data selecionada
  calendarGrid?.addEventListener('click', e => {
    const dayCell = e.target.closest('.calendar-day:not(.other-month)');

    if (!dayCell) return;

    const dayNum = String(Number(dayCell.dataset.day)).padStart(2, '0');

    const year = currentCalendarDate.getFullYear();
    const month = String(currentCalendarDate.getMonth() + 1).padStart(2, '0');

    openModalForCreate('', `${year}-${month}-${dayNum}T10:00`);
  });

  // Filtros de posts
  const filterButtons = document.querySelectorAll('.posts-filters button');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      const filter = button.textContent.trim().toLowerCase();
      const posts = postsList?.querySelectorAll('.post-item') || [];

      posts.forEach(post => {
        if (filter === 'todos') {
          post.style.display = '';
          return;
        }

        const tags = Array.from(
          post.querySelectorAll('.post-platforms .platform-tag')
        ).map(el => el.textContent.trim().toLowerCase());

        const matches = tags.includes(filter) || tags.includes('todas');

        post.style.display = matches ? '' : 'none';
      });
    });
  });

  // Sugestões da IA
  const aiSuggestions = document.getElementById('ai-suggestions');

  aiSuggestions?.addEventListener('click', e => {
    const actionBtn = e.target.closest('.ai-card-action');

    if (!actionBtn) return;

    const card = actionBtn.closest('.ai-card');
    const title = card?.querySelector('h3')?.textContent.trim() || '';

    openModalForCreate(title);
  });

  // Botões de IA
  document.getElementById('ai-create-btn')?.addEventListener('click', () => {
    window.location.href = '/pages/painel/chat.html';
  });

  document.getElementById('ai-suggest-btn')?.addEventListener('click', () => {
    window.location.href = '/pages/painel/chat.html';
  });

  // Ações da lista de posts
  postsList?.addEventListener('click', e => {
    const actionBtn = e.target.closest('button');
    const post = e.target.closest('.post-item');

    if (!actionBtn || !post) return;

    const label = actionBtn.getAttribute('aria-label');

    if (label === 'Editar') {
      openModalForEdit(post);

    } else if (label === 'Publicar agora') {
      const status = post.querySelector('.status-badge');

      if (status) {
        status.className = 'status-badge published';
        status.textContent = 'Publicado';
      }

      const actionsContainer = post.querySelector('.post-actions');

      if (actionsContainer) {
        actionsContainer.innerHTML = buildActionsHtml('published');
      }

    } else if (label === 'Ver métricas') {
      window.location.href = '/pages/painel/relatorios.html';

    } else if (label === 'Aprovar') {
      const status = post.querySelector('.status-badge');

      if (status) {
        status.className = 'status-badge scheduled';
        status.textContent = 'Agendado';
      }

      const actionsContainer = post.querySelector('.post-actions');

      if (actionsContainer) {
        actionsContainer.innerHTML = buildActionsHtml('scheduled');
      }
    }
  });

  // Inicializa o calendário em novembro de 2026
  renderCalendar();

});
