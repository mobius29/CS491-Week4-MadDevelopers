import UserInfo from '../../Components/User/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect, useState } from 'react'
import { check, deleteUser } from '../../Modules/Auth'
import { getUser, follow } from '../../Modules/User'
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
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const onClickStar = (followingId: number) => {
    setIsFollowing(!isFollowing)
    dispatch(follow(followingId))
  }
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

  useEffect(() => {
    setIsFollowing(user?.isFollowing! === 1)
  }, [user])

  return (
    <>
      <Header id={id} />
      <UserInfo
        userId={userId === undefined ? -1 : parseInt(userId)}
        id={id}
        user={user}
        isFollowing={isFollowing}
        onClickStar={onClickStar}
        onDeleteUser={onDeleteUser}
      />
      <Footer />
    </>
  )
}

export default UserInfoContainer
