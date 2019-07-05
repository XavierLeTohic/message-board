import { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import classNames from 'classnames'
import { setCookie } from 'nookies'
import PropTypes from 'prop-types'
import Router from 'next/router'

import styles from './index.styl'

const ObservableSettings = observer(
  class Settings extends Component {
    constructor(props) {
      super(props)

      this.username = observable.box(props.username ? props.username : '')
    }

    onSubmit() {
      const username = this.username.get()
      if (username !== '') {
        setCookie(null, 'username', username)
        Router.push('/board')
      }
    }

    onInputChange({ target: { value } }) {
      this.username.set(value)
    }

    render() {
      const { username } = this.props
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Settings</h1>
          <input
            type="text"
            maxLength={40}
            className={styles.input}
            placeholder="Type your name"
            defaultValue={username}
            onChange={this.onInputChange.bind(this)}
          />
          <button
            onClick={this.onSubmit.bind(this)}
            disabled={this.username.get() === ''}
            className={classNames({
              [styles.submit]: true,
              [styles.disabled]: this.username.get() === '',
            })}
          ></button>
        </div>
      )
    }
  }
)

ObservableSettings.propTypes = {
  username: PropTypes.string,
}

export default ObservableSettings
