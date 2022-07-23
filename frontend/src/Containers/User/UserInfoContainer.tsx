import UserInfo from '../../Components/User/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { check, deleteUser } from '../../Modules/Auth'
import { getUser } from '../../Modules/User'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'

const UserInfoContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: userId } = useParams()
  const { user, id } = useSelector(({ auth, user }: RootState) => ({
    user: user.user,
    id: auth.id,
  }))

  const onDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
    navigate('/')
  }

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
        onDeleteUser={onDeleteUser}
      />
      <Footer />
    </>
  )
}

export default UserInfoContainer
