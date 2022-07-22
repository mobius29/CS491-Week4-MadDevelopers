import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { check } from '../../Modules/Auth'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'

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
      <Footer />
    </>
  )
}

export default PostInfoContainer
