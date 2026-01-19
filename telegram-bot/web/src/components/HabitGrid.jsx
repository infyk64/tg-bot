import HabitCard from './HabitCard';

function HabitGrid({ habits, onToggle }) {
  if (!habits.length) {
    return (
      <div className="empty-state">
        <h3>Пока нет привычек</h3>
        <p>Добавь первую и начни сегодня</p>
      </div>
    );
  }

  return (
    <div className="habit-grid">
      {habits.map(h => (
        <HabitCard key={h.id} habit={h} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default HabitGrid;
