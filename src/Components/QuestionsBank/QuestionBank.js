import { axios } from '@/instances/axios'
import React from 'react'
import './QuestionBank.css'
import { useState, useEffect } from 'react'

export default function QuestionBank() {
  const [quiz, setQuiz] = useState({})
  const [quizs, setQuizs] = useState([])
  const [question, setQuestion] = useState({})
  const [questions, setQuestions] = useState([])
  async function fetchQuestionBank() {
    const response = await axios.get(`/quiz/question`)
    setQuestions(response?.data)
    setQuizs(response?.data)
    console.log('topic: ', response)
  }
  useEffect(() => {
    fetchQuestionBank()
  }, [])
  return (
    <div className="question-bank">
      {questions.map((topic, indexTopic) => {
        return (
          <div key={indexTopic}>
            <div className="topics">
              <label htmlFor>Topic {indexTopic + 1}</label>
              {'. '}
              <label htmlFor name="exam_topic">
                {topic.exam_topic_db}
              </label>
            </div>
            <div className="question-content">
              {quizs.map((quiz, indexQuiz) => (
                <div className="total-question" key={indexQuiz}>
                  <label htmlFor style={{ textDecoration: 'underline' }}>
                    Question {indexQuiz + 1}
                    {'. '}
                  </label>{' '}
                  <label htmlFor>{quiz.exam_date_db}</label>
                  <br />
                  {/* <div className="answer-content">
                    {quiz.alternatives.map((alternative, indexAlternative) => (
                      <div
                        className="total-answer"
                        key={indexAlternative}
                        style={{ marginLeft: '4%' }}
                      >
                        {quiz.question_type !== 'contentresult' ? (
                          <>
                            <label>
                              {indexAlternative == 0
                                ? 'A'
                                : indexAlternative == 1
                                ? 'B'
                                : indexAlternative == 2
                                ? 'C'
                                : 'D'}
                            </label>
                            {'. '}
                            <label>{alternative.answer_content}</label>
                          </>
                        ) : null}
                      </div>
                    ))}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
