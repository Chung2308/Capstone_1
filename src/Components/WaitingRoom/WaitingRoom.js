import React from 'react'
import './WaitingRoom.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
import io from 'socket.io-client'
import SplitSearch from '../../Utils/SplitSearch'
let socket

export default function WaitingRoom() {
  // Render lần 1
  const history = useHistory()
  const { location } = useHistory()
  const [questions, setQuestions] = useState({})
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')
  const [room, setRoom] = useState('')
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const backEndUrl = 'https://trung-api-capstone1.herokuapp.com'

  const [search, setSearch] = useState(SplitSearch(location.search))

  async function fetchRoom() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    if (response?.data?.question != null) {
      setQuestions({ ...response?.data.question })
      startTimer({ ...response?.data.question })
    } else {
      alert('Invalid ID')
    }
  }
  
  async function fetchUserRoom () {
    const id = localStorage.getItem('id')
    const responseUser = await axios.get(`/user/${id}`)
    setUser(responseUser?.data?.user)
    console.log('test user: ', responseUser?.data)
  }

  useEffect(() => {
    // fetchUserRoom()
    fetchRoom()
  }, [])

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const user = params.get('user')
    const room = params.get('room')
    console.log('room:', room)
    setUser(user)
    setRoom(room)
    socket = io(backEndUrl)
    socket.emit('join', { user, room }, (error) => {
      if (error) {
        // alert(error)
      }
    })
    return () => {
      //user leave room
      socket.disconnect()
      socket.off()
    }
  }, [backEndUrl, window.location.search])
  // console.log('room: ', search)

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg])
      setTimeout(() => {
        var div = document.getElementById('chat_body')
        div.scrollTop = div.scrollHeight - div.clientWidth
      }, 10)
    })
    socket.on('roomMembers', (usrs) => {
      setUsers(usrs)
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('sendMessage', message, () => setMessage(''))
    setTimeout(() => {
      var div = document.getElementById('chat_body')
      div.scrollTop = div.scrollHeight
    }, 100)
  }
  let interval = useRef()

  const startTimer = (questions) => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const room = params.get('room')
    console.log('push room: ', room)
    interval = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourOpenDb}:${
          questions.minuteOpenDb
        }:${questions.secondOpenDb}`
      )

      const time = currentDate - Date.now()

      if (time < 0) {
        history.push(`/exam?room=${room}`, {room})
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
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 infor-waiting-room">
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
            <label
              className="countdown"
            >
              <span>
                {timeHours}
                {'h:'}
              </span>
              <span>
                {timeMinutes}
                {'m:'}
              </span>
              <span>
                {timeSeconds}
                {'s'}
              </span>
            </label>
            <br />
          </div>
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 chat-room container mt-4">
          <div className="row chat-window" id="chat_window_1">
            <div className="col-xs-3 col-md-3 infor-user">
              <p>Active Users</p>
              <ul>
                {users.map((e, i) => (
                  <li key={i}>{user.username}</li>
                ))}
              </ul>
            </div>
            <div className="col-xs-9 col-md-9">
              <div className="panel panel-default">
                <div className="panel-heading top-bar">
                  <div className="col-md-12 col-xs-8">
                    <h3
                      className="panel-title name-room"
                      style={{ display: 'flex' }}
                    >
                      {/* <span className="glyphicon glyphicon-comment"></span> */}
                      <img
                        src="./img/room.gif"
                        alt=""
                        style={{ width: '6%', marginRight: '3%' }}
                      />
                      {room}
                    </h3>
                  </div>
                </div>
                <div className="panel-body msg_container_base" id="chat_body">
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  <p>Chung chan</p>
                  {messages.map((e, i) =>
                    e.user === user?.toLowerCase() ? (
                      <>
                        <div key={i} className="row msg_container base_receive">
                          <div className="col-xs-10 col-md-10">
                            <div className="messages msg_receive">
                              <p>{e.text}</p>
                              <time>{e.user}</time>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div key={i} className="row msg_container base_sent">
                          <div className="col-xs-10 col-md-10">
                            <div className="messages msg_sent">
                              <p>{e.text}</p>
                              <time>{e.user}</time>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="panel-footer">
                  <div className="input-group">
                    <input
                      id="btn-input"
                      type="text"
                      value={message}
                      onKeyPress={(event) =>
                        event.key === 'Enter' ? sendMessage(event) : null
                      }
                      onChange={(event) => setMessage(event.target.value)}
                      className="form-control input-sm chat_input"
                      placeholder="Write your message here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
