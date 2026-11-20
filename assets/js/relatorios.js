document.querySelectorAll('.chart-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.chart-tabs button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});
