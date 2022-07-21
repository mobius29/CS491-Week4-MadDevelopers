import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AuthFormBlock = styled.div`
  h3 {
    margin-bottom: 3rem;
  }
`

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  & + & {
    margin-top: 1rem;
  }
`
const Footer = styled.div`
  margin-top: 2remm;
  text-align: right;
`

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`

const textMap = {
  login: 'Login',
  register: 'Register',
}

interface IProps {
  type: 'login' | 'register'
  form: {
    userName: string
    displayName?: string
    password: string
    passwordConfirm?: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error: string
}

const AuthForm = ({ type, form, onChange, onSubmit, error }: IProps) => {
  const title = textMap[type]

  return (
    <AuthFormBlock>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete='userName'
          name='userName'
          placeholder='Id'
          onChange={onChange}
          value={form.userName}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete='displayName'
            name='displayName'
            placeholder='displayName'
            onChange={onChange}
            value={form.displayName}
          />
        )}
        <StyledInput
          autoComplete='password'
          name='password'
          placeholder='password'
          type='password'
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete='password'
            name='passwordConfirm'
            placeholder='check password'
            type='password'
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <button>Submit</button>
      </form>
      <Footer>
        {type === 'register' ? (
          <Link to='/login'>Login</Link>
        ) : (
          <Link to='/register'>Register</Link>
        )}
      </Footer>
    </AuthFormBlock>
  )
}

export default AuthForm
