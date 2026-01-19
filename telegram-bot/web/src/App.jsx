import { useState, useEffect } from 'react';
import Habits from './pages/Habits';
import Stats from './pages/Stats';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('habits');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      
      // Настройка темы
      document.body.style.backgroundColor = tg.backgroundColor || '#fff';
      
      const initData = tg.initDataUnsafe;
      
      // ОТЛАДКА
      console.log('Telegram WebApp:', tg);
      console.log('initDataUnsafe:', initData);
      console.log('User:', initData?.user);
      
      if (initData?.user) {
        setUser(initData.user);
      } else {
        // ВРЕМЕННО: для тестирования UI
        console.warn('initDataUnsafe пустой, используем тестового пользователя');
        setUser({ 
          id: 123456789, 
          first_name: 'Test User',
          username: 'testuser' 
        });
      }
    } else {
      console.log('Telegram WebApp не найден');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial'
      }}>
        Загрузка...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        padding: 20, 
        textAlign: 'center',
        fontFamily: 'Arial'
      }}>
        <h2>⚠️ Открой через Telegram бота</h2>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Навигация */}
      <nav className="nav">
        <button 
          className={currentPage === 'habits' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setCurrentPage('habits')}
        >
          📋 Привычки
        </button>
        <button 
          className={currentPage === 'stats' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setCurrentPage('stats')}
        >
          📊 Статистика
        </button>
      </nav>

      {/* Контент */}
      <main className="content">
        {currentPage === 'habits' ? (
          <Habits user={user} />
        ) : (
          <Stats user={user} />
        )}
      </main>
    </div>
  );
}

export default App;