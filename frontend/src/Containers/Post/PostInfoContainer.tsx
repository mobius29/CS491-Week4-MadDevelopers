import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect, useState } from 'react'
import { check } from '../../Modules/Auth'
import { getPost } from '../../Modules/Post'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'
import PostInfo from '../../Components/Post/PostInfo'
import { useParams } from 'react-router-dom'

const PostInfoContainer = () => {
  const dispatch = useDispatch()
  const { id: postId } = useParams()
  const [error, setError] = useState<string>('')
  const { id, post, getPostError } = useSelector(
    ({ auth, post }: RootState) => ({
      id: auth.id,
      post: post.post,
      getPostError: post.getPostError,
    })
  )

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    if (postId !== undefined) dispatch(getPost(parseInt(postId)))
  }, [dispatch, postId])

  useEffect(() => {
    if (getPostError) {
      setError('Internal Server Error')

      return
    }
  }, [getPostError])

  return (
    <>
      <Header id={id} />
      <PostInfo post={post} error={error} />
      <Footer />
    </>
  )
}

export default PostInfoContainer
