const express = require('express')
const next = require('next')

const generateFakeMessages = require('./src/utils/generateFakeMessages');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // Pick a number between 10 and 25
    const nbrOfMessages = Math.floor(Math.random() * 25) + 10
    // Generate fake messages each time the server is launched
    const fakeMessages = generateFakeMessages(nbrOfMessages)

    server.get('/messages', (req, res) => res.json(fakeMessages))

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
