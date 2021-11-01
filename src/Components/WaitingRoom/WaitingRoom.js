import React from 'react'
import './WaitingRoom.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import SplitSearch from '../../Utils/SplitSearch'

export default function WaitingRoom() {
  // Render lần 1
  const history = useHistory()
  const {location} = useHistory()
  const [questions, setQuestions] = useState({}) // {...}
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')
  const [room, setRoom] = useState("")
  const [messages, setMessages] = useState([])

  let socket;

  const [search, setSearch] = useState(SplitSearch(location.search))
  async function fetchUser() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    if(response?.data?.question != null){
      setQuestions({ ...response?.data.question })
      startTimer({ ...response?.data.question })
    } else {
      alert('Invalid ID')
    }
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   const room = params.get('room');
  //   console.log('room:', room)

  //   setRoom(room)
    
  //   socket = io (response)
  //   socket.emit('join', {room: room}, (error)=>{
  //     if(error){
  //       alert(error)
  //     }
  //   })
  //   return () => {
  //     socket.disconnect();
  //     socket.off();
  //   }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  console.log('room: ', search)
  // useEffect (() =>{
  //   socket.on('message', msg=>{
  //     setMessages(prevMessages => [...prevMessages, msg])
  //   })
  // }, [])
  let interval = useRef()

  const startTimer = (questions) => {
    interval = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourOpenDb}:${questions.minuteOpenDb}:${questions.secondOpenDb}`
      )
      
      const time = currentDate - Date.now()

      if (time < 0) {
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
    }, 1000)

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
        <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 char-room">
          {/* <ul>
            {
              messages.map((msg, index) => {
                <li key={index}>{JSON.stringify(msg)}</li>
              })
            }
          </ul> */}
        </div>
      </div>
    </div>
  )
}
