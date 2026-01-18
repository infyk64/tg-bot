import { useState } from 'react';

function Habits({ user }) {
  // Тестовые данные (потом заменим на API)
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Зарядка',
      icon: '💪',
      streak: 5,
      completedToday: false,
      totalDays: 30,
      completedDays: 23
    },
    {
      id: 2,
      name: 'Читать книгу',
      icon: '📚',
      streak: 12,
      completedToday: true,
      totalDays: 30,
      completedDays: 28
    },
    {
      id: 3,
      name: 'Медитация',
      icon: '🧘',
      streak: 3,
      completedToday: false,
      totalDays: 30,
      completedDays: 15
    }
  ]);

  const handleComplete = (habitId) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          completedToday: !habit.completedToday,
          completedDays: habit.completedToday 
            ? habit.completedDays - 1 
            : habit.completedDays + 1,
          streak: habit.completedToday 
            ? habit.streak 
            : habit.streak + 1
        };
      }
      return habit;
    }));
  };

  const handleAddHabit = () => {
    // Пока просто показываем alert
    alert('Функция добавления привычки будет реализована далее!');
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="page-header">
        <h1>Привет, {user.first_name}! 👋</h1>
        <p>У тебя {habits.length} активных привычек</p>
      </div>

      {/* Список привычек */}
      {habits.length > 0 ? (
        <div className="habits-list">
          {habits.map(habit => (
            <div key={habit.id} className="habit-card">
              {/* Заголовок карточки */}
              <div className="habit-header">
                <div className="habit-title">
                  <span className="habit-icon">{habit.icon}</span>
                  {habit.name}
                </div>
                <div className="habit-streak">
                  🔥 {habit.streak} дней
                </div>
              </div>

              {/* Прогресс */}
              <div className="habit-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${(habit.completedDays / habit.totalDays) * 100}%` 
                    }}
                  />
                </div>
                <div className="progress-text">
                  {habit.completedDays} из {habit.totalDays} дней
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="habit-actions">
                <button 
                  className={habit.completedToday ? 'btn btn-secondary' : 'btn btn-success'}
                  onClick={() => handleComplete(habit.id)}
                >
                  {habit.completedToday ? '✓ Выполнено' : '◯ Отметить'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Пустое состояние */
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>Пока нет привычек</h3>
          <p>Добавь первую привычку и начни отслеживать прогресс!</p>
          <button className="btn btn-primary" onClick={handleAddHabit}>
            Добавить привычку
          </button>
        </div>
      )}

      {/* Кнопка добавления */}
      {habits.length > 0 && (
        <button className="add-habit-btn" onClick={handleAddHabit}>
          +
        </button>
      )}
    </div>
  );
}

export default Habits;