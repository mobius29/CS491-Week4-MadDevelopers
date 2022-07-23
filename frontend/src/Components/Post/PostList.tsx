import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post } from '../../lib/types'

const PostListBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;

  background: red;
`

const PostBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  margin-top: 0.5rem;
  padding-left: 1rem;

  .title {
    width: 100%;
    height: 30px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .content {
    width: 100%;
    height: 60px;
    margin-top: 0.5rem;
    font-size: 1rem;
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
        <div className='post-content'>{post.content}</div>
      </Link>
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
