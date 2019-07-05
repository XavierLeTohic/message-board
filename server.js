const express = require('express')
const next = require('next')
const faker = require('faker')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const generateFakeMessages = require('./src/utils/generateFakeMessages')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(cookieParser())

    // Generate fake messages each time the server is launched
    const fakeMessages = generateFakeMessages(20)
    const fakeUserAvatar = faker.image.avatar()

    // GET all messages
    server.get('/messages', (req, res) => {
      const { username } = req.cookies
      res.json(
        fakeMessages.filter(message => {
          if (message.isPrivate && username && message.author !== username) {
            return false
          }
          return true
        })
      )
    })

    // POST new message
    server.post('/message', (req, res) => {
      const { author, content, isPrivate } = req.body

      fakeMessages.push({
        author,
        content,
        avatar: fakeUserAvatar,
        uuid: faker.random.uuid(),
        isPrivate,
      })

      return res.json({ messages: fakeMessages })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
