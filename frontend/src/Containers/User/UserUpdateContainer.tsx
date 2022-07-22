import React, { useState } from 'react'
import UserUpdate from '../../Components/User/UserUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../Modules'
import { useEffect } from 'react'
import { changeField, getUser, update } from '../../Modules/User'

const UserUpdateContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState<string>('')
  const { form, updateSuccess, updateError } = useSelector(
    ({ user }: RootState) => ({
      form: user.form,
      updateSuccess: user.updateSuccess,
      updateError: user.updateError,
    })
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'displayName' && name !== 'selfInformation') return

    dispatch(changeField({ key: name, value }))
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
      dispatch(
        update({ id: intId, profileImage: '', displayName, selfInformation })
      )
    }
  }

  useEffect(() => {
    if (updateError) {
      setError('Internal Server Error')
      return
    }

    if (updateSuccess) {
      navigate(`/user/${id}`)
    }
  }, [id, updateSuccess, updateError, navigate])

  return (
    <UserUpdate
      form={form}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default UserUpdateContainer
