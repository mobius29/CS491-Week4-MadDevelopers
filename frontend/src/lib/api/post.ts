import client from './client'

interface Post {
  title: string
  content: string
  tags: string[]
}

export const getPosts = () => client.get('http://192.249.18.128/posts')

export const getPost = (id: number) =>
  client.get(`http://192.249.18.128/posts/${id}`)

export const writePost = ({ title, content, tags }: Post) =>
  client.post('http://192.249.18.128/posts/create', { title, content, tags })
