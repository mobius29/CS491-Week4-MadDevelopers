export type post = {
  postId: number
  title: string
  content: string
  authorId: number
  displayName: string
  tags: {
    id: number
    tag: string
  }[]
  createdAt: Date
}
