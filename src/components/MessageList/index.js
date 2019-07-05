import { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Message from '../Message'

import styles from './index.styl'

const ObserverMessageList = observer(
  class MessageList extends Component {
    onNewMessages(messages) {
      this
    }

    scrollToBottom = () => {
      this.end.scrollIntoView({ behavior: 'smooth' })
    }

    componentDidMount() {
      this.scrollToBottom()
    }

    componentDidUpdate() {
      // Will smooth scroll if there is a new message
      this.scrollToBottom()
    }

    render() {
      const { messages, username } = this.props

      return (
        <div className={styles.container}>
          {messages.map(props => (
            <Message {...props} key={props.uuid} username={username} />
          ))}
          <div
            ref={el => {
              this.end = el
            }}
          ></div>
        </div>
      )
    }
  }
)

ObserverMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}

export default ObserverMessageList
