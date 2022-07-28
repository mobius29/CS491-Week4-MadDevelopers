import { Router } from 'express'
import { connection } from '../connection.js'

const postsRouter: Router = Router()

interface TagItem {
  tagId: number
  tag: string
}

postsRouter.get('/:page', (req, res) => {
  console.log(req.method, req.originalUrl)
  const { page } = req.params
  const start = 10 * (parseInt(page) - 1)
  connection.query(
    `
    SELECT
      p.id as postId,
      u.id as authorId,
      p.title,
      u.displayName,
      unix_timestamp(p.createdAt) as createdAt,
      p.lastUpdated,
      (SELECT COUNT(*) FROM Comments c WHERE c.postid = p.id) as commentCount
    FROM Users u JOIN  Posts p ON u.id = p.authorId
    ORDER BY p.createdAt DESC
    LIMIT ${start}, 11;
    `,
    (error, posts) => {
      if (error) {
        console.error(error)
        return res.status(500).send(error.message)
      }

      let hasNext = false;
      if (posts.length === 11) {
        hasNext = true;
        posts.splice(-1);
      }

      return res.send({ posts, hasNext })
    }
  )
})

postsRouter.get('/post/:id', (req, res) => {
  const postId = req.params.id
  connection.query(
    `
    SELECT
      title,
      content,
      authorId,
      displayName,
      profileImage,
      unix_timestamp(p.createdAt) as createdAt,
      unix_timestamp(lastUpdated) as lastUpdated
    FROM Posts p JOIN Users u ON p.authorId = u.id
    WHERE p.id = ${postId};`,
    (postError, postData) => {
      if (postError) {
        console.error(postError)
        return res.status(500).send('INTERNAL SERVER ERROR')
      }
      connection.query(
        `SELECT Comments.id as commentId, userId, displayName, comment, unix_timestamp(Comments.createdAt) as createdAt, parentCommentId FROM Comments INNER JOIN Users WHERE userId = Users.id AND postId = ${postId}`,
        (commentError, commentData) => {
          if (commentError) {
            console.error(commentError)
            return res.status(500).send('INTERNAL SERVER ERROR')
          }
          connection.query(
            `SELECT Tags.tagId, tag FROM Tags JOIN PostTags ON PostTags.tagId = Tags.id WHERE postId = ${postId};`,
            (tagError, tagData) => {
              if (tagError) {
                console.error(tagError)
                return res.status(500).send('INTERNAL SERVER ERROR')
              }
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
  const authorId: string = req.cookies['id']
  const tags: TagItem[] = req.body['tags']
  const content: string = req.body['content']

  console.log(req.method, req.baseUrl, title, content, authorId, tags)

  connection.query(
    `INSERT INTO Posts VALUE(NULL, "${title}", "${content}", "${authorId}", DEFAULT, DEFAULT, DEFAULT)`,
    (_, postData) => {
      const postId = postData['insertId']

      tags.forEach((tag: TagItem) => {
        connection.query(
          `INSERT INTO Tags VALUE(NULL, ${tag.tagId}, "${tag.tag}")`,
          (_, tagData) => {
            const tagId = tagData['insertId']
            connection.query(
              `INSERT INTO PostTags VALUE(${postId}, "${tagId}")`
            )
          }
        )
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
    `INSERT INTO Comments VALUE(NULL, ${postId}, ${userId}, "${comment}", DEFAULT, ${parentCommendId})`,
    (error) => {
      if (error) res.status(500).send(error)
      else res.sendStatus(200)
    }
  )
})

postsRouter.put('/update/:id', (req, res) => {
  const title = req.body['title']
  const content = req.body['content']
  const tags = req.body['tags']
  const postId = parseInt(req.params.id)

  connection.query(
    `UPDATE Posts SET title = "${title}", content = "${content}" WHERE id = ${postId}`
  )

  connection.query(
    `DELETE FROM Tags WHERE id IN (SELECT tagId FROM PostTags WHERE postId=${postId})`
  )

  tags.forEach((tag: TagItem) => {
    connection.query(
      `INSERT INTO Tags VALUE(NULL, ${tag.tagId}, "${tag.tag}")`,
      (_, tagData) => {
        const tagId = tagData['insertId']
        connection.query(`INSERT INTO PostTags VALUE(${postId}, "${tagId}")`)
      }
    )
  })

  res.status(200).send({ id: postId })
})

postsRouter.delete('/delete/:id', (req, res) => {
  console.log(req.method, req.originalUrl)
  connection.query(`DELETE FROM Posts WHERE id = ${req.params.id}`)
  res.sendStatus(200)
})

postsRouter.get('/search/results', (req, res) => {
  console.log( req.method, req.originalUrl);
  const search = req.query.search;
  const tag = req.query.tag;
  const page: string = req.query.pages as string;

  const intPage = parseInt(page);
  console.log({ page, search, tag, intPage });

  if (search !== undefined && typeof search === 'string') {
    const query = `
    SELECT
        p.id as postId,
        u.id as authorId,
        p.title,
        u.displayName,
        unix_timestamp(p.createdAt) as createdAt,
        p.lastUpdated,
        (SELECT COUNT(*) FROM Comments c WHERE c.postid = p.id) as commentCount
    FROM
        Users u
    INNER JOIN 
        Posts p
    ON
        u.id = p.authorId
    WHERE
        p.title LIKE "%${search}%" OR
        p.content LIKE "%${search}%" OR
        u.displayName LIKE "%${search}%"
    ORDER BY p.createdAt DESC
    LIMIT ${(intPage - 1) * 10}, 11
    ;`
    connection.query(query, (error, posts) => {
      if (error) {
        return res.status(500).send(error);
      }

      const hasNext = posts.length > 10
      return res.status(200).send({ posts, hasNext })
    })
  } else if (tag !== undefined && typeof tag === 'string') {
    const query = `
    SELECT
      p.id as postId,
      u.id as authorId,
      p.title,
      u.displayName,
      unix_timestamp(p.createdAt) as createdAt,
      p.lastupdated,
      (SELECT COUNT(*)
      FROM Comments c
      WHERE c.postId = p.id) as commentCount
    FROM Posts p JOIN User u ON u.id = p.authorId
    WHERE p.id IN (
      SELECT postId
      FROM PostTags pt JOIN Tags t ON pt.tagId = t.id
      WHERE t.tag = ${tag})
    ORDER BY p.createdAt DESC
    LIMIT ${(intPage - 1) * 10}, 11
    ;`
    connection.query(query, (error, posts) => {
      if (error) {
        console.error(error)

        return res.status(500).send(error.message)
      }

      const hasNext = posts.length > 10
      return res.status(200).send({ posts, hasNext })
    })
  }
})

export default postsRouter
