import client from './client'

interface Post {
  id: number
  title: string
  content: string
  tags: string[]
}

interface Comment {
  postId: number
  comment: string
  parentCommentId: number
}

export const getPosts = () => client.get('/posts')

export const getPost = (id: number) => client.get(`/posts/${id}`)

export const writePost = ({ title, content, tags }: Post) =>
  client.post('/posts/create', { title, content, tags })

export const updatePost = ({ id, title, content, tags }: Post) =>
  client.put(`/posts/update/${id}`, { title, content, tags })

export const deletePost = (id: number) => client.delete(`/posts/delete/${id}`)

export const addComment = ({ postId, comment, parentCommentId }: Comment) =>
  client.post('/posts/comment', { postId, comment, parentCommentId })
