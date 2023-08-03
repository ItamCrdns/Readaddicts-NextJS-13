'use client'
import { useState } from 'react'
import styles from './posts.module.css'
import { useAuth } from '@/hooks/useAuth'

const Menu = ({ username }) => {
  const [toggle, setToggle] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
    setToggle(!toggle)
  }

  if (user?.username === username) {
    return (
      <div className={styles.editicons}>
        <div onClick={handleClick} className={styles.threedots}>
          ...
        </div>
        {toggle && (
          <div className={styles.popupmenu}>
            <p>Edit this post</p>
            <p>Delete this post</p>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className={styles.editicons}>
        <div onClick={handleClick} className={styles.threedots}>
          ...
        </div>
        {toggle && (
          <div className={styles.popupmenu}>
            <p>Leave a comment</p>
            <p>See comments</p>
          </div>
        )}
      </div>
    )
  }
}

export default Menu
