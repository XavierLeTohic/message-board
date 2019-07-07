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

const ObservableBoard = observer(
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

        // Trigger an update only if there is some changes
        if (messages.length !== this.state.messages.length) {
          this.onNewMessages(messages)
        }
      }, 1000)
    }

    componentWillUnmount() {
      clearInterval(this.checkMessagesInterval)
      this.checkMessagesInterval = null
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
          <MessageList messages={messages} currentUser={username} />
          <BottomBar onNewMessages={this.onNewMessages.bind(this)} />
        </div>
      )
    }
  }
)

/**
 * This method is called both on server-side and client-side by Next. It allow
 * us to fetch data before and put it in our component as props.
 */
ObservableBoard.getInitialProps = async ctx => {
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

ObservableBoard.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}

export default ObservableBoard
