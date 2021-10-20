import React from 'react'

export default function TestExam() {
  return (
    <div className="ques">
      <form name="infor_question" className="label_infor">
        <label>
          <strong>Question </strong>
          <input type="text" name="name_question" />
        </label>
        <label>
          <input type="text" name="content_question" />
          {' / '}
        </label>
        <label>
          <input type="text" name="point_question" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
