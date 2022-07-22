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

export type comment = {
  postId: number
  comment: string
  parentCommentId: number | null
  userId: number
  displayName: string
}
