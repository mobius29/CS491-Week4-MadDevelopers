export type tag = {
  tagId: number
  tag: string
}

export type comment = {
  userId: number
  displayName: string
  commentId: number
  parentCommentId: number | null
  comment: string
  createdAt: number
}

export type post = {
  postId: number
  title: string
  content: string
  authorId: number
  profileImage: string
  displayName: string
  commentCount: number
  tags: tag[]
  comments: comment[]
  createdAt: number
  lastUpdated: number
}
