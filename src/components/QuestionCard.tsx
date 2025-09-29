interface TriviaQuestion {
  question: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface QuestionCardProps {
  question: TriviaQuestion
  selectedAnswer: number | null
  showResult: boolean
  isCorrect: boolean
  onAnswer: (answerIndex: number) => void
  onNext: () => void
}

function QuestionCard({
  question,
  selectedAnswer,
  showResult,
  isCorrect,
  onAnswer,
  onNext
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#4ade80'
      case 'medium':
        return '#fb923c'
      case 'hard':
        return '#ef4444'
      default:
        return '#64748b'
    }
  }

  const getOptionClass = (index: number) => {
    if (!showResult) return 'option'
    if (index === question.correctAnswer) return 'option correct'
    if (index === selectedAnswer && !isCorrect) return 'option incorrect'
    return 'option'
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="category">{question.category}</span>
        <span
          className="difficulty"
          style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
        >
          {question.difficulty}
        </span>
      </div>

      <h2 className="question-text">{question.question}</h2>

      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => onAnswer(index)}
            disabled={showResult}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-icon">
            {isCorrect ? '✓' : '✗'}
          </div>
          <div className="result-text">
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </div>
        </div>
      )}

      {showResult && (
        <button className="next-button" onClick={onNext}>
          Next Question
        </button>
      )}
    </div>
  )
}

export default QuestionCard