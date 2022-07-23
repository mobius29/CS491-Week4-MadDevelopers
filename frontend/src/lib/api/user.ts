import client from './client'

interface User {
  id: number
  profileImage: string
  displayName: string
  selfInformation: string
}

export const getUser = (id: number) => client.get(`/user/${id}`)

export const update = ({
  id,
  profileImage,
  displayName,
  selfInformation,
}: User) => {
  return client.put(`/user/update/${id}`, {
    profileImage,
    displayName,
    selfInformation,
  })
}

export const clickStar = (userId: number) =>
  client.post('/user/star', { userId })
