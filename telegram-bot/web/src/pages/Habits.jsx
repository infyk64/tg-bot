import { useState, useEffect } from 'react';
import AddHabitModal from '../components/AddHabitModal';

function Habits({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  // Ключ для localStorage (уникальный для каждого пользователя)
  const STORAGE_KEY = `habits_${user.id}`;

  // Загрузка привычек из localStorage при монтировании
  useEffect(() => {
    const savedHabits = localStorage.getItem(STORAGE_KEY);
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Тестовые данные только для первого запуска
      const defaultHabits = [
        {
          id: 1,
          name: 'Зарядка',
          icon: '💪',
          streak: 5,
          completedToday: false,
          totalDays: 30,
          completedDays: 23,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Читать книгу',
          icon: '📚',
          streak: 12,
          completedToday: true,
          totalDays: 30,
          completedDays: 28,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Медитация',
          icon: '🧘',
          streak: 3,
          completedToday: false,
          totalDays: 30,
          completedDays: 15,
          createdAt: new Date().toISOString()
        }
      ];
      setHabits(defaultHabits);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHabits));
    }
  }, [STORAGE_KEY]);

  // Сохранение привычек в localStorage при любом изменении
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, STORAGE_KEY]);

  const handleAddHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  const handleDeleteHabit = (habitId) => {
    if (confirm('Удалить эту привычку?')) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  style={{ flex: 2 }}
                >
                  {habit.completedToday ? '✓ Выполнено' : '◯ Отметить'}
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => handleDeleteHabit(habit.id)}
                  style={{ flex: 0, minWidth: '44px', padding: '12px' }}
                >
                  🗑️
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
          <button className="btn btn-primary" onClick={handleOpenModal}>
            Добавить привычку
          </button>
        </div>
      )}

      {/* Кнопка добавления */}
      {habits.length > 0 && (
        <button className="add-habit-btn" onClick={handleOpenModal}>
          +
        </button>
      )}

      {/* Модальное окно */}
      <AddHabitModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddHabit}
      />
    </div>
  );
}

export default Habits;