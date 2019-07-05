import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.styl'

const Message = ({ author, content, avatar, username, isPrivate }) => (
  <div
    className={classNames({
      [styles.container]: true,
      [styles.currentUser]: username === author,
      [styles.private]: isPrivate,
    })}
  >
    <div className={styles.author}>
      <img src={avatar} alt={`Avatar of ${author}`} loading="lazy" />
      <div>{author === username ? 'You' : author}</div>
    </div>
    <div className={styles.content}>{content}</div>
  </div>
)

Message.propTypes = {
  uuid: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.string,
  isPrivate: PropTypes.bool,
  username: PropTypes.string,
}

export default Message
