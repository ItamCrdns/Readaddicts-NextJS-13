import styles from '../messages.module.css'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button/Button'
import sendMessage from './sendMessage'
import { useRef, useState } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'

// * receiver its the person we are chatting with
const WriteMsg = ({ receiver }) => {
  const formRef = useRef()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = useSubmitRef(formRef)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const content = formData.get('content')

    if (content) {
      setLoading(true)
      const res = await sendMessage(receiver, formData)
      if (res.status === 204) {
        setSent(true)
        setTimeout(() => {
          setSent(false)
        }, 2000)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  }

  return (
    <section className={styles.writemsg}>
      <Image
        src={user.profile_Picture}
        alt={user.username}
        width={75}
        height={75}
      />
      <form ref={formRef} onSubmit={handleSendMessage}>
        <input type='text' placeholder='Write a message...' name='content' />
      </form>
      <div onClick={handleSubmit}>
        <Button
          text='Send'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          loading={loading}
        />
      </div>
      <Alert message='Message sent' ready={sent} />
    </section>
  )
}

export default WriteMsg