// Relatórios Detalhados - Funcionalidades

document.addEventListener('DOMContentLoaded', () => {
  // Filtros de período
  const periodFilters = document.querySelectorAll('.chart-filters button');
  periodFilters.forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.parentElement;
      parent.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const period = button.textContent;
      console.log('Período selecionado:', period);
      
      // Simular atualização de dados
      updateCharts(period);
    });
  });
  
  // Atualizar gráficos (simulação)
  function updateCharts(period) {
    const bars = document.querySelectorAll('.chart-bar');
    const randomHeights = [45, 60, 40, 75, 55, 85, 70];
    
    bars.forEach((bar, index) => {
      const newHeight = randomHeights[index % randomHeights.length] + Math.random() * 20;
      bar.style.height = `${newHeight}%`;
    });
    
    console.log(`Gráficos atualizados para período: ${period}`);
  }
  
  // Exportar relatório
  const exportBtn = document.querySelector('.btn-lime');
  exportBtn?.addEventListener('click', () => {
    // Simular exportação
    const data = {
      periodo: 'Novembro 2026',
      alcanceTotal: '45.2K',
      pedidosGerados: 384,
      custoPorCliente: 'R$ 8,40',
      faturamento: 'R$ 12.450',
      campanhas: [
        { nome: 'Black Friday 2026', alcance: '12.4K', pedidos: 156 },
        { nome: 'Produto Baixo Giro - Ecobag', alcance: '3.2K', pedidos: 67 },
        { nome: 'Reativação Clientes SP', alcance: '2.1K', pedidos: 42 },
        { nome: 'Lançamento Camiseta Solar', alcance: '8.7K', pedidos: 89 }
      ]
    };
    
    // Criar JSON para download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-divulga-novembro-2026.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('Relatório exportado');
  });
  
  // Atualizar dados
  const refreshBtn = document.querySelector('.btn-secondary');
  refreshBtn?.addEventListener('click', () => {
    // Simular atualização
    const kpiValues = document.querySelectorAll('.kpi-value');
    const trends = ['up', 'down'];
    
    kpiValues.forEach((kpi, index) => {
      // Animação de loading
      kpi.style.opacity = '0.5';
      setTimeout(() => {
        kpi.style.opacity = '1';
      }, 500);
    });
    
    console.log('Dados atualizados');
  });
  
  // Hover nos KPIs
  const kpiCards = document.querySelectorAll('.kpi-card');
  kpiCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.08)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
  
  // Tooltip nas barras do gráfico
  const chartBars = document.querySelectorAll('.chart-bar');
  chartBars.forEach((bar, index) => {
    bar.style.cursor = 'pointer';
    bar.title = `Dia ${index + 1}: ${Math.round(Math.random() * 100)}% de alcance`;
  });
  
  // Animação de entrada
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.kpi-card, .chart-card, .campaigns-performance');
    
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      
      if (isVisible) {
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  };
  
  // Inicializar com opacidade 0
  document.querySelectorAll('.kpi-card, .chart-card, .campaigns-performance').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
  });
  
  // Executar animação
  setTimeout(animateOnScroll, 100);
  window.addEventListener('scroll', animateOnScroll);
});
