import React from 'react'
import {connect} from 'react-redux'
import {sendMessage} from '../store/chatbox'

class Chatbox extends React.Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = this.state.value
    this.props.sendMessage(message)
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div id="chat-box">
        <h2>CHATBOX</h2>
        <div id="chat-window">
          <div id="output">{this.props.messages}</div>
          <div id="feedback" />
        </div>
        <input id="handle" type="text" placeholder="Handle" />
        <input
          id="message"
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
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
  console.log(state)
  return {
    messages: state.chatbox.messages
  }
}

const mapDispatch = dispatch => {
  return {
    sendMessage: message => dispatch(sendMessage(message))
  }
}

export default connect(mapState, mapDispatch)(Chatbox)
