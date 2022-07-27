import { Link } from 'react-router-dom'
import styled from 'styled-components'
import emptyStar from "./empty-star.png"
import filledStar from "./filled-star.png"

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin: 0 auto;

  .user-info {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;

    .profile-image {
      grid-row-start: 1;
      grid-row-end: 3;
    }

    .profile-image img {
      border-radius: 50%;
      width: 200px;
      height: 200px;
    }

    .profile-top {
      display: grid;
      align-items: center;
      grid-template-columns: 3fr 1fr;
    }

    .profile-name {
      grid-row: 1;
      font-size: 2rem;
    }

    .profile-introduce {
      grid-row: 2;
      font-size: 18px;
    }

    .following {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      grid-row: 1;
      font-size: 20px;
      text-align: center;
    }

    .star-image img {
      width: 30px;
      height: 30px;
    }

    .star-image img:hover {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  .post-list {
    margin-top: 2rem;
    height: auto;
  }

  .btn {
    font-size: 18px;
    float: right;
    margin-top: 1rem;
    margin-right: 2rem;
  }
`

const PostBlock = styled.div`
  display: grid;
  width: 80%;
  height: 120px;
  margin: 0.5rem auto;
  padding: 10px;
  border: solid blueviolet 1px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: auto 100px;

  .post-title {
    grid-row: 1;
    grid-column: 1;
    font-size: 1.5rem;
  }

  .post-author {
    grid-row: 2;
    grid-column: 1;
  }

  .post-comments {
    grid-row: 3;
    grid-column: 1;
  }

  .post-created {
    grid-row: 1;
    grid-column: 2;
    text-align: right;
  }
`

interface PostProps {
  postId: number
  title: string
  createdAt: number
  commentCount: number
}

const PostItem = ({
  post,
  authorId,
  displayName,
}: {
  post: PostProps
  authorId: number
  displayName: string
}) => {
  return (
    <PostBlock>
      <Link to={`/post/${post.postId}`}>
        <div className='post-title'>{post.title}</div>
      </Link>
      <div className='post-author'>
        <Link to={`/user/${authorId}`}>{displayName}</Link>
      </div>
      <div className='post-comments'>&#x1F5E8; {post.commentCount}</div>
      <div className='post-created'>
        {new Date(post.createdAt * 1000).toLocaleDateString()}
      </div>
    </PostBlock>
  )
}

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
  posts: PostProps[] | null
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
  posts,
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
                  src={`http://192.249.18.176/images/${user.profileImage}`}
                />
              </div>
              <div className='profile-top'>
                <div className='profile-name'>{user.displayName}</div>

                {/* {userId === id ? (
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
                )} */}

                <div className="following">
                  <div className="star-image" onClick={userId === id ? (() => { }) : (() => onClickStar(userId))}>
                    <img src={isFollowing ? filledStar : emptyStar} />
                  </div>
                  <div>
                    {followerCount}
                  </div>
                </div>

              </div>

              <div className='profile-introduce'>{user.selfInformation}</div>
            </div>

            <div className='post-list'>
              <div className='post-list-contents'>
                {posts?.map((post) => (
                  <PostItem
                    key={post.postId}
                    post={post}
                    authorId={userId}
                    displayName={user.displayName}
                  />
                ))}
              </div>
            </div>
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
