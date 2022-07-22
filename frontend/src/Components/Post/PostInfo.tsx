import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post } from '../../lib/types'

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

interface IProps {
  post: post | null
  error: string
}

const PostInfo = ({ post, error }: IProps) => {
  return (
    <>
      {post === null ? (
        <div>{error}</div>
      ) : (
        <PostInfoBlock>
          <div className='title'>{post.title}</div>
          <div className='info'>
            <Link to={`/user/${post.authorId}`} className='author'>
              {post.displayName}
            </Link>
            <span className='createdAt'>{post.createdAt.toString()}</span>
          </div>
          <div className='content'>{post.content}</div>
        </PostInfoBlock>
      )}
    </>
  )
}

export default PostInfo
