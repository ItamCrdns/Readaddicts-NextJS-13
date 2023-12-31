'use client'
import { useEffect, useRef, useState } from 'react'
import { useFetcher } from '@/context/useFetcher'
import styles from '../post.module.css'
import Button from '@/components/Button/Button'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Alert from '@/components/Alert/Alert'

const UpdatePostModal = ({ id }) => {
  const { patchPost, msg, post, changed, patchPostStatus } = useFetcher()
  const [characters, setCharacters] = useState(0)
  const [loading, setLoading] = useState(false)
  const formRef = useRef()

  const handleSubmit = useSubmitRef(formRef)

  const handleUpdate = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const dataHasChanges = Object.fromEntries(new FormData(e.target))

    const fieldsHaveChanged = Object.values(dataHasChanges).some(
      (field) => field !== post?.data?.content
    )

    if (fieldsHaveChanged) {
      setLoading(true)
      patchPost(id, data)
    }
  }

  useEffect(() => {
    if (patchPostStatus === 200) {
      setLoading(false)
    }
  }, [patchPostStatus, changed])

  useEffect(() => {
    if (post?.data?.content) {
      setCharacters(post?.data?.content?.length)
    }
  }, [post?.data?.author])

  const handleCharacterCount = (e) => {
    const targetValue = e.target.value
    setCharacters(targetValue.length)
  }

  return (
    <section className={styles.optionsdelete}>
      <section className={styles.inputandcharcount}>
        <form
          ref={formRef}
          onSubmit={handleUpdate}
          className={styles.updatepostform}
        >
          <textarea
            type='text'
            name='content'
            defaultValue={post?.data?.content}
            maxLength='255'
            onChange={handleCharacterCount}
            placeholder='You can type here'
          />
        </form>
        <div>
          <p style={{ color: characters === 255 ? 'red' : 'black' }}>
            {characters}/255
          </p>
        </div>
      </section>
      <div className={styles.deletebuttons}>
        <div onClick={handleSubmit}>
          <Button
            text='Confirm'
            textColor='white'
            backgroundColor='rgb(0, 210, 255)'
            loading={loading}
          />
        </div>
      </div>
      <Alert
        message={msg.text}
        ready={msg.status}
        backgroundColor={msg.backgroundColor}
        color={msg.color}
        width={msg.width}
      />
    </section>
  )
}

export default UpdatePostModal
