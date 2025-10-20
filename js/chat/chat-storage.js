// Файл /js/chat/chat-storage.js
class ChatStorage {
    static KEY = 'novsu_chat_state';

    static saveState(state) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(state));
            return true;
        } catch (e) {
            console.warn('Chat: save failed', e);
            return false;
        }
    }

    static loadState() {
    try {
        const raw = localStorage.getItem(this.KEY);
        if (!raw) return { history: [], unread: 0 };
        
        const parsed = JSON.parse(raw);
        return {
            history: parsed.history || [],
            unread: parsed.unread || 0
        };
    } catch (e) {
        console.warn('Chat: load failed', e);
        return { history: [], unread: 0 };
    }
}

    static saveMessage(text, sender) {
        const state = this.loadState() || { history: [], unread: 0 };
        state.history = state.history || [];
        
        state.history.push({ 
            text, 
            sender, 
            ts: Date.now(),
            id: Date.now() + Math.random().toString(36).substr(2, 9)
        });
        
        if (state.history.length > 50) {
            state.history = state.history.slice(-50);
        }
        
        return this.saveState(state);
    }

    static updateUnreadCount(count) {
        const state = this.loadState() || { history: [], unread: 0 };
        state.unread = count;
        return this.saveState(state);
    }

    static clearHistory() {
        return this.saveState({ history: [], unread: 0 });
    }

    static getUnreadCount() {
        const state = this.loadState();
        return state ? (state.unread || 0) : 0;
    }

    static getHistory() {
        const state = this.loadState();
        return state ? (state.history || []) : [];
    }
}