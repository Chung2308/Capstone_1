import React, { useState, useEffect } from 'react'
import './IntoRoom.css'
import { useHistory } from 'react-router'
import { axios } from '@/instances/axios'
// import { Link } from 'react-router-dom'

export default function IntoRoom() {
  const history = useHistory()
  const [room, setRoom] = useState()

  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${room}`)
    if (response?.data.question != null) {
      history.push(`/waiting-room?room=${room}`, {room})
    }
    else {
      alert('Invalid ID')
    }
        console.log('response: ', response)
  }

  useEffect(() => {
    // fetchUser()
  }, [])
  // console.log('room', room)

  // const render = () => {
  //   if (room.id_exam == questions.id_exam) {
  //     // if(response?.data?.success === true){
  //     history.push('/waiting-room', questions.id_exam)
  //   }
  //   console.log('render: ', questions.id_exam)
  // }

  const handleIdExam = (event) => {
    setRoom({ [event.target.name]: event.target.value })
    console.log('IdExam: ', room.id_exam)
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
              name="id_exam"
              value={room}
              placeholder="Enter a join code"
              // onChange={(event) => handleIdExam(event)}
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
            >
              {/* <input
                href=""
                onClick={(e) => {
                  fetchUser()
                  return !room ? e.preventDefault() : null
                }}
                // to={`/waiting-room?room=${room}`}
              > */}
              JOIN
              {/* </Link> */}
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
