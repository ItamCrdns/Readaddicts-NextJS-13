'use client'
import styles from './post.module.css'
import { usePathname } from 'next/navigation'
import Button from '@/components/Button/Button'
import { useFetcher } from '@/context/useFetcher'

const LoadComments = ({ id }) => {
  const { post } = useFetcher()
  const comments = post?.data?.comments
  const pathname = usePathname()

  // * If the pathname is /comments we dont need to display the Show Comments component
  if (!pathname.includes('/comments') && comments > 0) {
    return (
      <section className={styles.loadcomments}>
        <Button
          text={`Show ${comments} comments and responses`}
          href={`/posts/${id}/comments`}
          backgroundColor='white'
          width='275px'
          effectColor='rgb(235, 235, 235)'
        />
      </section>
    )
  } if (!pathname.includes('/comments') && comments <= 0) {
    return <h3 style={{ textAlign: 'center', fontWeight: '400' }}>Be the first comment.</h3>
  }
}

export default LoadComments
