import React, { useState, useEffect } from 'react'
import './IntoRoom.css'
import { useHistory } from 'react-router'
import { axios } from '@/instances/axios'

export default function IntoRoom() {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [room, setRoom] = useState()
  const popup = () => {
    <div className="modal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  }
  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${room}`)
    console.log('user: ', user)
    if (response?.data.question != null) {
      history.push(`/waiting-room?room=${room}`, {
        room,
        user,
      })
    } else {
      alert('Invalid ID')
    }

    if (response?.data?.success == false) {
      alert(response?.data?.message)
    }
    console.log('response: ', response)
  }
  useEffect(() => {}, [])

  async function fetchUserRoom() {
    const id = localStorage.getItem('id')
    const responseUser = await axios.get(`/user/${id}`)
    setUser(responseUser?.data?.user)
    console.log('test user: ', responseUser?.data)
  }
  useEffect(() => {
    fetchUserRoom()
  }, [])

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
              name="id_exam"
              value={room}
              placeholder="Enter a join code"
              onChange={(e) => {
                setRoom(e.target.value)
              }}
            />
            <button
              type="submit"
              className="btn btn-info"
              onClick={(e) => {
                fetchUser()
                return !room ? e.preventDefault() : null
              }}
              style={{ color: 'black' }}
            >
              JOIN
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
