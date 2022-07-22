import styled from 'styled-components'

const PostInfoBlock = styled.div`
  width: 100%;

  background: red;

  .title {
    display: flex;
    align-items: center;
    height: 10rem;
    background: blue;
    padding-left: 3rem;
    font-size: 30px;
    font-weight: bold;
  }

  .info {
    position: relative;
    background: aqua;
    font-size: 18px;

    .author {
      position: absolute;
      left: 5rem;
    }

    .createdAt {
      position: absolute;
      right: 5rem;
    }
  }

  .content {
    margin-top: 2rem;
    padding-left: 3rem;
    font-size: 24px;
  }
`

const PostInfo = () => {
  return (
    <PostInfoBlock>
      <div className='title'>title</div>
      <div className='info'>
        <span className='author'>author</span>
        <span className='createdAt'>createdAt</span>
      </div>
      <div className='content'>lorem</div>
    </PostInfoBlock>
  )
}

export default PostInfo
