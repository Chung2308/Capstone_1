import { axios } from '@/instances/axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './ExamScoreDetail.css'

export default function ExamScoreDetail() {
  const { location } = useHistory()
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState([])
  async function fetchQuestion() {
    const response = await axios.get(`/quiz/result/${location.state}`)
    setQuestions(response?.data?.quiz)
    setResults(response?.data?.results)
    console.log('location: ', location.state)
  }
  useEffect(() => {
    fetchQuestion()
  }, [])
  const updateEssayScore = (event) => {
    event.preventDefault()
  }
  return (
    <div className="exam-score-detail">
      {questions.map((question, indexQuestion) => {
        return (
          <div className="total-question" key={indexQuestion}>
            <label className="question">
              Question {indexQuestion + 1}
              {'. '}
            </label>{' '}
            <label className="infor-question">
              {question.point_question}
              {' (points)'}
            </label>
            <br />
            <label>{question.question_content}</label>
            <br />
            <div className="answer-content">
              {question.alternatives.map((alternative, indexAlternative) => (
                <div
                  className="total-answer"
                  key={indexAlternative}
                  style={{
                    marginLeft: '4%',
                    fontWeight: alternative.answer_correct ? 'bold' : 'none',
                  }}
                >
                  {question.question_type !== 'contentresult' ? (
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
                  {question.question_type === 'contentresult' ? (
                    <>
                      <input
                        value={alternative.answer_content}
                        type="text"
                        className="add-score"
                      />
                      <div className="student-mark">
                        Mark:{' '}
                        <input
                          type="number"
                          step={0.1}
                          min={0}
                          max={10}
                          className="mark"
                        />
                      </div>
                    </>
                  ) : null}
                  {/* {results.map((quiz, indexResults) => (
                    <label key={indexResults}>
                      {quiz.quiz.map((valueQuiz, indexQuiz) => (
                        <label key={indexQuiz}>
                          {valueQuiz.alternatives.map(
                            (valueAlternatives, indexAlternatives) => (
                              <label
                                key={indexAlternatives}
                                style={{
                                  color: valueAlternatives.answer_choosen
                                    ? 'red'
                                    : 'black',
                                }}
                              >{valueAlternatives.answer_choosen}</label>
                            )
                          )}
                        </label>
                      ))}
                    </label>
                  ))} */}
                </div>
              ))}
              {question.question_type === 'contentresult' ? (
                <>
                  <form
                    className="update-essay-score"
                    onSubmit={updateEssayScore()}
                  >
                    <button>Update essay score</button>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
