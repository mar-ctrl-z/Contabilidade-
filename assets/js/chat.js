const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');
const messages = document.querySelector('#messages');
const content = document.querySelector('#chat-content');

function sendMessage(text) {
  const prompt = text.trim();
  if (!prompt) return;

  const user = document.createElement('div');
  user.className = 'message user';
  user.textContent = prompt;
  messages.append(user);

  window.setTimeout(() => {
    const bot = document.createElement('div');
    bot.className = 'message bot';
    bot.textContent = `Ótimo! Vamos trabalhar com “${prompt}”. Me conte o nome do seu negócio e o que você quer divulgar.`;
    messages.append(bot);
    content.scrollTop = content.scrollHeight;
  }, 350);

  content.scrollTop = content.scrollHeight;
}

form.addEventListener('submit', event => {
  event.preventEvent?.();
  event.preventDefault();
  sendMessage(input.value);
  input.value = '';
});

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => sendMessage(button.dataset.prompt));
});
