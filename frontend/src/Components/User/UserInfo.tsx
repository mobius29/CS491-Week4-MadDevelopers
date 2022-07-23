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

    .profile-name {
      display: flex;
      align-items: center;
      background: lime;
      padding-left: 1rem;
      font-size: 2rem;
    }

    .profile-introduce {
      padding-top: 1rem;
      padding-left: 1rem;
      font-size: 1.125rem;
      background: yellow;
    }
  }

  .post-list {
    margin-top: 2rem;
    margin-left: 1.5rem;
  }
`

interface IProps {
  userId: number
  id: number
  user: {
    displayName: string
    selfInformation: string
    profileImage: string
    star: boolean
    starCount: number
  } | null
}

const UserInfo = ({ userId, id, user }: IProps) => {
  return (
    <>
      {user === null ? (
        <div>유저가 없습니다.</div>
      ) : (
        <>
          <UserInfoBlock>
            <div className='user-info'>
              <div className='profile-image'>
                <img alt='profile_image' width='200px' height='200px' />
              </div>
              <div className='profile-name'>{user.displayName}</div>
              <div className='profile-introduce'>{user.selfInformation}</div>
            </div>

            <div className='post-list'>게시글 목록</div>
            {userId === id && (
              <div>
                <Link className='update' to={`/user/update/${id}`}>
                  수정하기
                </Link>
              </div>
            )}
          </UserInfoBlock>
        </>
      )}
    </>
  )
}

export default UserInfo
