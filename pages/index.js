import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

import Header from '../src/components/Header'
import MessageList from '../src/components/MessageList'
import '../src/styles/base.styl'

const Index = ({ messages }) => (
  <div>
    <Header />
    <MessageList messages={messages} />
  </div>
)

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/messages')
  const messages = await res.json()

  return {
    messages,
  }
}

Index.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      content: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
}

export default Index
