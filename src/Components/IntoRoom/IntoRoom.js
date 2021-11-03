import React, { useState, useEffect } from 'react'
import './IntoRoom.css'
import { useHistory } from 'react-router'
import { axios } from '@/instances/axios'

export default function IntoRoom() {
  const history = useHistory()
  const [user, setUser] = useState({})
  const [room, setRoom] = useState()

  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${room}`)
    if (response?.data.question != null) {
      history.push(`/waiting-room?user=${user.username}&room=${room}`, { room })
    } else {
      alert('Invalid ID')
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
  // const handleIdExam = (event) => {
  //   setRoom({ [event.target.name]: event.target.value })
  //   console.log('IdExam: ', room.id_exam)
  // }

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
              // onClick={() => render(questions.id_exam)}
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
