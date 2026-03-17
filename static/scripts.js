/* ── Navbar ─────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Tabs ───────────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Scroll reveal ──────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.exp-card, .tour-card, .test-card, .destino-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ── Auto-resize textarea ───────────────────────────────── */
const chatInput = document.getElementById('chat-input');
if (chatInput) {
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
  });
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      sendMessage(); 
    }
  });
}

/* ── Chat State ─────────────────────────────────────────── */
const chatHistory = [];

/* ── Render helpers ─────────────────────────────────────── */
function getTime() {
  return new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

function appendMsg(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const isBot = role === 'bot';
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${isBot ? '☕' : '👤'}</div>
    <div>
      <div class="msg-bubble">${text}</div>
      <div class="msg-time">${getTime()}</div>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typing-msg';
  div.innerHTML = `
    <div class="msg-avatar">☕</div>
    <div>
      <div class="msg-bubble" style="padding:0.6rem 1rem">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing-msg');
  if (t) t.remove();
}

/* ── Send message ───────────────────────────────────────── */
async function sendMessage(text) {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const userText = (text || input.value).trim();
  
  if (!userText) return;

  input.value = '';
  input.style.height = 'auto';
  if (sendBtn) sendBtn.disabled = true;

  appendMsg('user', userText);
  chatHistory.push({ role: 'user', content: userText });

  showTyping();

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    removeTyping();

    const reply = data?.response || data?.detail || data?.error || '¡Ups! Tuve un pequeño problema. ¿Puedes repetir tu pregunta?';
    
    const formatted = reply
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    appendMsg('bot', formatted);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    removeTyping();
    appendMsg('bot', '🌿 Parece que hay un problema de conexión. Por favor intenta de nuevo.');
    console.error('Error en fetch:', err);
  }

  if (sendBtn) sendBtn.disabled = false;
  const container = document.getElementById('chat-messages');
  if (container) container.scrollTop = container.scrollHeight;
}

/* ── Chips helper ───────────────────────────────────────── */
function sendChip(el) {
  sendMessage(el.textContent);
}

/* ── Inicialización de Eventos ──────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('chat-send');
  if (btn) {
    // Esto asegura que el botón envíe el mensaje al hacer clic
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sendMessage();
    });
  }
});