import React, { useState } from 'react'
import './IntoRoom.css'
import { Redirect } from 'react-router-dom'

export default function IntoRoom() {
  const [obj, setObj] = useState()
  const [isRedirectRoom, setIsRedirectRoom] = useState(false)
  const joinRoom = (event) => {
    event.preventDefault()
    if (obj.join_room == '123') {
      setIsRedirectRoom(true)
    } else {
      alert('Invalid ID')
      setIsRedirectRoom(false)
    }
  }
  const objRoom = (event) => {
    setObj({ [event.target.name]: event.target.value })
  }
  if (isRedirectRoom === true) {
    return <Redirect to="/waiting-room" />
  }
  return (
    <div className="into-room">
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 row-1">
          <div className="exam-id">
            <h3>Exam ID</h3>
          </div>
          <div className="input-id">
            <input
              type="text"
              name="join_room"
              id
              placeholder="Enter a join code"
              onChange={objRoom}
            />
            <button type="submit" className="btn btn-info" onClick={joinRoom}>
              <a href="">JOIN</a>
            </button>
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 row-2">
          <img src="./img/room.gif" alt="" />
        </div>
      </div>
    </div>
  )
}
