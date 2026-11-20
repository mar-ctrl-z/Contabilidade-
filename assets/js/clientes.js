const search = document.querySelector('#client-search');
const rows = [...document.querySelectorAll('#client-rows tr')];
const filters = document.querySelectorAll('.filters button');

search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  rows.forEach(row => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
});

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const filter = button.dataset.filter;
    rows.forEach(row => {
      row.hidden = filter !== 'todos' && row.dataset.category !== filter;
    });
  });
});
