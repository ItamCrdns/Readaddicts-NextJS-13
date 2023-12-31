'use client'
import styles from '@/components/Login/users.module.css'
import styles2 from './updateprofile.module.css'
import { useRef, useState } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Button from '@/components/Button/Button'
import ImageUtility from '@/components/ImageUploader/ImageUploader'

const UpdateForm = ({ user, handleUpdate, loading }) => {
  const formRef = useRef(null)
  const inputRef = useRef(null)

  const handleSubmit = useSubmitRef(formRef)
  const [image, setImage] = useState(user?.profile_Picture || null)

  const handleImageSelect = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <article className={`${styles.usersmain} ${styles2.updateform}`}>
      <ImageUtility inputRef={inputRef} imageBlob={image} text='Change your profile picture' />
      <form
        ref={formRef}
        onSubmit={handleUpdate}
        className={styles2.updateformcontainer}
      >
        <section className={styles2.inputfield}>
          <input
            type='file'
            name='imageFile'
            autoComplete='off'
            onChange={handleImageSelect}
            ref={inputRef}
          />
        </section>
        <section className={styles2.inputfield}>
          <p>Username:</p>
          <input
            type='text'
            name='username'
            autoComplete='off'
            placeholder={user?.username}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
          <p>Role:</p>
          <input
            type='text'
            name='username'
            autoComplete='off'
            placeholder={user?.role}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </section>
        <section className={styles2.inputfield}>
          <p>First Name:</p>
          <input
            type='text'
            name='first_Name'
            autoComplete='off'
            placeholder={user?.first_Name}
          />
          <p>Last name:</p>
          <input
            type='text'
            name='last_Name'
            autoComplete='off'
            placeholder={user?.last_Name}
          />
        </section>
        <section className={styles2.inputfield}>
          <p>Email:</p>
          <input
            type='text'
            name='email'
            autoComplete='off'
            placeholder={user?.email}
          />
        </section>
        <section className={styles2.inputfield}>
          <p>Password:</p>
          <input
            type='password'
            name='password'
            autoComplete='off'
            placeholder='**************'
          />
        </section>
        <section className={styles2.inputfield}>
          <p>Gender:</p>
          <input
            type='text'
            name='gender'
            autoComplete='off'
            placeholder={user?.gender}
          />
        </section>
        <section className={styles2.inputfield}>
          {user?.birthday
            ? (
              <p>
                Your birthday:{' '}
                {user?.birthday ? user.birthday.split('T')[0] : ''}
              </p>
              )
            : (
              <p>Birthday:</p>
              )}
          <input type='date' name='birthday' autoComplete='off' />
        </section>
        <section className={styles2.inputfield}>
          <p>Bio:</p>
          <input
            type='text'
            name='bio'
            autoComplete='off'
            placeholder={user?.bio}
          />
        </section>
      </form>
      <div onClick={handleSubmit}>
        <Button
          text='Update'
          backgroundColor='rgb(0, 210, 255)'
          textColor='white'
          loading={loading}
        />
      </div>
    </article>
  )
}

export default UpdateForm
