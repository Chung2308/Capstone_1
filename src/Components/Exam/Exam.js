import React from 'react'
import './Exam.css'

export default function Exam() {
  return (
    <div className="exam">
      <div className="infor-exam">
        <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="exam-date">
              <label htmlFor>Exam Date: </label>
              <label htmlFor>DB - Create Test</label>
            </div>
            <div className="exam-topic">
              <label htmlFor>Topic: </label>
              <label htmlFor>DB - Create Test</label>
            </div>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="time">
              <label htmlFor>Time: </label>
              <label htmlFor>DB - Create Test</label>
            </div>
            <div className="time-remaining">
              <label htmlFor>Time remaining: </label>
              <label htmlFor>DB - Create Test</label>
            </div>
          </div>
        </div>
      </div>
      <div className="content-exam">
        <div className="content-question"></div>
        <div className="content-answer"></div>
      </div>
    </div>
  )
}
