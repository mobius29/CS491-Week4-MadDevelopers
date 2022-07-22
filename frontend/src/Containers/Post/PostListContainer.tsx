import PostList from '../../Components/Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../Modules'
import { getPosts } from '../../Modules/Post'

const PostListContainer = () => {
  const dispatch = useDispatch()
  const { posts, getPostsError } = useSelector(({ post }: RootState) => ({
    posts: post.posts,
    getPostsError: post.getPostsError,
  }))
  const [error, setError] = useState<string>('')

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    if (getPostsError) {
      setError('Internal Server Error')
      return
    }
  }, [getPostsError])

  return <PostList posts={posts} error={error} />
}

export default PostListContainer
