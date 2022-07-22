import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AuthFormBlock = styled.div`
  width: min(100% - 3rem, 600px);
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 3rem;
  }

  .div-btn {
    display: flex;
    justify-content: center;
  }
`

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #EEEEEE;
  padding-bottom: 0.5rem;
  padding: 1rem;
  outline: none;
  width: 100%;
  & + & {
    margin-top: 1rem;
  }
`

const StyledButton = styled.button`
  margin-top: 2rem;
  background: cyan;
  border-radius: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem 3rem;
`

const Footer = styled.div`
  margin-top: 2rem;
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
        <div className="div-btn">
          <StyledButton>Submit</StyledButton>
        </div>
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
