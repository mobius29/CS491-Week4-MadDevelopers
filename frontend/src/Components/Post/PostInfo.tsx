import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post, comment } from '../../lib/types'

const PostInfoBlock = styled.div`
  width: 100%;

  .title-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;

    .title {
      display: flex;
      align-items: center;
      height: 5rem;
      margin-left: 3rem;
      font-size: 30px;
      font-weight: bold;
    }

    .btns {
      display: flex;
      margin-right: 3rem;
      font-size: 16px;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 30px;
        margin-right: 2rem;
        background: white;
        border: 1px solid black;
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    height: 2rem;
    border-bottom: 1px solid black;

    .author {
      margin-left: 5rem;
    }

    .createdAt {
      margin-right: 5rem;
    }
  }

  .contents {
    height: 600px;
    margin-top: 1rem;
    font-size: 24px;
    border-bottom: 1px solid black;
  }

  .content {
    height: 550px;
    padding-left: 3rem;
    border-bottom: 1px solid black;
  }

  .tags {
    margin-left: 3rem;
    height: 50px;
    font-size: 18px;
    padding-top: 0.75rem;
  }

  .border {
    border-bottom: 1px solid black;
  }

  .comment-block {
    height: 70px;
    margin-top: 0.5rem;
  }

  .comments-text {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 2rem;
    border-bottom: 1px solid black;
  }

  .comment-top {
    margin-top: 0.125rem;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin-left: 2rem;

    .changeParentComment {
      margin-right: 2rem;
    }
  }

  .comment-comment {
    margin-top: 0.5rem;
    margin-left: 2rem;
  }

  .reply {
    padding-left: 2rem;
  }

  .comment-input {
    width: 80%;
    height: 30px;
    margin-top: 1rem;
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  .comment-submit-btn {
    margin-left: 2rem;
    width: 70px;
    height: 30px;
  }

  .cancelParentComment {
    margin-left: 2rem;
  }
`

const TagBlock = styled.span`
  width: 200px;
  height: 40px;
`

const CommentBlock = styled.div`
  width: 100%;
  height: 50px;
`

interface IProps {
  userId: number
  postId: number
  post: post | null
  error: string
  form: string
  parentCommentId: number | null
  commentError: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: (id: number) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChangeParentCommentId: (parentId: number) => void
  cancelParentCommentId: () => void
}

const Tag = ({ tag }: { tag: string }) => {
  return <TagBlock>{tag}</TagBlock>
}

const Comment = ({
  comment,
  className,
  isParent,
  onChangeParentCommentId,
}: {
  comment: comment
  className: string
  isParent: boolean
  onChangeParentCommentId: (parentId: number) => void
}) => {
  return (
    <div className='border'>
      <CommentBlock className={`${className} comment-block`}>
        <div className='border'>
          <div className='comment-top'>
            <div className='comment-author'>author: {comment.displayName}</div>
            {isParent && (
              <div
                className='changeParentComment'
                onClick={() => onChangeParentCommentId(comment.commentId)}
              >
                reply
              </div>
            )}
          </div>
        </div>
        <div className='comment-comment'>{comment.comment}</div>
      </CommentBlock>
    </div>
  )
}

const PostInfo = ({
  userId,
  postId,
  post,
  error,
  form,
  parentCommentId,
  commentError,
  onChange,
  onChangeParentCommentId,
  cancelParentCommentId,
  onDelete,
  onSubmit,
}: IProps) => {
  const Tags = post?.tags.map((tag) => <Tag key={tag.tagId} tag={tag.tag} />)
  console.log(post?.tags)
  const Comments = post?.comments.map((comment) => {
    if (comment.parentCommentId === null) {
      const replies = post?.comments.map((reply_comment) => {
        if (
          reply_comment.parentCommentId === null ||
          reply_comment.parentCommentId !== comment.commentId
        )
          return null

        return (
          <Comment
            key={reply_comment.commentId}
            comment={reply_comment}
            className='reply'
            isParent={false}
            onChangeParentCommentId={onChangeParentCommentId}
          />
        )
      })
      return (
        <>
          <Comment
            key={comment.commentId}
            comment={comment}
            className='parent'
            isParent={true}
            onChangeParentCommentId={onChangeParentCommentId}
          />
          {replies}
        </>
      )
    } else return null
  })
  return (
    <>
      {post === null ? (
        <div>{error}</div>
      ) : (
        <PostInfoBlock>
          {userId === post.authorId && (
            <div className='title-btns'>
              <span className='title'>{post.title}</span>
              <div className='btns'>
                <Link to={`/post/update/${postId}`} className='btn update-btn'>
                  수정
                </Link>
                <div
                  className='btn delete-btn'
                  onClick={() => onDelete(postId)}
                >
                  삭제
                </div>
              </div>
            </div>
          )}

          <div className='info'>
            <Link to={`/user/${post.authorId}`} className='author'>
              author: {post.displayName}
            </Link>
            <span className='createdAt'>
              {new Date(post.createdAt * 1000).toLocaleString()}
            </span>
          </div>
          <div className='contents'>
            <div className='content'>{post.content}</div>
            <div className='tags'>Tag: {Tags}</div>
          </div>
          <div className='comments'>
            <div className='comments-text'>댓글</div>
            <div className='comments-area'>
              {Comments}
              <form className='add-comment-form' onSubmit={onSubmit}>
                <input
                  className='comment-input'
                  type='text'
                  name='comment'
                  placeholder='댓글을 작성하세요.'
                  onChange={onChange}
                  value={form}
                />
                <button className='comment-submit-btn' type='submit'>
                  작성
                </button>
              </form>
              {commentError !== '' && <div>{commentError}</div>}
            </div>
            {parentCommentId !== null && (
              <span
                className='cancelParentComment'
                onClick={cancelParentCommentId}
              >
                대댓글 작성 취소하기.
              </span>
            )}
          </div>
        </PostInfoBlock>
      )}
    </>
  )
}

export default PostInfo
