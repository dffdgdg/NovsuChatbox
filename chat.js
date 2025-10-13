const chatStyles = `
/* Анимация появления сообщений */
.message-animate {
    animation: fadeInMessage 0.4s cubic-bezier(.2,.9,.2,1);
}
@keyframes fadeInMessage {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
:root{
    --brand-blue: #0056b3;
    --brand-dark: #003d82;
    --muted: #6c757d;
    --bg: #ffffff;
    --surface: #f7f9fb;
    --border: #e6edf7;
    --radius: 12px;
    --font-family: 'PT Sans', Arial, sans-serif;
}
#chat-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    font-family: var(--font-family);
}

.chat-button {
    width: 64px;
    height: 64px;
    background: var(--brand-blue);
    border: 2px solid rgba(0,0,0,0.05);
    border-radius: 14px;
    color: white;
    font-size: 26px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(3,37,120,0.18);
    transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(3,37,120,0.22);
}

.chat-window {
    position: absolute;
    bottom: 78px;
    right: 0;
    width: 360px;
    max-width: calc(100vw - 48px);
    height: 520px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 12px 40px rgba(29,41,79,0.12);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    background: linear-gradient(90deg, var(--brand-blue), var(--brand-dark));
    color: white;
    padding: 12px 14px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.chat-header .avatar {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}

.chat-title-wrap{flex:1}
.chat-title { font-weight:700; font-size:15px; line-height:1 }
.chat-sub { font-size:12px; opacity:0.9 }

.chat-close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

.chat-messages {
    flex: 1;
    padding: 14px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: var(--surface);
}

.message-row{ display:flex; gap:8px; align-items:flex-end }
.message { max-width: 78%; padding: 10px 14px; border-radius: 12px; line-height:1.4; word-wrap:break-word; box-shadow: 0 2px 8px rgba(16,24,40,0.04); }
.message .ts{ display:block; font-size:11px; color:var(--muted); margin-top:6px; }

.message-bot{ background: #fff; color: #111; border:1px solid var(--border); border-bottom-left-radius:6px; }
.message-user{ background: var(--brand-blue); color:#fff; margin-left:auto; border-bottom-right-radius:6px; }


.message-row{ display:flex; gap:8px; align-items:flex-end }
.message-row.bot{ justify-content:flex-start }
.message-row.user{ justify-content:flex-end }

.typing-indicator{ display:none; font-style:italic; color:var(--muted); padding-left:6px }

/* Badge on chat button for unread messages */
.chat-badge{ position:absolute; top:-6px; right:-6px; min-width:18px; height:18px; padding:0 5px; background:#ee3b3b; color:#fff; font-size:11px; border-radius:12px; display:none; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.15) }

/* Quick replies (suggestion chips) */
.quick-replies{ padding:8px 12px; display:flex; gap:8px; flex-wrap:wrap; border-top:1px solid var(--border); background:var(--bg) }
.quick-replies button{ background:#eef6ff; border:1px solid #d9edff; color:var(--brand-blue); padding:6px 10px; border-radius:999px; cursor:pointer; font-size:13px }
.quick-replies button:hover{ background:#e2f0ff }

.chat-input-container{ padding:12px; border-top:1px solid var(--border); display:flex; gap:8px; align-items:center; background:var(--bg) }
.chat-input{ 
    flex:1; 
    padding:10px 12px; 
    border:1px solid #e8f0fb; 
    border-radius:999px; 
    font-size:14px;
    resize: none;
    min-height: 20px;
    max-height: 120px;
    overflow-y: auto;
    line-height: 1.4;
    font-family: inherit;
}
.chat-input:focus{ 
    outline:2px solid rgba(0,86,179,0.12); 
    border-color:var(--brand-blue) 
}
.chat-send{ 
    background:var(--brand-blue); 
    border:none; 
    color:white; 
    padding:10px 14px; 
    border-radius:999px; 
    cursor:pointer 
}
.chat-send:active{ transform:translateY(1px) }

.chat-window.open {
    display: flex;
}

@media (max-width: 600px){
    /* Чат на весь экран на мобильных */
    #chat-container{ 
        bottom: 0; 
        right: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9999;
    }

    /* Кнопка чата */
    .chat-button{ 
        width: 52px; 
        height: 52px;
        position: fixed;
        bottom: 16px;
        right: 16px;
        font-size: 22px;
    }

    /* Окно чата на весь экран */
    .chat-window{ 
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-width: none;
        border-radius: 0;
        border: none;
    }

    /* Шапка чата */
    .chat-header {
        padding: env(safe-area-inset-top) 16px 12px;
        border-radius: 0;
    }

    /* Контейнер сообщений */
    .chat-messages {
        padding: 12px;
        padding-bottom: env(safe-area-inset-bottom, 12px);
    }

    /* Сообщения */
    .message { 
        max-width: 85%; 
        padding: 12px 14px;
        font-size: 15px;
    }

    /* Контейнер ввода */
    .chat-input-container {
        position: sticky;
        bottom: 0;
        padding: 10px;
        padding-bottom: env(safe-area-inset-bottom, 10px);
        background: var(--bg);
        border-top: 1px solid var(--border);
        gap: 8px;
    }

    /* Поле ввода */
    .chat-input {
        padding: 10px;
        max-height: 100px;
        font-size: 16px; /* Предотвращает зум на iOS */
        border-radius: 20px;
    }

    /* Кнопка отправки */
    .chat-send {
        padding: 10px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    /* Быстрые ответы */
    .quick-replies {
        padding: 8px;
        gap: 6px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        white-space: nowrap;
        flex-wrap: nowrap;
    }
    .quick-replies::-webkit-scrollbar {
        display: none;
    }
    .quick-replies button {
        flex: none;
    }

    /* Индикатор печатания */
    .typing-indicator {
        margin: 0 12px;
        padding: 6px 12px;
    }

    /* Убираем ненужные элементы на мобильных */
    .resize-handle,
    .edge-handle {
        display: none;
    }
}

/* resize handle (corner) */
.resize-handle{
    position:absolute; right:6px; bottom:6px; width:24px; height:24px; cursor:nwse-resize; opacity:0.7;
    display:flex; align-items:center; justify-content:center; border-radius:6px; background:linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02));
}
.resize-handle:after{ content:''; width:10px; height:10px; border-right:2px solid rgba(0,0,0,0.18); border-bottom:2px solid rgba(0,0,0,0.18); transform:rotate(45deg); }

/* improved scrollbar for messages */
.chat-messages::-webkit-scrollbar{ width:8px }
.chat-messages::-webkit-scrollbar-thumb{ background: linear-gradient(180deg, rgba(0,86,179,0.18), rgba(0,86,179,0.12)); border-radius:8px }
.chat-messages{ scrollbar-width: thin; }

/* Индикатор печатания */
.typing-indicator {
    background: var(--surface);
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 13px;
    color: var(--muted);
    display: none;
    align-items: center;
    gap: 4px;
    margin: 0 14px;
    width: fit-content;
}

.typing-dots {
    display: inline-flex;
    gap: 3px;
    margin-left: 4px;
}

.typing-dots span {
    width: 4px;
    height: 4px;
    background: var(--muted);
    border-radius: 50%;
    animation: typingAnimation 1.4s infinite;
    opacity: 0.3;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingAnimation {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
}

/* edge handles */
.edge-handle{ position:absolute; background:transparent }
.edge-handle.left, .edge-handle.right{ top:8px; bottom:48px; width:8px; cursor:ew-resize }
.edge-handle.top, .edge-handle.bottom{ left:8px; right:8px; height:8px; cursor:ns-resize }
.edge-handle.left{ left:0 }
.edge-handle.right{ right:0 }
.edge-handle.top{ top:0 }
.edge-handle.bottom{ bottom:0 }
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = chatStyles;
document.head.appendChild(styleSheet);

// HTML для чата
const chatHTML = `
<div style="position:relative; display:inline-block">
  <button class="chat-button" aria-label="Открыть чат" onclick="toggleChat()">💬</button>
  <div class="chat-badge" id="chatBadge" aria-hidden="true">1</div>
</div>
<div class="chat-window" id="chatWindow" role="dialog" aria-label="Чат с виртуальным помощником">
    <div class="chat-header">
        <div class="chat-title-wrap">
            <div class="chat-title">Чат с ИИ НовГУ</div>
            <div class="chat-sub">Ответы по порталу и услугам</div>
        </div>
        <button class="chat-close" aria-label="Закрыть чат" onclick="toggleChat()">×</button>
    </div>
    <div class="chat-messages" id="chatMessages" aria-live="polite">
        <div class="message-row bot">
            <div class="message message-bot">
                Здравствуйте! Я виртуальный помощник НовГУ. Чем могу помочь?
                <span class="ts">сейчас</span>
            </div>
        </div>
    </div>
    <div class="typing-indicator" id="typingIndicator">
        <span>ИИ печатает</span>
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
    </div>
    <div class="quick-replies" id="quickReplies">
        <button data-suggest="Как оплатить обучение?">Как оплатить обучение?</button>
        <button data-suggest="Где найти расписание?">Где найти расписание?</button>
        <button data-suggest="Контакты приёмной комиссии">Контакты приёмной комиссии</button>
    </div>
    <div class="chat-input-container">
        <textarea class="chat-input" id="chatInput" 
            placeholder="Например: Как оплатить обучение? (Enter - отправить, Shift+Enter - новая строка)" 
            onkeydown="handleKeyPress(event)"
            rows="1"
            aria-label="Ваш вопрос"></textarea>
        <button class="chat-send" aria-label="Отправить" onclick="sendMessage()">➤</button>
    </div>
</div>
`;

// Инициализация чата
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        chatContainer.innerHTML = chatHTML;
        
        // Убедимся, что контейнер позиционирован правильно
        chatContainer.style.position = 'fixed';
        chatContainer.style.bottom = '20px';
        chatContainer.style.right = '20px';
        chatContainer.style.zIndex = '1000';

    // quick replies handler
        const qr = document.getElementById('quickReplies');
        if (qr) {
            qr.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-suggest]');
                if (btn) {
                    const val = btn.getAttribute('data-suggest');
                    const input = document.getElementById('chatInput');
                    if (input) {
                        input.value = val;
                        sendMessage();
                    }
                }
            });
        }
        // load history and unread badge
        try {
            const state = loadChatState();
            if (state && state.history && state.history.length) {
                // render saved history
                state.history.forEach(rec => renderMessageRecord(rec));
            }
            // set badge
            const badge = document.getElementById('chatBadge');
            const unread = state && state.unread ? state.unread : 0;
            if (badge) {
                if (unread && unread > 0) {
                    badge.style.display = 'flex';
                    badge.textContent = String(unread);
                } else {
                    badge.style.display = 'none';
                }
            }
        } catch (e) {
            // ignore storage errors
            console.warn('Chat: failed to load state', e);
        }
        const chatWindow = document.getElementById('chatWindow');
    }
});

// Функции чата
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const input = document.getElementById('chatInput');
    const badge = document.getElementById('chatBadge');

    if (!chatWindow) return;

    if (chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
    } else {
        chatWindow.classList.add('open');
        if (input) input.focus();
        if (badge) badge.style.display = 'none';
    }
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        // Если нажат Shift+Enter, добавляем перенос строки
        if (event.shiftKey) {
            const input = event.target;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            
            // Вставляем перенос строки в позицию курсора
            input.value = input.value.substring(0, start) + "\n" + input.value.substring(end);
            
            // Устанавливаем курсор после переноса строки
            input.selectionStart = input.selectionEnd = start + 1;
            
            // Предотвращаем стандартное поведение Enter
            event.preventDefault();
        } else {
            // Если просто Enter - отправляем сообщение
            event.preventDefault();
            sendMessage();
        }
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    // Убираем лишние переносы строк в начале и конце
    const message = input.value.replace(/^\s+|\s+$/g, '');
    
    if (message) {
        addMessage(message, 'user');
        saveMessageRecord(message, 'user');
        input.value = '';
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            // Прокрутка к индикатору
            const messagesContainer = document.getElementById('chatMessages');
            if (messagesContainer) {
                setTimeout(() => {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 100);
            }
        }

        setTimeout(() => {
            if (typingIndicator) { typingIndicator.style.display = 'none'; }
            const aiResponse = generateAIResponse(message);
            addMessage(aiResponse, 'bot');
            saveMessageRecord(aiResponse, 'bot');

            // if chat is closed, show badge
            const chatWindow = document.getElementById('chatWindow');
            const badge = document.getElementById('chatBadge');
            if (chatWindow && badge && !chatWindow.classList.contains('open')) {
                badge.style.display = 'flex';
                // increment numeric badge
                const cur = parseInt(badge.textContent || '0', 10) || 0;
                badge.textContent = String(cur + 1);
            }
        }, 1200);
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    if (messagesContainer) {
        const now = new Date();
        const ts = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        const row = document.createElement('div');
        row.className = `message-row ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = `message message-${sender} message-animate`;

        const textNode = document.createElement('div');
        textNode.innerHTML = text.replace(/\n/g, '<br>');

        const timeNode = document.createElement('span');
        timeNode.className = 'ts';
        timeNode.textContent = ts;

        bubble.appendChild(textNode);
        bubble.appendChild(timeNode);

        row.appendChild(bubble);
        messagesContainer.appendChild(row);
        // Анимация появления
        setTimeout(() => bubble.classList.remove('message-animate'), 400);
        // Автоматическая прокрутка
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // Звуковое уведомление для сообщений от бота
        if (sender === 'bot') {
            playBotSound();
        }
    }
}

// Воспроизведение звука для сообщений от бота
function playBotSound() {
    try {
        let audio = document.getElementById('chatBotAudio');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'chatBotAudio';
            audio.src = 'assets/audio/chat-bot.mp3';
            audio.preload = 'auto';
            audio.style.display = 'none';
            document.body.appendChild(audio);
        }
        audio.currentTime = 0;
        audio.play();
    } catch (e) {
        // ignore audio errors
    }
}

// Save messages to localStorage (append)
function saveMessageRecord(text, sender) {
    try {
        const state = loadChatState() || { history: [], unread: 0 };
        state.history = state.history || [];
        state.history.push({ text, sender, ts: Date.now() });
        // if bot and chat closed, increment unread
        const chatWindow = document.getElementById('chatWindow');
        const badge = document.getElementById('chatBadge');
        if (sender === 'bot' && chatWindow && !chatWindow.classList.contains('open')) {
            state.unread = (state.unread || 0) + 1;
            if (badge) { badge.style.display = 'flex'; badge.textContent = String(state.unread); }
        }
        localStorage.setItem('novsu_chat_state', JSON.stringify(state));
    } catch (e) {
        console.warn('Chat: save failed', e);
    }
}

function loadChatState() {
    try {
        const raw = localStorage.getItem('novsu_chat_state');
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function renderMessageRecord(rec) {
    if (!rec) return;
    const ts = new Date(rec.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;

    const row = document.createElement('div');
    row.className = `message-row ${rec.sender}`;
    const bubble = document.createElement('div');
    bubble.className = `message message-${rec.sender}`;
    const textNode = document.createElement('div');
    textNode.innerHTML = rec.text.replace(/\n/g, '<br>');
    const timeNode = document.createElement('span');
    timeNode.className = 'ts';
    timeNode.textContent = ts;
    bubble.appendChild(textNode);
    bubble.appendChild(timeNode);
    row.appendChild(bubble);
    messagesContainer.appendChild(row);
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // more detailed canned answers
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравств')) {
        return 'Здравствуйте! Я помогаю с информацией по порталу — например, расписание, оплата, контакты. Что хотите узнать?';
    }

    if (lowerMessage.includes('расписани') || lowerMessage.includes('расписание')) {
        return 'Расписание занятий размещено в разделе «Расписание». Если нужно — укажите факультет или группу, и я подскажу где искать.';
    }

    if (lowerMessage.includes('оплат') || lowerMessage.includes('оплата')) {
        return 'Информация об оплате обучения доступна в разделе «Оплата обучения» — там есть реквизиты, сроки и примеры платежей. Нужны реквизиты или пошаговая инструкция?';
    }

    if (lowerMessage.includes('абитуриент') || lowerMessage.includes('поступлен')) {
        return 'Раздел для абитуриентов содержит информацию о приёме, конкурсах и необходимых документах. Хотите ссылку на приёмную комиссию?';
    }

    if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон') || lowerMessage.includes('почт')) {
        return 'Контакты университета указаны в футере — e-mail приёмной комиссии, телефоны и общая почта. Могу показать ближайший телефон или e-mail по запросу.';
    }

    if (lowerMessage.includes('студент') || lowerMessage.includes('учеба')) {
        return 'Разделы «Учеба» и «Дистанционное обучение» содержат информацию для студентов: учебные планы, расписания и платформы. Уточните, пожалуйста, какую информацию ищете.';
    }

    // small keyword matches
    const quickMatches = [
        ['проживание', 'Информация по общежитиям и проживанию обычно находится в разделе студенческих сервисов.'],
        ['стипенд', 'Информация о стипендиях и выплатах размещается в разделе для студентов; там же есть контактный отдел.'],
    ];
    for (const [k, resp] of quickMatches) {
        if (lowerMessage.includes(k)) return resp;
    }

    const defaultResponses = [
        'Интересный вопрос! Рекомендую посмотреть соответствующий раздел меню. Могу подсказать ссылку при необходимости.',
        'Если у вас есть уточняющий вопрос — напишите его, и я постараюсь помочь точнее.',
        'Могу переслать вопрос в приёмную комиссию или подсказать контакт — уточните, пожалуйста.'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Экспортируем функции для глобального использования
window.toggleChat = toggleChat;
window.handleKeyPress = handleKeyPress;
window.sendMessage = sendMessage;
window.addMessage = addMessage;
window.generateAIResponse = generateAIResponse;