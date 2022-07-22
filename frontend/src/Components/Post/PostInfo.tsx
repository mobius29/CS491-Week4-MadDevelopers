import styled from 'styled-components'

const PostInfoBlock = styled.div`
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

      grid-row-start: 1;
      grid-row-end: 3;
    }
    .profile-name {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      font-size: 2rem;
    }

    .profile-introduce {
      padding-top: 1rem;
      padding-left: 1rem;
      font-size: 1.125rem;
    }
  }

  .post-list {
    margin-top: 2rem;
    margin-left: 1.5rem;
  }
`

const PostInfo = () => {
  return (
    <PostInfoBlock>
      <div className='user-info'>
        <div className='profile-image'>Image</div>
        <div className='profile-name'>이름</div>
        <div className='profile-introduce'>자기소개가 없습니다.</div>
      </div>

      <div className='post-list'>게시글</div>
    </PostInfoBlock>
  )
}

export default PostInfo
