import { Router } from 'express'
import { connection } from '../connection.js'

const postsRouter: Router = Router()

interface TagItem {
  id: number;
  tag: string;
}

postsRouter.get('/', (req, res) => {
  console.log(req.method, req.originalUrl)
  connection.query(
    `SELECT Posts.id as postId, Users.id as authorId, title, displayName, Posts.createdAt FROM Users INNER JOIN Posts ON Users.id = Posts.authorId`,
    (error, rows) => {
      if (error) res.status(500).send(error)
      else res.send({ posts: rows })
    }
  )
})

postsRouter.get('/:id', (req, res) => {
  const postId = req.params.id
  connection.query(
    `SELECT title, content, authorId, displayName, Posts.createdAt, lastUpdated FROM Posts INNER JOIN Users WHERE Users.id = Posts.authorId AND Posts.id = ${postId};`,
    (_, postData) => {
      connection.query(
        `SELECT Comments.id as commentId, userId, displayName, comment, parentCommentId FROM Comments INNER JOIN Users WHERE userId = Users.id AND postId = ${postId}`,
        (_, commentData) => {
          connection.query(
            `SELECT Tags.tagId, tag FROM Tags JOIN PostTags ON PostTags.tagId = Tags.id WHERE postId = ${postId};`,
            (_, tagData) => {
              const json = postData[0]
              json['comments'] = commentData
              json['tags'] = tagData
              res.send({ post: json })
            }
          )
        }
      )
    }
  )
})

postsRouter.post('/create', (req, res) => {
  const title: string = req.body['title']
  const authorId: string = req.cookies["id"];
  const tags: TagItem[] = req.body['tags']
  const content: string = req.body["content"];

  console.log(req.method, req.baseUrl, title, content, authorId, tags)

  connection.query(
    `INSERT INTO Posts VALUE(NULL, "${title}", "${content}", "${authorId}", DEFAULT, DEFAULT, DEFAULT)`,
    (_, rows) => {
      const postId = rows['insertId']

      tags.forEach((tag: TagItem) => {
        connection.query(`INSERT INTO Tags VALUE(NULL, ${tag.id}, "${tag.tag}")`, (_, rows) => {
          const tagId = rows["insertId"];
          connection.query(`INSERT INTO PostTags VALUE(${postId}, "${tagId}")`)
        })
      })

      res.status(200).send({ id: postId })
    }
  )
})

postsRouter.post('/comment', (req, res) => {
  const postId = req.body['postId']
  if (!req.cookies['id']) res.sendStatus(400)
  const userId = req.cookies['id']
  const comment = req.body['comment']
  const parentCommendId: number | null = req.body['parentCommentId']

  connection.query(
    `INSERT INTO Comments VALUE(NULL, ${postId}, ${userId}, "${comment}", ${parentCommendId})`,
    (error) => {
      if (error) res.status(500).send(error)
      else res.sendStatus(200)
    }
  )
})

export default postsRouter
