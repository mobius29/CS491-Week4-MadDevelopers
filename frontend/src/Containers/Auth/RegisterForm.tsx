import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { RootState } from '../../Modules'
import { changeField, initializeForm, register } from './../../Modules/Auth'
import AuthForm from '../../Components/Auth/AuthForm'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const { form, authError, registerSuccess } = useSelector(
    ({ auth }: RootState) => ({
      form: auth.register,
      authError: auth.authError,
      registerSuccess: auth.registerSuccess,
    })
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (
      name !== 'userName' &&
      name !== 'displayName' &&
      name !== 'password' &&
      name !== 'passwordConfirm'
    )
      return

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      })
    )
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userName, displayName, password, passwordConfirm } = form

    if ([userName, displayName, password, passwordConfirm].includes('')) {
      setError('do not allow blank')

      return
    }

    if (password !== passwordConfirm) {
      setError('password is not equal')
      dispatch(changeField({ form: 'register', key: 'password', value: '' }))
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' })
      )

      return
    }

    dispatch(register({ userName, displayName, password }))
  }

  useEffect(() => {
    dispatch(initializeForm('register'))
  }, [dispatch])

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 400) {
        setError('userName or displayName already have')

        return
      }

      setError('Internal Server Error')
      return
    } else {
      if (registerSuccess) {
        navigate('/login')
      }
    }
  }, [authError, navigate, registerSuccess])

  return (
    <AuthForm
      type='register'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  )
}

export default RegisterForm
