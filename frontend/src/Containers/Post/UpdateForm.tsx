import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import WritePost from '../../Components/Post/WritePost'
import { RootState } from '../../Modules'
import {
  addTagField,
  changeField,
  getPost,
  initializeForm,
  removeTagField,
  update,
} from '../../Modules/Post'

const UpdateForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const postId = parseInt(id!)
  const [error, setError] = useState<string>('')

  const { post, form, postError, postSuccess } = useSelector(
    ({ post }: RootState) => ({
      post: post.post,
      form: post.update,
      postError: post.postError,
      postSuccess: post.postSuccess,
    })
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'title' && name !== 'tags') return

    if (name === 'tags') {
      const { id } = e.target
      dispatch(
        changeField({
          form: 'update',
          key: name,
          value,
          id: id,
        })
      )
    } else {
      dispatch(
        changeField({
          form: 'update',
          key: name,
          value,
          id: '-1',
        })
      )
    }
  }

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    if (name !== 'content') return
    dispatch(
      changeField({
        form: 'update',
        key: name,
        value,
        id: '-1',
      })
    )
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, content, tags } = form

    if ([title, content].includes('')) {
      setError('do not allow blank')

      return
    }

    tags.forEach((tag) => {
      if (tag.tag === '') return
    })

    console.log(title, content, tags)

    if (id !== undefined) {
      const intId = parseInt(id)
      dispatch(update({ id: intId, title, content, tags }))
    }
  }

  const addTags = (id: number) => {
    dispatch(addTagField({ form: 'update', tagId: id }))
  }

  const removeTags = (id: number) => {
    const { tags } = form
    const idx = tags.findIndex((tag) => tag.tagId === id)
    dispatch(removeTagField({ form: 'update', idx }))
  }

  useEffect(() => {
    dispatch(getPost(postId))
  }, [dispatch, postId])

  useEffect(() => {
    dispatch(
      initializeForm({
        value: {
          title: post?.title!,
          content: post?.content!,
          tags: post?.tags!,
        },
      })
    )
  }, [post, dispatch])

  useEffect(() => {
    if (postError) {
      setError('Internal Server Error')

      return
    }

    if (postSuccess) {
      navigate(`/post/${postId}`)
    }
  }, [postError, postSuccess, postId, navigate])

  return (
    <WritePost
      form={form}
      onChange={onChange}
      onChangeTextArea={onChangeTextArea}
      onSubmit={onSubmit}
      error={error}
      addTags={addTags}
      removeTags={removeTags}
    />
  )
}

export default UpdateForm
