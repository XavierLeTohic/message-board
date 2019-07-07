import PropTypes from 'prop-types'
import classNames from 'classnames'

import Avatar from '../Avatar'

import styles from './index.styl'

const Message = ({ author, content, avatar, isPrivate, currentUser }) => (
  <div
    className={classNames({
      [styles.container]: true,
      [styles.currentUser]: currentUser === author,
      [styles.private]: isPrivate,
    })}
  >
    <div className={styles.author}>
      <Avatar src={avatar} />
      <div className={styles.name}>{author === currentUser ? 'You' : author}</div>
    </div>
    <div className={styles.content}>{content}</div>
  </div>
)

Message.propTypes = {
  uuid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
  currentUser: PropTypes.string.isRequired,
}

export default Message
