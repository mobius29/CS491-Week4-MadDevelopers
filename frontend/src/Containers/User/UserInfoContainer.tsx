import UserInfo from '../../Components/User/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { getUser, check } from '../../Modules/Auth'
import { useParams } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'

const UserInfoContainer = () => {
  const dispatch = useDispatch()
  const { id: userId } = useParams()
  const { user, id } = useSelector(({ auth }: RootState) => ({
    user: auth.user,
    id: auth.id,
  }))

  useEffect(() => {
    if (userId === undefined) return
    dispatch(getUser(parseInt(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <Header id={id} />
      <UserInfo user={user} />
      <Footer />
    </>
  )
}

export default UserInfoContainer
