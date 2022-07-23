import client from './client'

interface User {
  id: number
  displayName: string
  selfInformation: string
}

interface UploadFile {
  id: number
  file: FormData
}

export const getUser = (id: number) => client.get(`/user/${id}`)

export const update = ({ id, displayName, selfInformation }: User) => {
  return client.put(`/user/update/${id}`, {
    displayName,
    selfInformation,
  })
}

export const clickStar = (userId: number) =>
  client.post('/user/star', { userId })

export const updateFile = ({ id, file }: UploadFile) => {
  return client.put(`/user/upload/${id}`, file, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
