import client from './client'

interface User {
  id: number
  displayName: string
  selfInformation: string
}

export const getUser = (id: number) => client.get(`/user/${id}`)

export const update = ({ id, displayName, selfInformation }: User) => {
  return client.put(`/user/update/${id}`, {
    displayName,
    selfInformation,
  })
}

export const clickFollow = (followingId: number) =>
  client.post('/user/star', { followingId })

export const updateFile = ({ id, file }: { id: number; file: FormData }) => {
  return client.put(`/user/upload/${id}`, file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
