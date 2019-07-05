import { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import fetch from 'isomorphic-unfetch'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './index.styl'
import { MESSAGE_MAX_LENGTH } from '../../constants'

const ObserverBottomBar = observer(
  class BottomBar extends Component {
    constructor(props) {
      super(props)

      this.value = observable.box('')
      this.isPrivate = observable.box(false)
    }

    onValueChange({ target: { value } }) {
      this.value.set(value)
    }

    onSubmit() {
      const value = this.value.get()
      const isPrivate = this.isPrivate.get()
      const { username } = this.props

      if (value !== '') {
        const payload = {
          author: username,
          content: value,
          isPrivate,
        }

        fetch('/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(r => {
            return r.json()
          })
          .then(({ messages }) => {
            this.value.set('')
            this.isPrivate.set(false)
            this.props.onNewMessages(messages)
          })
      }
    }

    render() {
      return (
        <div className={styles.container}>
          <input
            className={styles.input}
            maxLength={MESSAGE_MAX_LENGTH}
            type="text"
            placeholder="Type a message"
            value={this.value.get()}
            onChange={this.onValueChange.bind(this)}
          />
          <label className={styles.privacyCheckbox} htmlFor="privacyCheckbox">
            <input
              id="privacyCheckbox"
              className={styles.inputCheckbox}
              type="checkbox"
              alt="Make your message private"
              checked={this.isPrivate.get()}
              onChange={({ target: { checked } }) => this.isPrivate.set(checked === true)}
            />
            <span className={styles.checkbox}></span>
          </label>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            disabled={this.value.get() === ''}
            className={classNames({
              [styles.sendButton]: true,
              [styles.disabled]: this.value.get() === '',
            })}
          >
            <img src="/static/send.svg" alt="Send your message" />
          </button>
        </div>
      )
    }
  }
)

ObserverBottomBar.propTypes = {
  onNewMessages: PropTypes.func,
  username: PropTypes.string,
}

export default ObserverBottomBar
