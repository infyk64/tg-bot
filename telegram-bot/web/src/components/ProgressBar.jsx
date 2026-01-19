function ProgressBar({ value }) {
  return (
    <div className="progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
