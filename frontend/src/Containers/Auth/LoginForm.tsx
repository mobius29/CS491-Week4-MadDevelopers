import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../Components/Auth/AuthForm'
import { RootState } from '../../Modules'
import { changeField, initializeForm, login } from './../../Modules/Auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const { form, auth, authError } = useSelector(({ auth }: RootState) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    if (name !== 'userName' && name !== 'password') return

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      })
    )
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { userName, password } = form

    if ([userName, password].includes('')) {
      setError('do not allow blank')

      return
    }

    dispatch(login({ userName, password }))
  }

  useEffect(() => {
    dispatch(initializeForm('login'))
  }, [dispatch])

  useEffect(() => {
    if (authError) {
      console.log(authError)
      if (authError.response.status === 400) {
        setError('userName or displayName already have')

        return
      }

      setError('Internal Server Error')
      return
    }
  }, [auth, authError, dispatch])

  return (
    <AuthForm
      type='login'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  )
}

export default LoginForm
