import PostList from '../../Components/Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../Modules'
import { getPosts } from '../../Modules/Post'
import { check } from '../../Modules/Auth'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'

const PostListContainer = () => {
  const dispatch = useDispatch()
  const { posts, getPostsError, id } = useSelector(
    ({ post, auth }: RootState) => ({
      posts: post.posts,
      getPostsError: post.getPostsError,
      id: auth.id,
    })
  )
  const [error, setError] = useState<string>('')

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    if (getPostsError) {
      setError('Internal Server Error')
      return
    }
  }, [getPostsError])

  return (
    <>
      <Header id={id} />
      <PostList posts={posts} error={error} />
      <Footer />
    </>
  )
}

export default PostListContainer
