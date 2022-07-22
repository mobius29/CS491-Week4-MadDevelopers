import client from './client'

interface Post {
  title: string
  content: string
  tags: string[]
}

export const getPosts = () => client.get('/posts')

export const getPost = (id: number) => client.get(`/posts/${id}`)

export const writePost = ({ title, content, tags }: Post) =>
  client.post('/posts/create', { title, content, tags })
