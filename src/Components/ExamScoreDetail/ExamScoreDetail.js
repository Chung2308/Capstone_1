import { axios } from '@/instances/axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import './ExamScoreDetail.css'

export default function ExamScoreDetail() {
  const { location } = useHistory()
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState([])
  async function fetchQuestion() {
    const response = await axios.get(
      `/quiz/results/${location.state}/${location.pathname.split('/')[2]}`
    )
    //https://trung-api-capstone1.herokuapp.com/quiz/result/id_exam/id_user
    setQuestions(response?.data?.quiz)
    setResults(response?.data?.results)
    // console.log('id_user: ', location.pathname.split('/')[2])
    console.log('id_user: ', location)
    console.log(response)
  }
  useEffect(() => {
    fetchQuestion()
  }, [])
  const updateEssayScore = (event) => {
    event.preventDefault()
  }
  return (
    <div className="exam-score-detail">
      {questions?.map((question, indexQuestion) => {
        // console.log(question)
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
                </div>
              ))}
              {results.map((quiz, indexResults) => {
                // console.log('quiz', quiz)
                return (
                  <div key={indexResults}>
                    {quiz.quiz
                      .filter((value) => value._id === question._id)
                      .map((valueQuiz, indexQuiz) => (
                        <div key={indexQuiz}>
                          {valueQuiz.alternatives.map(
                            (valueAlternatives, indexAlternatives) => (
                              <label key={indexAlternatives}>
                                {question.question_type !== 'contentresult' ? (
                                  <label
                                    className="style-answer-choosen"
                                    style={{
                                      color:
                                        valueAlternatives.answer_choosen ===
                                        valueAlternatives.answer_correct
                                          ? 'LimeGreen'
                                          : 'red',
                                    }}
                                  >
                                    {valueAlternatives.answer_choosen ===
                                    true ? (
                                      <>
                                        Answer choosen:{' '}
                                        {valueAlternatives.answer_content}{','}
                                      </>
                                    ) : null}
                                    
                                  </label>
                                ) : (
                                  <>
                                    <input
                                      value={
                                        valueAlternatives.essay_answer_content
                                      }
                                      type="text"
                                      className="add-score"
                                    />
                                    <div className="student-mark">
                                      <input
                                        type="number"
                                        step={0.1}
                                        min={0}
                                        max={10}
                                        className="mark"
                                      />{' '}
                                      Score
                                    </div>
                                  </>
                                )}
                              </label>
                            )
                          )}
                        </div>
                      ))}
                  </div>
                )
              })}
            </div>
            {/* {question.question_type === 'contentresult' ? (
              <>
                <form
                  className="update-essay-score"
                  onSubmit={(event) => {
                    updateEssayScore(event)
                  }}
                >
                  <button>Update essay score</button>
                </form>
              </>
            ) : null} */}
          </div>
        )
      })}
      <form
        className="update-essay-score"
        onSubmit={(event) => {
          updateEssayScore(event)
        }}
      >
        <button>Update essay score</button>
      </form>
    </div>
  )
}
