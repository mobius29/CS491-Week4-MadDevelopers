import PostList from '../../Components/Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../Modules'
import { getPosts } from '../../Modules/Post'
import { check } from '../../Modules/Auth'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'
import { useParams } from 'react-router-dom'

const PostListContainer = () => {
  const dispatch = useDispatch()
  const page = parseInt(useParams().page!!)

  const { posts, getPostsError, id, hasNext } = useSelector(
    ({ post, auth }: RootState) => ({
      posts: post.posts,
      getPostsError: post.getPostsError,
      id: auth.id,
      hasNext: post.hasNext,
    })
  )
  const [error, setError] = useState<string>('')

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    if (page !== undefined) {
      console.log(page)
      dispatch(getPosts(page))
    }
  }, [dispatch, page])

  useEffect(() => {
    if (getPostsError) {
      setError('Internal Server Error')
      return
    }
  }, [getPostsError, hasNext])

  return (
    <>
      <Header id={id} />
      <PostList page={page} hasNext={hasNext} posts={posts} error={error} />
      <Footer />
    </>
  )
}

export default PostListContainer
