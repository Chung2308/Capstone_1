import React from 'react'
import './Exam.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import { useHistory } from 'react-router'
import SplitSearch from '../../Utils/SplitSearch'
import moment from 'moment'

export default function Exam() {
  const { location } = useHistory()
  const history = useHistory()
  const [questions, setQuestions] = useState({ answer_content: '' })
  const [quizs, setQuizs] = useState([])
  const [search, setSearch] = useState(SplitSearch(location.search))

  //Countdown
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')

  //Submited
  const [hoursubmitDb, setHoursubmitDb] = useState('')
  const [minutesubmitDb, setMinutesubmitDb] = useState('')
  const [secondsubmitDb, setSecondsubmitDb] = useState('')

  //Total time
  const [totalhourDb, setTotalhourDb] = useState('')
  const [totalminuteDb, setTotalminuteDb] = useState('')
  const [totalsecondDb, setTotalSecondDb] = useState('')

  async function fetchExamRoom() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    console.log('response: ', response)
    setQuestions({ ...response?.data?.question })
    startTimer({ ...response?.data.question })
    setQuizs(response?.data?.question.quiz)

    //TODO: HOT FIX BEGIN
    var idStorage = search.room + 'hourOpenDb'
    var time = new Date()
    var nowHours = time.getHours()
    var nowMinutes = time.getMinutes()
    var nowSeconds = time.getSeconds()
    if (nowHours < 10) {
      nowHours = '0' + nowHours
    }
    if (nowMinutes < 10) {
      nowMinutes = '0' + nowMinutes
    }
    if (nowSeconds < 10) {
      nowSeconds = '0' + nowSeconds
    }
    if (localStorage.getItem(idStorage) == null) {
      localStorage.setItem(search.room + 'hourOpenDb', nowHours)
      localStorage.setItem(search.room + 'minuteOpenDb', nowMinutes)
      localStorage.setItem(search.room + 'secondsOpenDb', nowSeconds)
    }
    //TODO: HOT FIX END
  }

  useEffect(() => {
    fetchExamRoom()
  }, [])
  useEffect(() => {
    var time = new Date()
    var nowHours = time.getHours()
    var nowMinutes = time.getMinutes()
    var nowSeconds = time.getSeconds()
    if (nowHours < 10) {
      nowHours = '0' + nowHours
    }
    if (nowMinutes < 10) {
      nowMinutes = '0' + nowMinutes
    }
    if (nowSeconds < 10) {
      nowSeconds = '0' + nowSeconds
    }
    setHoursubmitDb(nowHours)
    setMinutesubmitDb(nowMinutes)
    setSecondsubmitDb(nowSeconds)
  }, [])

  useEffect(() => {
    //max time
    var maxHours =
      questions.hourDueDb - localStorage.getItem(search.room + 'hourOpenDb') //12-00
    // console.log('Chung: ' + localStorage.getItem(search.room + 'hourOpenDb'))
    var maxMinutes =
      questions.minuteDueDb - localStorage.getItem(search.room + 'minuteOpenDb') //30-30
    var maxSeconds =
      questions.secondDueDb -
      localStorage.getItem(search.room + 'secondsOpenDb') //00-00

    if (maxMinutes < 0) {
      maxMinutes = maxMinutes * -1
    }
    if (maxSeconds < 0) {
      maxSeconds = maxSeconds * -1
    }

    //convert time int
    var maxHoursInt = Math.floor(maxHours * 60 * 60)
    var maxMinutesInt = Math.floor(maxMinutes * 60)
    var maxSecondsInt = Math.floor(maxSeconds)

    //totalMaxInt
    var totalMaxInt = maxHoursInt + maxMinutesInt + maxSecondsInt

    var timeRemainingHoursInt = Math.floor(timeHours * 60 * 60)
    var timeRemainingMinutesInt = Math.floor(timeMinutes * 60)
    var timeRemainingSecondsInt = Math.floor(timeSeconds)

    //totalRemainingInt
    var totalRemainingInt =
      timeRemainingHoursInt + timeRemainingMinutesInt + timeRemainingSecondsInt

    //totalInt
    var totalInt = totalMaxInt - totalRemainingInt

    // total time
    var totalHours = Math.floor(totalInt / 3600)
    var totalMinutes = Math.floor(totalInt / 60)
    var totalSeconds = Math.floor(
      totalInt - (totalHours * 3600 + totalMinutes * 60)
    )

    if (totalHours < 10) {
      totalHours = '0' + totalHours
    }
    if (totalMinutes < 10) {
      totalMinutes = '0' + totalMinutes
    }
    if (totalSeconds < 10) {
      totalSeconds = '0' + totalSeconds
    }
    setTotalhourDb(totalHours)
    setTotalminuteDb(totalMinutes)
    setTotalSecondDb(totalSeconds)
  })

  let interval = useRef()
  const startTimer = (questions) => {
    const styleTime = {
      border: '1px solid red',
      borderRadius: '5px',
      backgroundColor: 'red',
    }
    interval.current = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourDueDb}:${
          questions.minuteDueDb
        }:${questions.secondDueDb}`
      )
      const time = currentDate - Date.now()
      // if (time == 0) {
      //   history.push('/home')
      // }
      if (time < 0) {
        clearInterval(interval.current)
      }
      // else if(time < 300000 && time >=0){
      //   {styleTime()}
      // }
      else {
        var hours = Math.floor(time / 1000 / 3600)
        var minutes = Math.floor(((time / 1000) % 3600) / 60)
        var seconds = Math.floor((((time / 1000) % 3600) % 60) % 60)
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        setTimeHours(hours)
        setTimeMinutes(minutes)
        setTimeSeconds(seconds)
      }
    }, 1000)
  }

  const onChangeAlternative = (indexAlternative, indexQuiz) => {
    const newQuizs = quizs.map((quiz, index) => {
      if (index === indexQuiz) {
        return {
          ...quiz,
          alternatives: quiz.alternatives.map((alternative, index) => {
            if (index === indexAlternative)
              return {
                ...alternative,
                answer_choosen: true,
              }
            else return { ...alternative }
          }),
        }
      } else return quiz
    })
    setQuizs(newQuizs)
  }

  const onSubmitQuestions = async (e) => {
    e.preventDefault()
    setQuestions({ ...questions, [e.target.name]: e.target.value })
    try {
      const response = await axios.post('/result/', {
        ...questions,
        quiz: quizs,
        hoursubmitDb: hoursubmitDb,
        minutesubmitDb: minutesubmitDb,
        secondsubmitDb: secondsubmitDb,
        totalhourDb: totalhourDb,
        totalminuteDb: totalminuteDb,
        totalsecondDb: totalsecondDb,
      })
      console.log('submit: ', response)
      if (response.data?.success === false) {
        alert(response.data?.message)
      }
    } catch (error) {
      alert('You are not allowed to perform this action')
    }
    clearInterval(interval.current)
  }

  const handleAlternative = (event) => {
    setQuestions({ ...questions, answer_content: event.target.value })
  }
  // console.log('quizs: ', quizs)
  return (
    <div className="exam">
      <div className="infor-exam">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="exam-date">
              <label htmlFor className="title-information">
                Exam date:{' '}
              </label>{' '}
              <label htmlFor>
                {moment(questions.exam_date_db).format('DD/MM/YYYY')}
              </label>
            </div>
            <div className="time-start">
              <label htmlFor className="title-information">
                Exam start:{' '}
              </label>{' '}
              <label htmlFor>
                {questions.hourOpenDb}
                {'h:'}
                {questions.minuteOpenDb}
                {'m:'}
                {questions.secondOpenDb}
                {'s'}
              </label>
            </div>
            <div className="time-end">
              <label htmlFor className="title-information">
                Exam end:{' '}
              </label>{' '}
              <label htmlFor>
                {questions.hourDueDb}
                {'h:'}
                {questions.minuteDueDb}
                {'m:'}
                {questions.secondDueDb}
                {'s'}
              </label>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="time-topic">
              <label htmlFor className="title-information">
                Exam topic:{' '}
              </label>{' '}
              <label htmlFor>{questions.exam_topic_db}</label>
            </div>
            <div className="total-score">
              <label htmlFor className="title-information">
                Total score:{' '}
              </label>{' '}
              <label htmlFor>
                {Number(parseFloat(questions.totalScoreDb)).toFixed(1)}
                {' (max)'}
              </label>
            </div>
            <div className="total-score">
              <label htmlFor className="title-information">
                Total question:{' '}
              </label>{' '}
              <label htmlFor>
                {quizs.length}
                {' (questions)'}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll">
        <div className="countdown">
          <label style={{ marginRight: '0.5%' }}>
            Time remaining: {timeHours}
            {':'}
            {timeMinutes}
            {':'}
            {timeSeconds}
          </label>
        </div>
      </div>
      <div className="content-exam">
        <div className="content-question">
          {quizs.map((quiz, indexQuiz) => {
            return (
              <div key={indexQuiz}>
                <div classname="ques">
                  <label name="infor_question" classname="label_infor">
                    <label className="number-ques">
                      <label
                        name="name_question"
                        style={{
                          textDecoration: 'underline',
                          marginRight: '25px',
                        }}
                      >
                        <strong>
                          Question {quiz.name_question}
                          {': '}
                        </strong>
                      </label>{' '}
                      <label name="name_question">
                        <strong>
                          {quiz.point_question} {'(points)'}
                        </strong>
                      </label>
                    </label>
                    <br />
                    <label name="question_content">
                      {quiz.question_content}
                    </label>
                  </label>
                </div>
                <div className="ans" style={{ marginLeft: '5%' }}>
                  {quiz.alternatives.map((alternative, indexAlternative) => (
                    <div key={indexAlternative}>
                      <label name="total_answer_content" key={indexAlternative}>
                        {quiz.question_type == 'yesorno' ? (
                          <input
                            type="radio"
                            name={`yesorno${indexQuiz}`}
                            value={alternative.answer_content}
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                          />
                        ) : quiz.question_type == 'onecorrect' ? (
                          <input
                            type="radio"
                            name={`onecorrect${indexQuiz}`}
                            value={alternative.code}
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                          />
                        ) : quiz.question_type == 'manycorrect' ? (
                          <input
                            type="checkbox"
                            name={`manycorrect${indexQuiz}`}
                            value={alternative.answer_content}
                            onChange={() =>
                              onChangeAlternative(indexAlternative, indexQuiz)
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            // name={`contentresult${indexQuiz}`}
                            name="answer_content"
                            className="enter-result"
                            onChange={(event) => handleAlternative(event)}
                          />
                        )}
                      </label>{' '}
                      {quiz.question_type !== 'contentresult' ? (
                        <>
                          <label>
                            {indexAlternative == 0
                              ? 'A.'
                              : indexAlternative == 1
                              ? 'B.'
                              : indexAlternative == 2
                              ? 'C.'
                              : 'D.'}
                          </label>{' '}
                          <label>{alternative.answer_content}</label>
                        </>
                      ) : null}
                      <br />
                      {quiz.question_type === 'contentresult' ? (
                        <>
                          <label>Note:</label>{' '}
                          <label>{alternative.answer_content}</label>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          {/* <div className="test-time">
            <input name="hoursubmitDb"></input>
            <br />
            <input name="minutesubmitDb"></input>
            <br />
            <input name="secondsubmitDb"></input>
            <br />
          </div> */}
        </div>
      </div>
      <div className="popup-submit">
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          SUBMIT
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div className="modal-body">
                Congratulations on completing the test !!!
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <form onSubmit={onSubmitQuestions} action="/home">
                  <button type="submit" className="btn btn-danger">
                    Submit Exam
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
