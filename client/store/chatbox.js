import socket from '../socket'

//action types

const NEW_MESSAGE = 'GOT_MESSAGE'

//action creators

export const newMessage = (message, handle) => {
  return {
    type: NEW_MESSAGE,
    message,
    handle
  }
}

//thunks

export const sendMessage = message => dispatch => {
  try {
    dispatch(newMessage(message))
    socket.emit('message', message)
  } catch (error) {
    console.log(error)
  }
}

const initialState = {
  messages: [],
  handle: ''
}

//reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
        handle: action.handle
      }
    default:
      return state
  }
}
