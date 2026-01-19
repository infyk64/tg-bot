import ProgressBar from './ProgressBar';

function HabitCard({ habit, onToggle }) {
  const percent = Math.round((habit.completedDays / habit.totalDays) * 100);

  return (
    <div className="habit-card">
      <div className="habit-header">
        <div className="habit-title">
          <span>{habit.icon}</span>
          <strong>{habit.name}</strong>
        </div>
        <span className="habit-streak">🔥 {habit.streak}</span>
      </div>

      <ProgressBar value={percent} />

      <div className="progress-text">
        {habit.completedDays} из {habit.totalDays} дней
      </div>

      <button
        className={habit.completedToday ? 'btn btn-secondary' : 'btn btn-success'}
        onClick={() => onToggle(habit.id)}
      >
        {habit.completedToday ? '✓ Выполнено' : '◯ Отметить'}
      </button>
    </div>
  );
}

export default HabitCard;
