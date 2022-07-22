import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

interface Post {
  id: number
  title: string
  content: string
  tags: {
    id: number
    tag: string
  }[]
}

interface IProps {
  posts: Post[] | null
  error: string
}

const PostItem = ({ id, title, content }: Post) => {
  return (
    <PostBlock>
      <Link to={`/post/${id}`}>
        <div className='post-title'>{title}</div>
        <div className='post-content'>{content}</div>
      </Link>
    </PostBlock>
  )
}

const PostList = ({ posts, error }: IProps) => {
  const postList = posts?.map((post) => (
    <PostItem
      id={post.id}
      title={post.title}
      content={post.content}
      tags={post.tags}
    />
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
