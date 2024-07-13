import Typing from '@/components/typing/Typing'
import styles from './typingPage.module.css'
import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'

function TypingPage() {
  return (
    <div>
      <SessionProvider>
        <Typing />
      </SessionProvider>
    </div>
  )
}

export default TypingPage