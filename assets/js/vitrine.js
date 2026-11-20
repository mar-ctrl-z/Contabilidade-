document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const product = encodeURIComponent(button.dataset.product);
    const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${button.dataset.product}`);
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer');
  });
});
