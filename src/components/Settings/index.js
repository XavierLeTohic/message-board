import { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Avatar from '../Avatar'

import styles from './index.styl'

const ObservableSettings = observer(
  class Settings extends Component {
    constructor(props) {
      super(props)

      this.username = observable.box(props.username ? props.username : '')
      this.avatar = observable.box(props.avatar)
      this.error = observable.box(false)
    }

    async onSubmit() {
      const username = this.username.get()
      const avatar = this.avatar.get()

      const res = await fetch('http://localhost:3000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, avatar }),
      })
      const { error } = res.json()

      if (error) {
        return this.error.set(error)
      }

      Router.push('/board')
    }

    onInputChange({ target: { value } }) {
      this.username.set(value)

      if (this.error.get()) {
        this.error.set(false)
      }
    }

    async onAvatarClicked() {
      const res = await fetch('http://localhost:3000/avatar')
      const { url } = await res.json()
      this.avatar.set(url)
    }

    render() {
      const { username, avatar } = this.props
      const error = this.error.get()
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Settings</h1>
          <Avatar
            onClick={this.onAvatarClicked.bind(this)}
            src={this.avatar.get()}
            readOnly={false}
          />
          <p className={styles.label}>Click to randomize</p>
          <input
            type="text"
            maxLength={40}
            className={styles.input}
            placeholder="Type your name"
            defaultValue={username}
            onChange={this.onInputChange.bind(this)}
          />
          {error ? <p>{error}</p> : null}
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
  avatar: PropTypes.string,
}

export default ObservableSettings
