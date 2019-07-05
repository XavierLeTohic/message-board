import styles from './index.styl'

const Header = () => (
  <header className={styles.header}>
    <div>Message board</div>
    <a href="index">
      <img src="/static/settings.svg" />
    </a>
  </header>
)

export default Header
