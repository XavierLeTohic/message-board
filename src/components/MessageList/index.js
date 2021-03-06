import { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Message from '../Message'

import styles from './index.styl'

const ObserverMessageList = observer(
  class MessageList extends Component {
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
      const { messages, currentUser } = this.props

      return (
        <div className={styles.container}>
          <div data-test="message-list">
            {messages.map((props, k) => (
              <Message
                {...props}
                key={props.uuid}
                currentUser={currentUser}
                data-test={`message-${k}`}
              />
            ))}
          </div>
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
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
}

export default ObserverMessageList
