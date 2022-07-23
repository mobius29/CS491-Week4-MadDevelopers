import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post } from '../../lib/types'

const PostListBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background: red;
`

const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100px;
  margin: 0 auto;
  margin-top: 0.5rem;
  padding-left: 1rem;
  background: yellowgreen;

  .post-title {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
  }
`

const BottomBlock = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: aqua;

  .pagination {
    font-size: 1.25rem;
  }
  .write-btn {
    position: absolute;
    right: 2rem;
  }
`

interface IProps {
  posts: post[] | null
  error: string
}

const PostItem = ({ post }: { post: post }) => {
  return (
    <PostBlock>
      <Link to={`/post/${post.postId}`}>
        <div className='post-title'>{post.title}</div>
      </Link>
      <h1>Hi</h1>
    </PostBlock>
  )
}

const PostList = ({ posts, error }: IProps) => {
  const postList = posts?.map((post) => (
    <PostItem key={post.postId} post={post} />
  ))

  return (
    <PostListBlock>
      {error ? (
        <div className='error'>{error}</div>
      ) : (
        <>
          {postList}
          <BottomBlock>
            <div className='pagination'>1 ... 4 5 6 ... 10</div>
            <Link className='write-btn' to='/post/write'>
              Write
            </Link>
          </BottomBlock>
        </>
      )}
    </PostListBlock>
  )
}

export default PostList
