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
  console.log(id, profileImage, displayName, selfInformation)
  return client.put(`/user/update/${id}`, {
    profileImage,
    displayName,
    selfInformation,
  })
}
