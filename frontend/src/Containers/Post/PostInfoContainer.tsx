import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Modules'
import { useEffect, useState } from 'react'
import { check } from '../../Modules/Auth'
import {
  changeField,
  getPost,
  deletePost,
  addComment,
} from '../../Modules/Post'
import Header from '../../Components/Common/Header'
import Footer from '../../Components/Common/Footer'
import PostInfo from '../../Components/Post/PostInfo'
import { useNavigate, useParams } from 'react-router-dom'

const PostInfoContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: postIdString } = useParams()
  const postId = parseInt(postIdString!)
  const [error, setError] = useState<string>('')
  const [commentError, setCommentError] = useState<string>('')
  const { form, id, post, getPostError, commentPostError, commentPostSuccess } =
    useSelector(({ auth, post }: RootState) => ({
      form: post.commentWrite,
      id: auth.id,
      post: post.post,
      getPostError: post.getPostError,
      commentPostError: post.commentPostError,
      commentPostSuccess: post.commentPostSuccess,
    }))
  const [parentCommentId, setParentCommentId] = useState<number | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'comment') return

    dispatch(changeField({ form: 'comment', key: name, value, id: '-1' }))
  }

  const onChangeParentCommentId = (parentId: number) => {
    setParentCommentId(parentId)
  }

  const cancelParentCommentId = () => {
    setParentCommentId(null)
  }

  const onDelete = (id: number) => {
    console.log(id)
    dispatch(deletePost(id))
    navigate('/posts/1')
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const comment = form
    if (comment === '') {
      setCommentError('Comment cannot be blank')
      return
    }

    dispatch(addComment({ postId, comment, parentCommentId }))
  }

  useEffect(() => {
    if (commentPostError) {
      setCommentError('Internal Server Error')
      return
    }

    if (commentPostSuccess) {
      window.location.reload()
    }
  }, [commentPostError, commentPostSuccess])

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPost(postId))
  }, [dispatch, postId])

  useEffect(() => {
    if (getPostError) {
      setError('Internal Server Error')

      return
    }
  }, [getPostError])

  return (
    <>
      <Header id={id} />
      <PostInfo
        postId={postId}
        post={post}
        error={error}
        form={form}
        parentCommentId={parentCommentId}
        commentError={commentError}
        onDelete={onDelete}
        onChange={onChange}
        onSubmit={onSubmit}
        onChangeParentCommentId={onChangeParentCommentId}
        cancelParentCommentId={cancelParentCommentId}
      />
      <Footer />
    </>
  )
}

export default PostInfoContainer
