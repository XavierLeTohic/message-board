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

    async onSubmit() {
      const value = this.value.get()
      const isPrivate = this.isPrivate.get()

      if (value !== '') {
        const payload = {
          content: value,
          isPrivate,
        }

        const postMessage = await fetch('/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const {
          data: { messages },
        } = await postMessage.json()

        this.value.set('')
        this.isPrivate.set(false)
        this.props.onNewMessages(messages)
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
            data-test="messageInput"
          />
          <label className={styles.privacyCheckbox} htmlFor="privacyCheckbox">
            <input
              id="privacyCheckbox"
              className={styles.inputCheckbox}
              type="checkbox"
              alt="Make your message private"
              checked={this.isPrivate.get()}
              onChange={({ target: { checked } }) => this.isPrivate.set(checked === true)}
              data-test="privacyCheckbox"
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
            data-test="submitButton"
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
}

export default ObserverBottomBar
