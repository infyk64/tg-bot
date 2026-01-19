import { useState } from 'react';

function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('⭐');

  const icons = ['💪', '📚', '🧘', '🏃', '💧', '🥗', '😴', '🎯', '✍️', '🎨', '🎵', '🧠', '⭐', '🔥', '💼', '📱'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Введите название привычки');
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      icon: selectedIcon,
      streak: 0,
      completedToday: false,
      totalDays: 30,
      completedDays: 0,
      createdAt: new Date().toISOString()
    };

    onAdd(newHabit);
    
    // Очистка формы
    setName('');
    setSelectedIcon('⭐');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Новая привычка</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Название */}
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Зарядка"
              maxLength={30}
              autoFocus
            />
          </div>

          {/* Выбор иконки */}
          <div className="form-group">
            <label>Иконка</label>
            <div className="icon-grid">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={`icon-btn ${selectedIcon === icon ? 'selected' : ''}`}
                  onClick={() => setSelectedIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопки */}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;