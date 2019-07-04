import PropTypes from 'prop-types'

import styles from './index.styl'

const Message = ({ author, content, avatar }) => (
  <div className={styles.container}>
    <div className={styles.author}>
      <img src={avatar} alt={`Avatar of ${author}`} />
      <div>{author}</div>
    </div>
    <div className={styles.content}>{content}</div>
  </div>
)

Message.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.string,
}

export default Message
