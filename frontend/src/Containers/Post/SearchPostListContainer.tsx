import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Footer from '../../Components/Common/Footer'
import Header from '../../Components/Common/Header'
import PostList from '../../Components/Post/PostList'
import { RootState } from '../../Modules'
import { check } from '../../Modules/Auth'
import { getPostsBySearch, getPostsByTag } from '../../Modules/Post'

const SearchPostListContainer = () => {
  const dispatch = useDispatch()
  const [queryParams] = useSearchParams()
  const search = queryParams.get('search')
  const tag = queryParams.get('tag')
  const page = parseInt(queryParams.get('page')!!)

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
      console.log(page, search, tag)
      if (search !== null) {
        dispatch(getPostsBySearch({ search, page }))
      } else if (tag !== null) {
        dispatch(getPostsByTag({ tag, page }))
      }
    }
  }, [dispatch, page, search, tag])

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

export default SearchPostListContainer
