import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.styl'

const Avatar = ({ src, readOnly = true, ...props }) => (
  <div
    src={src}
    className={classNames({ [styles.avatar]: true, [styles.edition]: !readOnly })}
    {...props}
  >
    <img src={src} alt="Avatar" />
  </div>
)

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
}

export default Avatar
