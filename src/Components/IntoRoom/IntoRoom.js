import React, { useState, useEffect } from 'react'
import './IntoRoom.css'
import { useHistory } from 'react-router'
import { axios } from '@/instances/axios'
import { Link } from 'react-router-dom'

export default function IntoRoom() {
  const history = useHistory()
  const [room, setRoom] = useState({})
  const [questions, setQuestion] = useState([])

  async function fetchUser() {
    const response = await axios.get(`/quiz/question/`)
    setQuestion(response?.data?.question)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const render = () => {
    if (room.id_exam == questions.id_exam) {
      history.push('/waiting-room', questions.id_exam)
    }
    console.log('render: ', questions.id_exam)
  }
  
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
              value={room.name}
              placeholder="Enter a join code"
              onChange={(event) => handleIdExam(event)}
            />
            <button
              type="submit"
              className="btn btn-info"
              onClick={() => render(questions.id_exam)}
            >
              <Link href="">JOIN</Link>
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
