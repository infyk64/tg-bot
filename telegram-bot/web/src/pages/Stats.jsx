function Stats({ user }) {
  // Тестовые данные статистики
  const stats = {
    totalHabits: 3,
    completedToday: 1,
    totalStreak: 20,
    completionRate: 77
  };

  const recentActivity = [
    { date: '18 янв', completed: 2, total: 3 },
    { date: '17 янв', completed: 3, total: 3 },
    { date: '16 янв', completed: 1, total: 3 },
    { date: '15 янв', completed: 3, total: 3 },
    { date: '14 янв', completed: 2, total: 3 },
    { date: '13 янв', completed: 3, total: 3 },
    { date: '12 янв', completed: 2, total: 3 }
  ];

  return (
    <div>
      {/* Заголовок */}
      <div className="page-header">
        <h1>📊 Статистика</h1>
        <p>Твой прогресс за последнее время</p>
      </div>

      {/* Карточки статистики */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalHabits}</div>
          <div className="stat-label">Привычек</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.completedToday}</div>
          <div className="stat-label">Сегодня</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.totalStreak}</div>
          <div className="stat-label">Общий streak</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-label">Выполнено</div>
        </div>
      </div>

      {/* Активность за неделю */}
      <div className="habit-card" style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 16, fontSize: 18 }}>
          📅 Активность за неделю
        </h3>
        
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 120
        }}>
          {recentActivity.map((day, index) => {
            const percentage = (day.completed / day.total) * 100;
            return (
              <div 
                key={index}
                style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${percentage}px`,
                    maxHeight: 80,
                    background: percentage === 100 
                      ? 'linear-gradient(180deg, #00b894, #00cec9)'
                      : percentage >= 50
                      ? 'linear-gradient(180deg, #fdcb6e, #e17055)'
                      : '#dfe6e9',
                    borderRadius: 4,
                    transition: 'all 0.3s'
                  }}
                  title={`${day.completed}/${day.total}`}
                />
                <div style={{ 
                  fontSize: 11, 
                  color: '#666',
                  whiteSpace: 'nowrap'
                }}>
                  {day.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Мотивационное сообщение */}
      <div className="habit-card" style={{ marginTop: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
        <h3 style={{ marginBottom: 8 }}>Отличная работа!</h3>
        <p style={{ color: '#666', fontSize: 14 }}>
          Продолжай в том же духе, {user.first_name}!
          <br />
          Ты на правильном пути к своим целям.
        </p>
      </div>
    </div>
  );
}

export default Stats;