import { useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'
import GameHeader from './GameHeader'
import QuestionCard from './QuestionCard'
import GameStats from './GameStats'

interface TriviaQuestion {
  question: string
  options: string[]
  correctAnswer: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface GameState {
  score: number
  questionsAnswered: number
  correctAnswers: number
  lastPlayedAt?: number
}

function TriviaGame() {
  const { client, useStorage } = useSubscribeDev()
  const [gameState, setGameState] = useStorage<GameState>('trivia-game-state', {
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0
  })

  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const categories = [
    'Geography', 'History', 'Science', 'Arts & Culture',
    'Sports', 'Technology', 'Nature', 'General Knowledge'
  ]

  const generateQuestion = async (category?: string) => {
    if (!client) return

    setLoading(true)
    setError(null)
    setSelectedAnswer(null)
    setShowResult(false)

    try {
      const selectedCategory = category || categories[Math.floor(Math.random() * categories.length)]

      const { output } = await client.run('openai/gpt-4o', {
        input: {
          messages: [
            {
              role: 'system',
              content: `You are a trivia question generator. Generate diverse, interesting trivia questions about world knowledge.`
            },
            {
              role: 'user',
              content: `Generate a multiple choice trivia question about ${selectedCategory}. Return JSON only.`
            }
          ]
        },
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'TriviaQuestion',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                question: { type: 'string' },
                options: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 4,
                  maxItems: 4
                },
                correctAnswer: { type: 'integer' },
                category: { type: 'string' },
                difficulty: {
                  type: 'string',
                  enum: ['easy', 'medium', 'hard']
                }
              },
              required: ['question', 'options', 'correctAnswer', 'category', 'difficulty'],
              additionalProperties: false
            }
          }
        }
      })

      const question = output[0] as TriviaQuestion
      setCurrentQuestion(question)
    } catch (err: any) {
      console.error('Failed to generate question:', err)
      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your subscription.')
      } else if (err.type === 'rate_limit_exceeded') {
        setError(`Rate limit exceeded. Please wait ${Math.ceil((err.retryAfter || 0) / 1000)} seconds.`)
      } else {
        setError('Failed to generate question. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (answerIndex: number) => {
    if (!currentQuestion || showResult) return

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    const points = correct ? (currentQuestion.difficulty === 'hard' ? 30 : currentQuestion.difficulty === 'medium' ? 20 : 10) : 0

    setGameState({
      score: gameState.score + points,
      questionsAnswered: gameState.questionsAnswered + 1,
      correctAnswers: gameState.correctAnswers + (correct ? 1 : 0),
      lastPlayedAt: Date.now()
    })
  }

  const handleNextQuestion = () => {
    generateQuestion()
  }

  return (
    <div className="game-container">
      <GameHeader />

      <div className="game-content">
        <GameStats
          score={gameState.score}
          questionsAnswered={gameState.questionsAnswered}
          correctAnswers={gameState.correctAnswers}
        />

        {!currentQuestion && !loading && (
          <div className="start-screen">
            <h2>Ready to Test Your Knowledge?</h2>
            <p>Select a category or get a random question</p>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  key={category}
                  className="category-button"
                  onClick={() => generateQuestion(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="random-button" onClick={() => generateQuestion()}>
              Random Question
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Generating your trivia question...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        {currentQuestion && !loading && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            isCorrect={isCorrect}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </div>
  )
}

export default TriviaGame