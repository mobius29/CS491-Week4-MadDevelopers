import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { post, comment } from '../../lib/types'

const PostInfoBlock = styled.div`
  width: 100%;

  .title {
    margin-top: 1rem;
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
  }

  .btns {
    display: flex;
    width: 100%;
    font-size: 16px;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    justify-content: flex-end;
    height: auto;

    .btn {
      text-align: center;
      width: 80px;
      height: 50px;
      margin-right: 0.5rem;
      line-height: 50px;
      border-radius: 10px;
      border: none;
    }

    .delete-btn {
      background: pink;
    }

    .delete-btn:hover {
      background: red;
      color: white;
      cursor: pointer;
    }

    .update-btn {
      background: skyblue;
      color: black;
    }

    .update-btn:hover {
      background: blue;
      color: white;
    }
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 18px;
    margin-top: 1rem;

    .profile-image img {
      border-radius: 50%;
      margin: 0.5rem 0;
      width: 60px;
      height: 60px;
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
  }

  .tags {
    margin-left: 3rem;
    height: 50px;
    font-size: 18px;
    padding-top: 0.75rem;
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
  width: 80%;
  height: auto;
  margin-top: 0.5rem;

  .reply {
    margin-left: 2rem;
  }

  .comment-block {
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 10px;
  }

  .comments-text {
    display: flex;
    align-items: center;
    height: auto;
  }

  .comment-top {
    height: auto;
    display: flex;
    justify-content: space-between;

    .changeParentComment {
      margin-right: 2rem;
    }
  }

  .comment-comment {
    margin-top: 0.5rem;
    margin-left: 2rem;
  }

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
    <CommentBlock>
      <div className={`${className} comment-block`}>
        <div className='comment-top'>
          <Link to={`/user/${comment.userId}`}>
            <div className='comment-author'>{comment.displayName}</div>
          </Link>
          <span>{(new Date(comment.createdAt * 1000)).toLocaleString()}</span>
        </div>
        <div className='comment-comment'>{comment.comment}</div>
        {isParent && (
          <div
            className='changeParentComment'
            onClick={() => onChangeParentCommentId(comment.commentId)}
          >
            reply
          </div>
        )}
      </div>
    </CommentBlock>
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
            className=''
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
          <div className='title'>{post.title}</div>

          <div className='info'>
            <div className="profile-image">
              <img src={`http://192.249.18.176/images/${post.profileImage}`} />
            </div>
            <Link to={`/user/${post.authorId}`}>
              {post.displayName}
            </Link>
            <span className='createdAt'>
              {new Date(post.createdAt * 1000).toLocaleDateString()}
            </span>
          </div>

          <div className='contents'>
            <div className='content'>{post.content}</div>
            <div className='tags'>Tag: {Tags}</div>
          </div>

          {userId === post.authorId && (
            <div className='btns'>
              <Link to={`/post/update/${postId}`} className="btn update-btn">
                수정
              </Link>
              <div
                className='btn delete-btn'
                onClick={() => onDelete(postId)}
              >
                삭제
              </div>
            </div>
          )}

          <div className='comments'>
            <div className='comments-text'>{post.comments.length}개의 댓글이 있습니다.</div>
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
