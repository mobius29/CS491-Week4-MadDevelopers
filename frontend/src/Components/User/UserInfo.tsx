import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1200px;

  .user-info {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 150px;
    background: blue;

    .profile-image {
      display: flex;
      justify-content: center;
      align-items: center;
      background: red;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    .profile-image img {
      border-radius: 50%;
    }

    .profile-top {
      display: grid;
      grid-template-columns: 3fr 1fr;
    }

    .profile-name {
      display: flex;
      align-items: center;
      background: lime;
      padding-left: 2rem;
      font-size: 2rem;
    }

    .profile-introduce {
      padding-top: 1rem;
      padding-left: 1rem;
      font-size: 1.125rem;
      background: yellow;
    }

    .following {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }

    .isFollowing {
      background: red;
    }

    .unFollowing {
      background: aqua;
    }
  }

  .post-list {
    margin-top: 2rem;
    margin-left: 1.5rem;
    height: 1000px;
  }

  .btn {
    font-size: 18px;
    float: right;
    margin-right: 2rem;
  }
`

interface IProps {
  userId: number
  id: number
  user: {
    displayName: string
    selfInformation: string
    profileImage: string
    isFollowing: number
    starCount: number
  } | null
  isFollowing: boolean
  followerCount: number
  onClickStar: (followingId: number) => void
  onDeleteUser: (id: number) => void
}

const UserInfo = ({
  userId,
  id,
  user,
  isFollowing,
  followerCount,
  onClickStar,
  onDeleteUser,
}: IProps) => {
  return (
    <>
      {user === null ? (
        <div>유저가 없습니다.</div>
      ) : (
        <>
          <UserInfoBlock>
            <div className='user-info'>
              <div className='profile-image'>
                <img
                  alt='profile_image'
                  width='200px'
                  height='200px'
                  src={`http://192.249.18.176/images/${user.profileImage}`}
                />
              </div>
              <div className='profile-top'>
                <div className='profile-name'>{user.displayName}</div>
                {userId === id ? (
                  <div className='following'>{user.starCount}</div>
                ) : (
                  <div
                    className={
                      isFollowing
                        ? 'following isFollowing'
                        : 'following unFollowing'
                    }
                    onClick={() => onClickStar(userId)}
                  >
                    {followerCount}
                  </div>
                )}
              </div>

              <div className='profile-introduce'>{user.selfInformation}</div>
            </div>

            <div className='post-list'>게시글 목록</div>
            <div className='btns'>
              {userId === id && (
                <div>
                  <div
                    className='btn deleteUser'
                    onClick={() => onDeleteUser(id)}
                  >
                    회원탈퇴
                  </div>
                  <Link className='btn updateUser' to={`/user/update/${id}`}>
                    수정하기
                  </Link>
                </div>
              )}
            </div>
          </UserInfoBlock>
        </>
      )}
    </>
  )
}

export default UserInfo
