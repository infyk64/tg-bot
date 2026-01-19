import { useState } from 'react';
import AddHabitModal from '../components/AddHabitModal';
import HabitGrid from '../components/HabitGrid';

function Habits({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleAddHabit = (habit) => {
    setHabits(prev => [...prev, habit]);
  };

  const handleToggle = (id) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id
          ? { ...h, completedToday: !h.completedToday }
          : h
      )
    );
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Привет, {user.first_name}! 👋</h1>
        <p>У тебя {habits.length} активных привычек</p>
      </header>

      <HabitGrid habits={habits} onToggle={handleToggle} />

      <button className="add-habit-btn" onClick={() => setIsModalOpen(true)}>+</button>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
}

export default Habits;
