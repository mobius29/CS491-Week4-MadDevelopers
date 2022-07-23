import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WritePost from '../../Components/Post/WritePost'
import { RootState } from '../../Modules'
import {
  initializeForm,
  addTagField,
  removeTagField,
  changeField,
  write,
} from './../../Modules/Post'

const WriteForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const { form, postId, postError } = useSelector(({ post }: RootState) => ({
    form: post.write,
    postId: post.postId,
    postError: post.postError,
  }))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    if (name !== 'title' && name !== 'tags') return

    if (name === 'tags') {
      const { id } = e.target
      dispatch(
        changeField({
          form: 'write',
          key: name,
          value,
          id: id,
        })
      )
    } else {
      dispatch(
        changeField({
          form: 'write',
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
        form: 'write',
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
      if (tag.tag === '') {
        setError('do not allow blank')

        return
      }
    })

    dispatch(write({ title, content, tags }))
  }

  const addTags = (id: number) => {
    dispatch(addTagField({ form: 'write', tagId: id }))
  }

  const removeTags = (id: number) => {
    const { tags } = form
    const idx = tags.findIndex((tag) => tag.tagId === id)
    dispatch(removeTagField({ form: 'write', idx }))
  }

  useEffect(() => {
    dispatch(
      initializeForm({
        value: {
          title: '',
          content: '',
          tags: [
            {
              tagId: 0,
              tag: '',
            },
          ],
        },
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (postError) {
      if (postError.response.status === 500) {
        setError('Internal Server Error')

        return
      }
    } else {
      if (postId !== -1) {
        navigate(`/post/${postId}`)
      }
    }
  }, [postId, postError, navigate])

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

export default WriteForm
