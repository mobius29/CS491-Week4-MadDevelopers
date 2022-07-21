import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface IProps {
  children?: React.ReactNode
}

const AuthTemplate = ({ children }: IProps) => {
  return (
    <AuthTemplateBlock>
      <div className='logo'>
        <Link to='/'>Mad-Developers</Link>
      </div>
      {children}
    </AuthTemplateBlock>
  )
}

export default AuthTemplate
