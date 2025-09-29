import { useSubscribeDev } from '@subscribe.dev/react'
import ThemeToggle from './ThemeToggle'

function SignInScreen() {
  const { signIn } = useSubscribeDev()

  return (
    <div className="signin-container">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
      <div className="signin-card">
        <h1 className="app-title">🌍 Global Trivia Quiz</h1>
        <p className="app-description">
          Test your world knowledge with AI-generated trivia questions!
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🧠</span>
            <span>AI-Generated Questions</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span>Track Your Progress</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🌐</span>
            <span>World Knowledge</span>
          </div>
        </div>
        <button className="signin-button" onClick={signIn}>
          Sign In to Start Playing
        </button>
      </div>
    </div>
  )
}

export default SignInScreen