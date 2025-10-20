// Файл /js/chat/chat-core.js
class ChatCore {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createChatHTML();
        this.bindEvents();
        this.loadHistory();
    }

    createChatHTML() {
        const chatHTML = `
            <button class="chat-button">
                💬
                <div class="chat-badge" id="chatBadge"></div>
            </button>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-title-wrap">
                        <div class="chat-title">Чат с ИИ НовГУ</div>
                        <div class="chat-sub">Помощь по порталу</div>
                    </div>
                    <button class="chat-close">×</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message">Начало диалога</div>
                    <div class="message-row bot">
                        <div class="message message-bot">
                            Здравствуйте! Я помогу найти информацию на портале НовГУ.
                            <span class="ts">только что</span>
                        </div>
                    </div>
                </div>
                <div class="typing-indicator" id="typingIndicator">
                    <span>Помощник печатает</span>
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div class="quick-replies" id="quickReplies"></div>
                <div class="chat-input-container">
                    <textarea class="chat-input" id="chatInput" placeholder="Ваш вопрос..."></textarea>
                    <button class="chat-send">➤</button>
                </div>
            </div>
        `;

        document.getElementById('chat-container').innerHTML = chatHTML;
        this.renderQuickReplies();
    }

    renderQuickReplies() {
        const quickReplies = document.getElementById('quickReplies');
        const replies = ChatAI.getQuickReplies();
        
        quickReplies.innerHTML = replies.map(reply => 
            `<button data-suggest="${reply.suggest}">${reply.text}</button>`
        ).join('');
    }

    bindEvents() {
        // Toggle chat
        document.querySelector('.chat-button').addEventListener('click', () => this.toggle());
        document.querySelector('.chat-close').addEventListener('click', () => this.toggle());

        // Send message
        document.querySelector('.chat-send').addEventListener('click', () => this.sendMessage());
        
        // Quick replies
        document.getElementById('quickReplies').addEventListener('click', (e) => {
            const btn = e.target.closest('button[data-suggest]');
            if (btn) {
                document.getElementById('chatInput').value = btn.getAttribute('data-suggest');
                this.sendMessage();
            }
        });

        // Input handling
        const input = document.getElementById('chatInput');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    toggle() {
        const chatWindow = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            chatWindow.classList.add('open');
            document.getElementById('chatInput').focus();
            this.hideBadge();
        } else {
            chatWindow.classList.remove('open');
        }
    }

    sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    try {
        this.addMessage(message, 'user');
        ChatStorage.saveMessage(message, 'user');
        input.value = '';
        
        this.showTyping();
        
        setTimeout(() => {
            try {
                this.hideTyping();
                const response = ChatAI.generateResponse(message);
                this.addMessage(response, 'bot');
                ChatStorage.saveMessage(response, 'bot');
                this.updateUnreadBadge();
            } catch (error) {
                console.error('Error generating response:', error);
                this.addMessage('Извините, произошла ошибка. Попробуйте позже.', 'bot');
            }
        }, 1000 + Math.random() * 1000); 
        
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const ts = new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

        const row = document.createElement('div');
        row.className = `message-row ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = `message message-${sender}`;

        const textNode = document.createElement('div');
        textNode.innerHTML = text.replace(/\n/g, '<br>');

        const timeNode = document.createElement('span');
        timeNode.className = 'ts';
        timeNode.textContent = ts;

        bubble.appendChild(textNode);
        bubble.appendChild(timeNode);
        row.appendChild(bubble);
        messagesContainer.appendChild(row);
        
        this.scrollToBottom();
    }

    showTyping() {
        document.getElementById('typingIndicator').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        document.getElementById('typingIndicator').style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    updateUnreadBadge() {
        if (!this.isOpen) {
            const badge = document.getElementById('chatBadge');
            const currentCount = parseInt(badge.textContent || '0', 10) || 0;
            const newCount = currentCount + 1;
            badge.textContent = newCount > 9 ? '9+' : String(newCount);
            badge.style.display = 'flex';
            ChatStorage.updateUnreadCount(newCount);
        }
    }

    hideBadge() {
        const badge = document.getElementById('chatBadge');
        badge.style.display = 'none';
        ChatStorage.updateUnreadCount(0);
    }

    loadHistory() {
        const history = ChatStorage.getHistory();
        if (history.length > 0) {
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.innerHTML = '<div class="welcome-message">История диалога</div>';
            
            history.forEach(rec => {
                this.addMessage(rec.text, rec.sender);
            });
            
            const unreadCount = ChatStorage.getUnreadCount();
            if (unreadCount > 0) {
                const badge = document.getElementById('chatBadge');
                badge.textContent = unreadCount > 9 ? '9+' : String(unreadCount);
                badge.style.display = 'flex';
            }
        }
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', function() {
    window.chat = new ChatCore();
});