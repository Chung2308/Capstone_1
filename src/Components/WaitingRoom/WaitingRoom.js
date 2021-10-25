import React from 'react'
import Countdown from '../Countdown/Countdown.js'
import './WaitingRoom.css'
import { useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'

export default function WaitingRoom() {
//   const currentDate = new Date()
//   const open =
//     currentDate.getMonth() === 11 && currentDate.getDate() > 23
//       ? currentDate.getFullYear() + 1
//       : currentDate.getFullYear()
//   const today = new Date()
//   const time =
//     today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
const [questions, setQuestions] = useState({})
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/quiz/question/670662`)
      setQuestions(response?.data.question)
    console.log('test: ',response)
    }
    fetchUser()
  }, [])
  return (
    <div className="waiting-room">
      <div className="row">
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <div className="topic">
            <label htmlFor className="infor-room">
              Exam topic:{' '}
            </label>
            <label>{questions.exam_topic_db}</label>
          </div>
          <div className="date">
            <label htmlFor className="infor-room">
              Exam date:{' '}
            </label>
            <label>{moment(questions.exam_date_db).format('DD/MM/YYYY')}</label>
          </div>
          <div className="time">
            <label htmlFor className="infor-room">
              Exam start:{' '}
            </label>
            <label>
              {questions.hourOpenDb}
              {'h: '}
              {questions.minuteOpenDb}
              {'m: '}
              {questions.secondOpenDb}
              {'s'}
            </label>
          </div>
          <div className="countdown">
            <label htmlFor className="infor-room">
              Time remaining:
            </label>
            <br />
            {/* <Countdown date={`${time}-${open}`} /> */}
          </div>
        </div>
        <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
          <h3>Chat Room</h3>
        </div>
      </div>
    </div>
  )
}
