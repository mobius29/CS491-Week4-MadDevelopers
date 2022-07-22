import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { check } from '../../Modules/Auth'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'
import PostInfo from '../../Components/Post/PostInfo'

const PostInfoContainer = () => {
  const dispatch = useDispatch()
  const { id } = useSelector(({ auth }: RootState) => ({
    id: auth.id,
  }))

  useEffect(() => {
    dispatch(check())
  })

  return (
    <>
      <Header id={id} />
      <PostInfo />
      <Footer />
    </>
  )
}

export default PostInfoContainer
