import UserInfo from '../../Components/User/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { check } from '../../Modules/Auth'
import { getUser } from '../../Modules/User'
import { useParams } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'

const UserInfoContainer = () => {
  const dispatch = useDispatch()
  const { id: userId } = useParams()
  const { user, id } = useSelector(({ auth, user }: RootState) => ({
    user: user.user,
    id: auth.id,
  }))

  useEffect(() => {
    if (userId === undefined) return
    dispatch(getUser(parseInt(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  return (
    <>
      <Header id={id} />
      <UserInfo
        userId={userId === undefined ? -1 : parseInt(userId)}
        id={id}
        user={user}
      />
      <Footer />
    </>
  )
}

export default UserInfoContainer
