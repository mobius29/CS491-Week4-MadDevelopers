import Footer from '../../Components/Common/Footer'
import Header from '../../Components/Common/Header'
import Contents from '../../Components/Home/Contents'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { check } from './../../Modules/Auth'
import { useEffect } from 'react'

const HomeContainer = () => {
  const dispatch = useDispatch()
  const { id } = useSelector(({ auth }: RootState) => ({
    id: auth.id,
  }))

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  return (
    <>
      <Header id={id} />
      <Contents />
      <Footer />
    </>
  )
}

export default HomeContainer
