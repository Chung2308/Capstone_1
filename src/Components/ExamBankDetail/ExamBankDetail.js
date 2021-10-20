import React from 'react'
import './ExamBankDetail.css'
import { useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
export default function ExamBankDetail() {
  const { location } = useHistory()
  const [question, setQuestion] = useState({
    exam_date_db: '',
    exam_topic_db: '',
    hourOpenDb: '',
    minuteOpenDb: '',
    secondOpenDb: '',
    hourDueDb: '',
    minuteDueDb: '',
    secondDueDb: '',
  })
  useEffect(() => {
    async function fetchUser() {
      // const id_exam = localStorage.getItem('id_exam');
      const response = await axios.get(`/quiz/question/${location.state}`)
      setQuestion(response?.data?.question)
      console.log('infor: ', response?.data?.question)
    }
    fetchUser()
  }, [])
  const [quizs, setQuizs] = useState([])
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/quiz/question/${location.state}`)
      setQuizs(response?.data.question.quiz)
      console.log('infor: ', response?.data)
    }
    fetchUser()
  }, [])
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/quiz/question/${location.state}`)
      setAnswers(response?.data?.question.quiz.alternatives)
    }
    fetchUser()
  }, [])
  return (
    <div className="exam-details">
      <div className="header-details">
        <div className="title-exam">
          <button>Edit</button>
        </div>
        <div className="export-data">
          <button>Export Data</button>
        </div>
      </div>
      <hr />
      <div className="content-exam-details">
        <div className="infor-exam-details">
          <div className="infor-time">
            <div className="open-date">
              <label className="title" name="field_exam_date">
                Exam Date:
              </label>{' '}
              <label className="content-db" name="exam_date_db">
                {moment(question.exam_date_db).format('DD/MM/YYYY')}
              </label>
            </div>
            <div className="topics">
              <label className="title" name="field_exam_topic">
                Exam Topics:
              </label>{' '}
              <label className="content-db" name="exam_topic_db">
                {question.exam_topic_db}
              </label>
            </div>
            <div className="exam-time">
              <label className="title" name="field_open">
                Open:
              </label>{' '}
              <label className="content-db" name="exam_open_db">
                {question.hourOpenDb}
                {'h:'}
                {question.minuteOpenDb}
                {'m:'}
                {question.secondOpenDb}
                {'s'}
              </label>
            </div>
            <div className="exam-time">
              <label className="title" name="field_due">
                Due:
              </label>{' '}
              <label className="content-db" name="exam_due_db">
                {question.hourDueDb}
                {'h:'}
                {question.minuteDueDb}
                {'m:'}
                {question.secondDueDb}
                {'s'}
              </label>
            </div>
          </div>
        </div>
        <br />
        {/* <div className="question-exam-details">
          {quizs.map((quiz, index) => {
            return (
              <div key={index}>
                <div classname="ques">
                  <label name="infor_question" classname="label_infor">
                    <label name="name_question">
                      <strong>Question {quiz.name_question}</strong>
                    </label>
                    {': '}
                    <label name="question_content">
                      {quiz.question_content}
                    </label>
                    {' - '}
                    <label name="point_question">{quiz.point_question}</label>
                    {'(point)'}
                  </label>
                </div>
                <div className="ans">
                  {answers.map((answer, index) => {
                    return (
                      <div key={index}>
                        <label name="answer_content">
                          {answer.answer_content}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div> */}
        <div className="ans">
          {answers.map((answer, index) => {
            return (
              <div key={index}>
                <label name="answer_content">
                  chung chan 
                  {answer.answer_content}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
