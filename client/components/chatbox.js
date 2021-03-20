import React from 'react'
import {connect} from 'react-redux'
import {sendMessage} from '../store/chatbox'

class Chatbox extends React.Component {
  constructor() {
    super()

    this.state = {
      message: '',
      handle: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.handleChangeHandle = this.handleChangeHandle.bind(this)
  }

  handleChangeMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleChangeHandle(event) {
    this.setState({
      handle: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = this.state.message
    const handle = this.state.handle

    const newMessage = `${handle}: ${message}`

    this.props.sendMessage(newMessage)
    this.setState({
      message: ''
    })
  }

  render() {
    const messages = this.props.chat.messages || []
    const handle = this.props.chat.handle

    return (
      <div id="chat-box">
        <h2>CHATBOX</h2>
        <div id="chat-window">
          <div id="output">
            {messages.map((message, i) => {
              return <div key={i}>{message}</div>
            })}
          </div>
          <div id="feedback" />
        </div>
        <input
          id="handle"
          type="text"
          onChange={this.handleChangeHandle}
          value={this.state.handle}
          placeholder="Handle"
        />
        <input
          id="message"
          type="text"
          onChange={this.handleChangeMessage}
          value={this.state.message}
          placeholder="Message"
        />
        <button type="button" id="send" onClick={this.handleSubmit}>
          Send
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    chat: state.chatbox
  }
}

const mapDispatch = dispatch => {
  return {
    sendMessage: message => dispatch(sendMessage(message))
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
