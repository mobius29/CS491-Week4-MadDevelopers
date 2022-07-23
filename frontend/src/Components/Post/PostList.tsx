import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post } from '../../lib/types'

const PostListBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
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
      <div className="post-author">
        <Link to={`/user/${post.authorId}`}>{post.displayName}</Link>
      </div>
      <div className="post-comments">&#x1F5E8; {post.commentCount}</div>
      <div className="post-created">{(new Date(post.createdAt * 1000)).toLocaleDateString()}</div>
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
