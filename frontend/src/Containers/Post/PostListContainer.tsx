import PostList from '../../Components/Post/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../Modules'
import { getPosts, getPostsBySearch, getPostsByTag } from '../../Modules/Post'
import { check } from '../../Modules/Auth'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'
import { useParams, useSearchParams } from 'react-router-dom'

const PostListContainer = () => {
  const dispatch = useDispatch()
  const [queryParams] = useSearchParams()
  const search = queryParams.get('search')
  const tag = queryParams.get('tag')
  const page = parseInt(useParams().page!)

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
      if (search !== null) {
        dispatch(getPostsBySearch({ search, page }))
      } else if (tag !== null) {
        dispatch(getPostsByTag({ tag, page }))
      } else {
        dispatch(getPosts(page))
      }
    }
  }, [dispatch, page, search, tag])

  useEffect(() => {
    if (getPostsError) {
      setError('Internal Server Error')
      return
    }
  }, [getPostsError])

  return (
    <>
      <Header id={id} />
      <PostList page={page} hasNext={hasNext} posts={posts} error={error} />
      <Footer />
    </>
  )
}

export default PostListContainer
