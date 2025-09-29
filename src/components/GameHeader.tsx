import { useSubscribeDev } from '@subscribe.dev/react'
import ThemeToggle from './ThemeToggle'

function GameHeader() {
  const { signOut, user, usage, subscribe, subscriptionStatus } = useSubscribeDev()

  return (
    <header className="game-header">
      <div className="header-left">
        <h1 className="game-title">🌍 Global Trivia Quiz</h1>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="usage-info">
            <span className="credits">
              {usage?.remainingCredits ?? 0} credits
            </span>
            <span className="plan">
              {subscriptionStatus?.plan?.name ?? 'Free'}
            </span>
          </div>
          <span className="user-email">{user?.email}</span>
        </div>

        <ThemeToggle />

        <button className="manage-button" onClick={subscribe!}>
          Manage Subscription
        </button>

        <button className="signout-button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </header>
  )
}

export default GameHeader