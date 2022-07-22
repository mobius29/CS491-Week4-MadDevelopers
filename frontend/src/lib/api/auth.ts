import client from './client'

interface User {
  id: number
  userName: string
  displayName: string
  selfInformation: string
  password: string
}

export const login = ({ userName, password }: User) =>
  client.post('http://192.249.18.128/user/login', { userName, password })

export const register = ({ userName, displayName, password }: User) =>
  client.post('http://192.249.18.128/user/register', {
    userName,
    displayName,
    password,
  })

export const checkLogin = () => client.get('http://192.249.18.128/user/check')

export const logout = () => client.get('http://192.249.18.128/user/logout')
