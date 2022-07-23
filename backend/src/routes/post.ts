import { Router } from 'express'
import { connection } from '../connection.js'

const postsRouter: Router = Router()

interface TagItem {
  tagId: number;
  tag: string;
}

postsRouter.get('/', (req, res) => {
  console.log(req.method, req.originalUrl)
  connection.query(`
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
ORDER BY
    p.createdAt
DESC;`,
    (error, rows) => {
      if (error) res.status(500).send(error)
      else res.send({ posts: rows })
    }
  )
})

postsRouter.get("/page/:page", (req, res) => {
  const itemsPerPage = 10;
  console.log(req.method, req.originalUrl)
  connection.query(`
SELECT Posts.id as postId, 
       Users.id as authorId,
       title, 
       displayName, 
       unix_timestamp(Posts.createdAt),
FROM   Users 
       INNER JOIN Posts 
                  ON Users.id = Posts.authorId
ORDER BY Posts.createdAt DESC
LIMIT ${(parseInt(req.params.page) - 1) * itemsPerPage}, ${itemsPerPage}`,
    (error, rows) => {
      if (error) res.status(500).send(error)
      else res.send({ posts: rows })
    }
  )
})

postsRouter.get('/:id', (req, res) => {
  const postId = req.params.id
  connection.query(`
SELECT
    title,
    content,
    authorId,
    displayName,
    unix_timestamp(Posts.createdAt) as createdAt,
    unix_timestamp(lastUpdated) as lastUpdated
FROM
    Posts
INNER JOIN
    Users
WHERE
    Users.id = Posts.authorId AND Posts.id = ${postId};`,
    (_, postData) => {
      connection.query(
        `SELECT Comments.id as commentId, userId, displayName, comment, unix_timestamp(Comments.createdAt) as createdAt, parentCommentId FROM Comments INNER JOIN Users WHERE userId = Users.id AND postId = ${postId}`,
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
    (_, postData) => {
      const postId = postData['insertId']

      tags.forEach((tag: TagItem) => {
        connection.query(`INSERT INTO Tags VALUE(NULL, ${tag.tagId}, "${tag.tag}")`, (_, tagData) => {
          const tagId = tagData["insertId"];
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
    `INSERT INTO Comments VALUE(NULL, ${postId}, ${userId}, "${comment}", DEFAULT, ${parentCommendId})`,
    (error) => {
      if (error) res.status(500).send(error)
      else res.sendStatus(200)
    }
  )
})

postsRouter.put("/update/:id", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  const tags = req.body["tags"];
  const postId = parseInt(req.params.id);

  connection.query(`UPDATE Posts SET title = "${title}", content = "${content}" WHERE id = ${postId}`);

  connection.query(`DELETE FROM Tags WHERE id IN (SELECT tagId FROM PostTags WHERE postId=${postId})`);

  tags.forEach((tag: TagItem) => {
    connection.query(`INSERT INTO Tags VALUE(NULL, ${tag.tagId}, "${tag.tag}")`, (_, tagData) => {
      const tagId = tagData["insertId"];
      connection.query(`INSERT INTO PostTags VALUE(${postId}, "${tagId}")`);
    });
  });

  res.status(200).send({ id: postId });
});

postsRouter.delete("/delete/:id", (req, res) => {
  console.log(req.method, req.originalUrl);
  connection.query(`DELETE FROM Posts WHERE id = ${req.params.id}`);
  res.sendStatus(200);
});

export default postsRouter
