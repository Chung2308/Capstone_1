import PropTypes from 'prop-types'
import { QUESTION_TYPE } from './question-types.enum'
import { useState } from 'react'

import './QuestionDetail.css'

QuestionDetail.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionBody: PropTypes.shape({
    // deleteCreatedQuestion: PropTypes.isRequired,
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

export default function QuestionDetail({ quiz, indexChange, changeQuestion }) {
  const [status, setStatus] = useState(true)
  const [updatedQuiz, setUpdated] = useState(quiz)
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
    changeQuestion(updatedQuiz, indexChange)
    setStatus(true)
  }
  const onChangeQuiz = (event) => {
    setUpdated({ ...updatedQuiz, [event.target.name]: event.target.value })
  }
  const createdQuestion = () => {
    return (
      <div className="answers-container">
        <hr width="80%" />
        <span className="question-content">
          <h5>Question Content:</h5> {quiz.question_content}
          <br />
          <h5>Question Number:</h5> {quiz.name_question}
          <br />
          <h5>Question Score:</h5> {quiz.point_question}
          <br />
          <br />
        </span>
        <div className="answers-group">
          <span>Correct Answers:</span>
          <ul>
            {quiz.alternatives
              .filter((a) => a.answer_correct === true)
              .map((answer, i) => (
                <li key={i}>{answer.answer_content}</li>
              ))}
          </ul>
        </div>
        <div className="answers-group">
          <span>Incorrect Answers:</span>
          <ul>
            {quiz.alternatives
              .filter((a) => a.answer_correct === false)
              .map((answer, i) => (
                <li key={i}>{answer.answer_content}</li>
              ))}
          </ul>
        </div>
        <div className="answers-group action">
          <span onClick={editClick}>
            <ion-icon name="create-outline"></ion-icon>
          </span>
          {actionIcon()}
        </div>
      </div>
    )
  }
  const editCreatedQuestion = () => {
    return (
      <div className="answers-container">
        <hr width="80%" />
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
        <div className="answers-group">
          <span>Correct Answers:</span>
          <ul>
            {quiz.alternatives
              .filter((a) => a.answer_correct === true)
              .map((answer, i) => (
                <li key={i} className="edit-correct-answer">
                  {answer.answer_content}
                </li>
              ))}
          </ul>
        </div>
        <div className="answers-group">
          <span>Incorrect Answers:</span>
          <ul>
            {quiz.alternatives
              .filter((a) => a.answer_correct === false)
              .map((answer, i) => (
                <li key={i} className="edit-incorrect-answer">
                  {answer.answer_content}
                </li>
              ))}
          </ul>
        </div>
        <div className="answers-group action">
          <span onClick={editSumbit}>
            <ion-icon name="checkmark-done-outline"></ion-icon>
          </span>
          {actionIcon()}
        </div>
      </div>
    )
  }
  const actionIcon = () => {
    return (
      <div>
        <span>
          <ion-icon name="trash-outline"></ion-icon>
        </span>
      </div>
    )
  }
  return <div>{checkStatus({ quiz })}</div>
}
