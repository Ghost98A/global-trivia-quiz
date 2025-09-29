import { useSubscribeDev } from '@subscribe.dev/react'
import './App.css'
import SignInScreen from './components/SignInScreen'
import TriviaGame from './components/TriviaGame'

function App() {
  const { isSignedIn } = useSubscribeDev()

  if (!isSignedIn) {
    return <SignInScreen />
  }

  return <TriviaGame />
}

export default App
