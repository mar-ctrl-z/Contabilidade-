document.querySelectorAll('.view-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.view-tabs button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.approve').forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = '✓ Post aprovado';
    button.style.background = '#d7e6db';
  });
});
