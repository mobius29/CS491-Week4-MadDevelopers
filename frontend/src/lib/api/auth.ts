import client from './client'

interface User {
  userName: string
  displayName: string
  password: string
}

export const login = ({ userName, password }: User) => {
  client.post('user/login', { userName, password })
}

export const register = ({ userName, displayName, password }: User) => {
  client.post('user/register', {
    userName,
    displayName,
    password,
  })
}
