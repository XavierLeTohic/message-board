const express = require('express')
const next = require('next')
const faker = require('faker')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

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

    var sessionOptions = {
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {},
      genid: () => faker.random.uuid(),
    }

    if (server.get('env') === 'production') {
      server.set('trust proxy', 1) // trust first proxy
      sessionOptions.cookie.secure = true // serve secure cookies
    }

    server.use(session(sessionOptions))

    // Generate fake messages each time the server is launched
    let fakeMessages = generateFakeMessages(20)
    // Get all the users from the generated messages
    const users = fakeMessages.reduce(
      (acc, { author: user, avatar }) =>
        acc.some(entry => entry.user === user) ? [...acc, { user, avatar }] : acc,
      []
    )

    // GET all messages
    server.get('/messages', (req, res) => {
      const { username } = req.session
      const messages = fakeMessages.filter(message => {
        if (message.isPrivate && username && message.author !== username) {
          return false
        }
        return true
      })

      res.json({
        data: {
          messages,
        },
        error: null,
      })
    })

    // GET avatar
    server.get('/avatar', (req, res) => {
      return res.json({
        url: faker.image.avatar(70, 70),
      })
    })

    // GET profile
    server.get('/profile', (req, res) => {
      const { username, avatar } = req.session

      return res.json({
        data: {
          username,
          avatar,
        },
        error: null,
      })
    })

    // POST settings
    server.post('/settings', (req, res) => {
      const { username, avatar } = req.body
      const currentName = req.session.username
      const isUsernameTaken = users.some(({ username: name }) => name === username)

      if (!currentName && isUsernameTaken) {
        res.json({
          data: null,
          error: {
            message: 'This name is not available',
          },
        })
      }

      // If it's a new user
      if (!currentName) {
        users.push({ username, avatar })
      } else {
        const currentUserIndex = users.findIndex(({ username: name }) => name === currentName)
        const currentUser = users[currentUserIndex]
        // User is updating his username
        if (currentUser.username !== username) {
          users[currentUserIndex].username = username
          // Update his username on all existing messages
          fakeMessages = fakeMessages.map(message => {
            if (message.author === currentName) {
              return {
                ...message,
                author: username,
              }
            }

            return message
          })
        }
        // User is updating his avatar
        if (currentUser.avatar !== avatar) {
          users[currentUserIndex].avatar = avatar
          // Update his avatar on all existing messages
          fakeMessages = fakeMessages.map(message => {
            if (message.author === currentName) {
              return {
                ...message,
                avatar,
              }
            }

            return message
          })
        }
      }

      req.session.username = username
      req.session.avatar = avatar

      return res.json({
        data: {
          username,
          avatar,
        },
        error: null,
      })
    })

    // POST new message
    server.post('/message', (req, res) => {
      const { content, isPrivate } = req.body
      const { username, avatar } = users.find(({ username: name }) => name === req.session.username)

      fakeMessages.push({
        author: username,
        uuid: faker.random.uuid(),
        content,
        avatar,
        isPrivate,
      })

      return res.json({
        data: {
          messages: fakeMessages.filter(message => {
            if (message.isPrivate && message.author !== username) {
              return false
            }
            return true
          }),
        },
        error: null,
      })
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
