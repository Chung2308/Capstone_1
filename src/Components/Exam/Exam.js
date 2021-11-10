import React from 'react'
import './Exam.css'
import { useRef, useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import { useHistory } from 'react-router'
import SplitSearch from '../../Utils/SplitSearch'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

export default function Exam() {
  const { location } = useHistory()
  const [questions, setQuestions] = useState({})
  const [quizs, setQuizs] = useState([])
  const [search, setSearch] = useState(SplitSearch(location.search))

  //Countdown
  const [timeHours, setTimeHours] = useState('00')
  const [timeMinutes, setTimeMinutes] = useState('00')
  const [timeSeconds, setTimeSeconds] = useState('00')

  async function fetchExamRoom() {
    const response = await axios.get(`/quiz/question/${search.room}`)
    console.log('response: ', response)
    setQuestions({ ...response?.data?.question })
    startTimer({ ...response?.data.question })
    setQuizs(response?.data?.question.quiz)
  }

  useEffect(() => {
    fetchExamRoom()
  }, [])

  let interval = useRef()

  const startTimer = (questions) => {
    const styleTime = {
      border: '1px solid red',
      borderRadius: '5px',
      backgroundColor: 'red',
    }
    interval = setInterval(() => {
      const currentDate = Date.parse(
        `${questions.exam_date_db?.split('T')[0]}T${questions.hourDueDb}:${
          questions.minuteDueDb
        }:${questions.secondDueDb}`
      )

      const time = currentDate - Date.now()

      if (time < 0) {
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

  const onChangeAlternative = (indexAlternative, indexQuiz) => {
    const newQuizs = quizs.map((quiz, index) => {
      if (index === indexQuiz) {
        return {
          ...quiz,
          alternatives: quiz.alternatives.map((alternative, index) => {
            if (index === indexAlternative)
              return { ...alternative, answer_choosen: true }
            else return { ...alternative }
          }),
        }
      } else return quiz
    })
    setQuizs(newQuizs)
  }
  
  const onSubmitQuestions = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/result/', {
        ...questions,
        quiz: quizs,
      })
      console.log('submit: ', response)
      if (response.data?.success === false) {
        alert(response.data?.message)
      }
    } catch (error) {
      alert('Error Internet')
    }
  }
  console.log('quizs: ', quizs)
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
                {/* {questions.totalScoreDb} */}
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
      <div className="countdown">
        <label style={{ marginRight: '0.5%' }}>
          Time remaining: {timeHours}
          {':'}
          {timeMinutes}
          {':'}
          {timeSeconds}
        </label>
      </div>
      <div className="content-exam">
        <div className="content-question">
          {quizs.map((quiz, indexQuiz) => {
            return (
              <div key={indexQuiz}>
                <div classname="ques">
                  <label name="infor_question" classname="label_infor">
                    <label className="number-ques">
                      <label name="name_question">
                        <strong>
                          Question {quiz.name_question}
                          {': '} {quiz.point_question} {'(points)'}
                        </strong>
                      </label>
                    </label>
                    <br />
                    <label name="question_content">
                      {quiz.question_content}
                    </label>
                  </label>
                </div>
                <div className="ans">
                  {quiz.alternatives.map((alternative, indexAlternative) => (
                    <div key={indexAlternative}>
                      <label name="answer_content" key={indexAlternative}>
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
                            name={`contentresult${indexQuiz}`}
                            className="enter-result"
                          />
                        )}
                      </label>{' '}
                      {quiz.question_type !== 'contentresult' ? (
                        <>
                          <label>
                            {indexAlternative == 0
                              ? 'A.    '
                              : indexAlternative == 1
                              ? 'B. '
                              : indexAlternative == 2
                              ? 'C. '
                              : 'D. '}
                          </label>
                          <label>{alternative.answer_content}</label>
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <form onSubmit={onSubmitQuestions} className="save">
        <button type="submit">SUBMIT</button>
      </form> */}
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
