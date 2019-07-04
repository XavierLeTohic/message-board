import PropTypes from 'prop-types'
import shortid from 'shortid'

import Message from '../Message'

import styles from './index.styl'

const MessageList = ({ messages }) => (
  <div className={styles.container}>
    {messages.map(props => (
      <Message {...props} key={shortid.generate()} />
    ))}
  </div>
)

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}

export default MessageList
