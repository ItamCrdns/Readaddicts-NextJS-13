async function createComment (postId, content, parentComment) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL + 'Comment/post/' + postId)
    if (parentComment) {
      url.searchParams.set('parentCommentId', parentComment)
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({ content })
    })

    if (!res.ok) {
      return { text: await res.json(), status: res.status }
    }

    return { data: await res.json(), status: res.status }
  } catch (error) {
    return error.message
  }
}

export default createComment
