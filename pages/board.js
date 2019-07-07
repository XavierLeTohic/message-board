import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Header from '../src/components/Header'
import MessageList from '../src/components/MessageList'
import BottomBar from '../src/components/BottomBar'

import '../src/styles/base.styl'

const ObserverBoard = observer(
  class Board extends Component {
    constructor(props) {
      super(props)

      this.state = {
        messages: props.messages,
      }
    }

    componentDidMount() {
      this.checkMessagesInterval = setInterval(async () => {
        const res = await fetch('http://localhost:3000/messages')
        const {
          data: { messages },
        } = await res.json()

        if (messages.length !== this.state.messages.length) {
          this.setState({ messages })
        }
      }, 1250)
    }

    onNewMessages(messages) {
      this.setState({ messages })
    }

    render() {
      const { username } = this.props
      const { messages } = this.state
      return (
        <div>
          <Header />
          <MessageList messages={messages} username={username} />
          <BottomBar onNewMessages={this.onNewMessages.bind(this)} />
        </div>
      )
    }
  }
)

ObserverBoard.getInitialProps = async ctx => {
  const options = {
    method: 'GET',
    credentials: 'include',
  }

  if (ctx && ctx.req) {
    options.headers = { cookie: ctx.req.headers.cookie }
  }

  const fetchProfile = await fetch('http://localhost:3000/profile', options)
  const {
    data: { username, avatar },
  } = await fetchProfile.json()

  if (!username) {
    if (ctx && ctx.req) {
      ctx.res.writeHead(302, { Location: `/` })
      ctx.res.end()
    } else {
      Router.push('/index')
    }
    return {}
  }

  const res = await fetch('http://localhost:3000/messages', options)
  const {
    data: { messages },
  } = await res.json()

  return {
    username,
    avatar,
    messages,
  }
}

ObserverBoard.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}

export default ObserverBoard
