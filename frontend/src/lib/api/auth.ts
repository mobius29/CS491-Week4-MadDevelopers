import client from './client'

interface User {
  id: number
  userName: string
  displayName: string
  selfInformation: string
  password: string
}

export const login = ({ userName, password }: User) =>
  client.post('/user/login', { userName, password })

export const register = ({ userName, displayName, password }: User) =>
  client.post('/user/register', {
    userName,
    displayName,
    password,
  })

export const checkLogin = () => client.get('/user/check')

export const logout = () => client.get('/user/logout')
