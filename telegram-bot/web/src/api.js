export function getTelegramUser() {
    if (!window.Telegram || !window.Telegram.WebApp) {
        return null;
    }
    const tg = window.Telegram.WebApp;
    tg.ready();
    return tg.initDataUnsafe?.user || null;
}

export function getUserId() {
    const user = getTelegramUser();
    return user ? user.id : null;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function apiGet(path) {
    const userId = getUserId();
    const res = await fetch(`${API_URL}${path}`, { 
        headers: {
            'x-telegram-user-id': userId
        }
    });
    return res.json();
}