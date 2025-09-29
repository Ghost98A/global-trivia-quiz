interface GameStatsProps {
  score: number
  questionsAnswered: number
  correctAnswers: number
}

function GameStats({ score, questionsAnswered, correctAnswers }: GameStatsProps) {
  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0

  return (
    <div className="game-stats">
      <div className="stat-card">
        <div className="stat-value">{score}</div>
        <div className="stat-label">Score</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{questionsAnswered}</div>
        <div className="stat-label">Questions</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{correctAnswers}</div>
        <div className="stat-label">Correct</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{accuracy}%</div>
        <div className="stat-label">Accuracy</div>
      </div>
    </div>
  )
}

export default GameStats