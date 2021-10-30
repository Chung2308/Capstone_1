import PropTypes from 'prop-types'
import { QUESTION_TYPE } from './question-types.enum'
import React, { useState } from 'react'

import './QuestionDetail.css'

QuestionDetail.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionBody: PropTypes.shape({
    question_content: PropTypes.string.isRequired,
    point_question: PropTypes.number.isRequired,
    question_type: PropTypes.oneOf(Object.values(QUESTION_TYPE)),
    alternatives: PropTypes.arrayOf(
      PropTypes.shape({
        answer_content: PropTypes.string,
        answer_correct: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default function QuestionDetail({
  quiz, // Đây là quiz đối tượng mà vừa lấy trong quizs (mảng)
  indexChange,
  changeQuestion,
}) {
  const [status, setStatus] = useState(true)
  const [updatedQuiz, setUpdated] = useState(quiz)
  const [quizs, setQuizs] = useState([quiz])
  const checkStatus = () => {
    if (status == true) {
      return createdQuestion()
    } else {
      return editCreatedQuestion()
    }
  }
  const editClick = () => {
    setStatus(false)
    changeQuestion(updatedQuiz, indexChange)
  }
  const editSumbit = () => {
    setStatus(true)
    changeQuestion(updatedQuiz, indexChange)
  }
  const onChangeQuiz = (event) => {
    setUpdated({ ...updatedQuiz, [event.target.name]: event.target.value })
  }
  const onChangeAlternative = (event, indexAlternative) => {
    const newAlternatives = updatedQuiz.alternatives.map((alternative, index) =>
      index === indexAlternative
        ? { ...alternative, [event.target.name]: event.target.value }
        : alternative
    )
    console.log('updatedQuiz: ', newAlternatives)
    setUpdated({ ...updatedQuiz, alternatives: newAlternatives })
  }
  const styleAnswer = {
    fontStyle: 'italic',
  }
  const deleteQuiz = (indexQuiz) => {
    // let newQuiz = [...quizs]
    // newQuiz.splice(indexQuiz)
    // setQuizs(newQuiz)
    const newQuiz = quizs.filter((item) => item.indexQuiz !== indexQuiz)
    setQuizs(newQuiz)
  }
  const createdQuestion = () => {
    return (
      <div className="row answers-container">
        <hr width="80%" />
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <span className="question-content">
            <h5>Question Content:</h5> {quiz.question_content}
            <br />
            <h5>Question Number:</h5> {quiz.name_question}
            <br />
            <h5>Question Score:</h5> <br />
            {quiz.point_question}
          </span>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="answers-group">
            <span style={styleAnswer}>Correct Answers:</span>
            <ul>
              {quiz.alternatives
                .filter((a) => a.answer_correct === true)
                .map((answer, i) => (
                  <li key={i}>{answer.answer_content}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="answers-group">
            <span style={styleAnswer}>Incorrect Answers:</span>
            <ul>
              {quiz.alternatives
                .filter((a) => a.answer_correct === false)
                .map((answer, i) => (
                  <li key={i}>{answer.answer_content}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
          <div className="answers-group action">
            <span onClick={editClick}>
              <ion-icon name="create-outline"></ion-icon>
            </span>
            {actionIcon()}
          </div>
        </div>
      </div>
    )
  }
  const editCreatedQuestion = () => {
    return (
      <div className="row answers-container">
        <hr width="80%" />
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
          <span className="question-content">
            <h5>Question Content:</h5>{' '}
            <input
              className="edit-content"
              defaultValue={quiz.question_content}
              name="question_content"
              onChange={onChangeQuiz}
            />
            <br />
            <h5>Question Number:</h5>
            <input className="edit-name" value={quiz.name_question} />
            <br />
            <h5>Question Score:</h5>
            <input
              type="number"
              step=".1"
              min={0}
              className="edit-score"
              defaultValue={quiz.point_question}
              name="point_question"
              onChange={onChangeQuiz}
            />
            <br />
            <br />
          </span>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="answers-group">
            <span style={styleAnswer}>Correct Answers:</span>
            <ul>
              {quiz.alternatives.map((answer, index) =>
                answer.answer_correct === true ? (
                  <input
                    key={index}
                    className="edit-correct-answer"
                    defaultValue={answer.answer_content}
                    onChange={(event) => onChangeAlternative(event, index)}
                    name="answer_content"
                  />
                ) : null
              )}
            </ul>
          </div>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="answers-group">
            <span style={styleAnswer}>Incorrect Answers:</span>
            <ul>
              {quiz.alternatives.map((answer, index) =>
                answer.answer_correct === false ? (
                  <input
                    key={index}
                    className="edit-incorrect-answer"
                    defaultValue={answer.answer_content}
                    name="answer_content"
                    onChange={(event) => onChangeAlternative(event, index)}
                  />
                ) : null
              )}
            </ul>
          </div>
        </div>
        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
          <div className="answers-group action">
            <span onClick={editSumbit}>
              <ion-icon name="checkmark-done-outline"></ion-icon>
            </span>
            {actionIcon()}
          </div>
        </div>
      </div>
    )
  }
  const actionIcon = () => {
    return (
      <div>
        {quizs.map((item, index) => {
          return (
            <span key={index} onClick={() => deleteQuiz(item.indexQuiz)}>
              <ion-icon name="trash-outline"></ion-icon>
            </span>
          )
        })}
      </div>
    )
  }
  return <div>{checkStatus({ quiz })}</div>
}
