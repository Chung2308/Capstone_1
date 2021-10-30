import React from 'react'
import './WaitingRoom.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'

export default function WaitingRoom() {
  // Render lần 1
  const history = useHistory()
  const {location} = useHistory()
  const [questions, setQuestions] = useState({}) // {...}
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')

  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${location.state}`) // response
    setQuestions({...response?.data.question,})
    startTimer({...response?.data.question,})
  }
  useEffect(() => {
    fetchUser()
  }, [])

  let interval = useRef()

  const startTimer = (questions) => {
    interval = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db.split('T')[0]}T${questions.hourOpenDb}:${questions.minuteOpenDb}:${questions.secondOpenDb}`
      )
      
      const time = currentDate - Date.now()

      if (time < 0) {
        // console.log('Heets thoi gian')
        history.push('/exam')
        clearInterval(interval)
      } else {
        const hours = Math.floor(time / 1000 / 3600)
        const minutes = Math.floor(((time / 1000) % 3600) / 60)
        const seconds = Math.floor((((time / 1000) % 3600) % 60) % 60)
        setTimeHours(hours)
        setTimeMinutes(minutes)
        setTimeSeconds(seconds)
      }
      // console.log('currentDate:', questions)
      // const now = new Date()

      // const nowHours = now.getHours()
      // const nowMinutes = now.getMinutes()
      // const nowSeconds = now.getSeconds()

      // var countdownHours = timeHoursDb - nowHours
      // var countdownMinutes = timeMinutesDb - nowMinutes
      // var countdownSeconds = timeSecondsDb - nowSeconds

      // console.log(' const hours = Math.floor(
      //   (countdownHours % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      // )
      // const minutes = Math.floor(
      //   (countdownMinutes % (1000 * 60 * 60)) / (1000 * 60)
      // )
      // const seconds = Math.floor((countdownSeconds % (1000 * 60)) / 1000)
      // if (countdownHours < 0 || countdownMinutes < 0 || countdownSeconds < 0) {
      //   stop our time
      //   clearInterval(interval.current)
      // } else {
      //   update timer
      //   setTimeHours(hours)
      //   setTimeMinutes(minutes)
      //   setTimeSeconds(seconds)
      // }
    }, 1000)

    // console.log('countdownSeconds: ', timeHours)
  }
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
              {'h:'}
              {questions.minuteOpenDb}
              {'m:'}
              {questions.secondOpenDb}
              {'s'}
            </label>
          </div>
          <div className="countdown">
            <label htmlFor className="infor-room">
              Time remaining:
            </label>
            <label className="countdown">
              <span>
                {timeHours}
                {'h:'}
              </span>
              <span>
                {timeMinutes}
                {'m:'}
              </span>
              <span>{timeSeconds}{'s'}</span>
            </label>
            <br />
          </div>
        </div>
        <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
        </div>
      </div>
    </div>
  )
}
