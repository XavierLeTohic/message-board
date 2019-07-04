import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import '../src/styles/base.styl'

const Index = ({ messages }) => (
  <div>
    <ul>
      {messages.map(({ author, content }) => (
        <li key={shortid.generate()}>
          <div>{author}</div>
          <div>{content}</div>
        </li>
      ))}
    </ul>
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
    })
  ),
}

export default Index
