import React from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

let socket
const ChatRoom = () => {
  const backEndUrl = 'http://localhost:3000'
  useEffect(() => {
    socket = io(backEndUrl)
  })
  return <p>Chat</p>
}
export default ChatRoom
