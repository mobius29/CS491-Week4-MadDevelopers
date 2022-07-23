import React, { useState } from 'react'
import UserUpdate from '../../Components/User/UserUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { changeField, update, upload } from '../../Modules/User'

const UserUpdateContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const { form, updateSuccess, updateError, uploadSuccess, uploadError } =
    useSelector(({ user }: RootState) => ({
      form: user.form,
      updateSuccess: user.updateSuccess,
      updateError: user.updateError,
      uploadSuccess: user.uploadSuccess,
      uploadError: user.uploadError,
    }))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'displayName' && name !== 'selfInformation') return

    dispatch(changeField({ key: name, value }))
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0]

      setFile(uploadFile)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { displayName, selfInformation } = form
    if (displayName === '') {
      setError('do not allow blank in displayName area')

      return
    }

    if (id !== undefined) {
      const intId = parseInt(id)
      dispatch(update({ id: intId, displayName, selfInformation }))

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        dispatch(upload({ id: intId, file: formData }))
      }
    }
  }

  useEffect(() => {
    if (updateError || uploadError) {
      setError('Internal Server Error')
      return
    }

    if (updateSuccess && uploadSuccess) {
      navigate(`/user/${id}`)
    }
  }, [id, updateSuccess, updateError, uploadSuccess, uploadError, navigate])

  return (
    <UserUpdate
      form={form}
      error={error}
      onChange={onChange}
      onChangeImage={onChangeImage}
      onSubmit={onSubmit}
    />
  )
}

export default UserUpdateContainer
