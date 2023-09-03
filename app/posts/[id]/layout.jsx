import styles from './post.module.css'
import dynamic from 'next/dynamic'

const DynamicLoadComments = dynamic(() => import('./LoadComments'))
const DynamicAddComment = dynamic(() => import('./comments/AddComent'))
const DynamicOptions = dynamic(() => import('./Options'))
const DynamicComments = dynamic(() => import('./CommentsChild'))
const DynamicImages = dynamic(() => import('./ImagesChild'))
const DynamicDeletePost = dynamic(() => import('./DeleteChild'))
const DynamicUpdatePost = dynamic(() => import('./UpdateChild'))
const DynamicPost = dynamic(() => import('./Post'))

const Post = ({ params, children }) => {
  const { id } = params

  return (
    <main className={styles.postpage}>
      <DynamicImages>{children}</DynamicImages>
      <article className={styles.postandoptions}>
        <DynamicPost id={id} />
        <DynamicOptions id={id} />
        {/* Childrens use onditional rendering based on the pathname. Might use parallel routes next time */}
        <DynamicDeletePost>{children}</DynamicDeletePost>
        <DynamicUpdatePost>{children}</DynamicUpdatePost>
      </article>
      <article className={styles.comment}>
        <DynamicAddComment postId={id} placeholderText='Leave a comment...' href={`/posts/${id}/comments`} />
        <DynamicLoadComments id={id} />
        <DynamicComments>{children}</DynamicComments>
      </article>
    </main>
  )
}

export default Post
