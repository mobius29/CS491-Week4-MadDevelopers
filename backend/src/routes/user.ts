import { Router, Request, Response } from 'express'
import sjcl from 'sjcl'
import { connection } from '../connection.js'
import { v4 as uuidv4 } from 'uuid'
import fileUpload from 'express-fileupload'
import fs from 'fs'

const userRouter: Router = Router()

try {
  fs.readdirSync('uploads')
} catch (err) {
  fs.mkdirSync('uploads')
}

userRouter.post('/register', (req: Request, res: Response) => {
  const userName: string = req.body['userName']
  const password: string = req.body['password']
  const passwordSHA = sjcl.hash.sha256.hash(password)
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA)
  const displayName = req.body['displayName']

  console.log(
    `${req.method} ${req.originalUrl} ${userName} ${hashedPassword} ${displayName}`
  )

  connection.query(
    `INSERT INTO Users VALUE(NULL, "${userName}", "${hashedPassword}", "${displayName}", DEFAULT, "default.svg", DEFAULT, DEFAULT, DEFAULT)`,
    (error) => {
      if (error) {
        console.error(error)
        return res.status(400).send(error)
      }

      return res.status(200).send()
    }
  )
})

userRouter.get('/check', (req, res) => {
  if (req.cookies['id']) {
    res.status(200).send(req.cookies['id'])
  } else {
    res.status(401).send('-1')
  }
})

userRouter.post('/login', (req, res) => {
  const userName: string = req.body['userName']
  const password: string = req.body['password']
  const passwordSHA = sjcl.hash.sha256.hash(password)
  const hashedPassword = sjcl.codec.hex.fromBits(passwordSHA)

  console.log(`${req.method} ${req.originalUrl} ${userName} ${hashedPassword}`)

  connection.query(
    `SELECT id FROM Users WHERE userName = "${userName}" AND hashedPassword = "${hashedPassword}"`,
    (error, rows) => {
      if (error) return res.sendStatus(500)
      if (rows.length === 1) {
        const userId = rows[0]['id']
        res.cookie('id', userId, {})
        res.status(200).send({ data: `${userId}` })
      } else {
        res.status(400).send('BAD REQUEST')
      }
    }
  )
})

userRouter.get('/logout', (req, res) => {
  console.log(req.method, req.originalUrl)
  res.clearCookie('id')
  res.sendStatus(200)
})

userRouter.post('/star', (req, res) => {
  if (!req.cookies['id']) res.send(400)

  const followerId = req.cookies['id']
  const followingId = req.body['followingId']

  console.log(req.method, req.originalUrl, followerId, followingId)
  const selectQuery = `SELECT * FROM Stars WHERE followerId=${followerId} AND followingId=${followingId}`
  connection.query(selectQuery, (error, result) => {
    if (error) {
      console.error(error)
      return res.status(500).send(error.message)
    }

    // follower cancel follow
    if (result) {
      const deleteQuery = `DELETE FROM Stars WHERE follwerId=${followerId} AND followingId=${followingId}`
      connection.query(deleteQuery)
      return res.status(200).send('unfollow')
    }
    // follower start to follow
    else {
      const insertQuery = `INSERT INTO Stars(followerId, followingId) VALUE (${followerId}, ${followingId})`
      connection.query(insertQuery)
      return res.status(200).send('follow')
    }
  })
})

userRouter.get('/:id', (req, res) => {
  const myId: number = req.cookies['id'] ?? -1
  const id: number = parseInt(req.params.id)

  console.log(req.method, req.originalUrl, `id = ${id}`)

  if (id.toString() === 'NaN') res.sendStatus(400)

  connection.query(
    `SELECT
    displayName,
    selfInformation,
    profileImage,
    (SELECT COUNT(*) FROM Stars WHERE followerId=${myId} AND followingId=${id}) as isFollowing,
    (SELECT COUNT(*) FROM Stars WHERE followingId=${id}) as starCount
    FROM Users
    WHERE id = ${id} AND isDeleted = 0;`,
    (error, user) => {
      if (error) {
        console.error(error)
        return res.send(500).send(error.message)
      }
      if (user.length === 1) {
        return res.status(200).send({ user: user[0] })
      } else {
        return res.sendStatus(404)
      }
    }
  )
})

userRouter.put('/update/:id', (req, res) => {
  const id: number = parseInt(req.params.id)
  const displayName: string = req.body['displayName']
  let selfInformation: string = req.body['selfInformation']

  console.log(req.method, req.originalUrl)
  console.log(displayName, selfInformation)

  connection.query(
    `UPDATE Users SET displayName = "${displayName}", selfInformation = "${selfInformation}" WHERE id = ${id}`,
    (error) => {
      if (error) res.sendStatus(500)
      else res.sendStatus(200)
    }
  )
})

/*
userRouter.put("/upload/:id", upload.single("file"), (req, res) => {
  console.log(req.method, req.originalUrl, req.file, req.body);
  res.sendStatus(200);
})
*/

userRouter.put('/upload/:id', (req: Request, res: Response) => {
  // console.log(req.method, req.originalUrl, req.body, req.files);
  if (req.files) {
    const id = parseInt(req.params.id)

    const file = req.files.file as fileUpload.UploadedFile
    const ext = file.name.slice(file.name.lastIndexOf('.'))
    const uuid = uuidv4()
    const fileName = `./uploads/${uuid}${ext}`

    // console.log(req.method, req.originalUrl, fileName);

    file.mv(fileName, (err) => {
      if (err) {
        res.status(500).send(err)
      } else {
        connection.query(
          `UPDATE Users SET profileImage = "${uuid}${ext}" WHERE id = ${id}`,
          (error) => {
            if (error) res.status(500).send(error)
            else res.sendStatus(200)
          }
        )
      }
    })
  } else {
    res.sendStatus(400)
  }
})

userRouter.delete('/delete/:id', (req, res) => {
  console.log(req.method, req.originalUrl)
  connection.query(`UPDATE Users SET isDeleted = 1 WHERE id = ${req.params.id}`)
  res.sendStatus(200)
})

export default userRouter
