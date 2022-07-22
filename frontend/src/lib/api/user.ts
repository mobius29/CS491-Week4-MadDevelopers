import client from './client'

interface User {
  id: number
  profileImage: string
  displayName: string
  selfInformation: string
}

export const getUser = (id: number) =>
  client.get(`http://192.249.18.128/user/${id}`)

export const update = ({
  id,
  profileImage,
  displayName,
  selfInformation,
}: User) => {
  console.log(id, profileImage, displayName, selfInformation)
  return client.put(`http://192.249.18.128/user/update/${id}`, {
    profileImage,
    displayName,
    selfInformation,
  })
}
