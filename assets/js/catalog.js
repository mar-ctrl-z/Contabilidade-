const board = document.querySelector('#products-board');
const count = document.querySelector('#product-count');
const search = document.querySelector('#product-search');
const dialog = document.querySelector('#product-dialog');
const form = document.querySelector('#product-form');

function updateCount() {
  count.textContent = board.querySelectorAll('.catalog-product').length;
}

board.addEventListener('click', event => {
  const button = event.target.closest('.delete-product');
  if (!button) return;
  button.closest('.catalog-product').remove();
  updateCount();
});

search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  board.querySelectorAll('.catalog-product').forEach(product => {
    product.hidden = !product.dataset.name.toLowerCase().includes(query);
  });
});

document.querySelector('#new-product').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name').trim();
  const category = data.get('category').trim().toUpperCase();
  const price = data.get('price').trim();
  const color = data.get('color');
  const monogram = name.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();

  const article = document.createElement('article');
  article.className = 'catalog-product';
  article.dataset.name = name;
  article.innerHTML = `<div class="catalog-product-image ${color}"><div class="product-monogram">${monogram}</div><button class="delete-product" type="button" aria-label="Excluir ${name}">×</button></div><div class="catalog-product-info"><small>${category}</small><h2>${name}</h2><strong>R$ ${price}</strong></div>`;
  board.append(article);
  updateCount();
  form.reset();
  dialog.close();
});

document.querySelectorAll('.catalog-tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.catalog-tabs button').forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
  });
});
