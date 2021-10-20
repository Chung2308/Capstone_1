import React from 'react'
import './ExamBank.css'
import { useEffect, useState } from 'react'
import { axios } from '@/instances/axios'
import moment from 'moment'
import { useHistory } from 'react-router'
export default function ExamBank() {
  const [questions, setQuestions] = useState([])
  const history = useHistory()
  useEffect(() => {
    async function fetchUser() {
      const id = localStorage.getItem('id')
      console.log(id)
      const response = await axios.get(`/quiz/question/`)
      setQuestions(response?.data)
      console.log('Infor Exam Bank: ', response?.data)
    }
    fetchUser()
  }, [])
  const render = (id_exam) => {
    history.push('/exam-bank-detail', id_exam)
  }
  return (
    <div className="exam-bank">
      {/* <h3>Exam Bank</h3> */}
      <div className="col">
        <table className="table table-striped table-inverse table-hover">
          <thead className="thead-inverse">
            <tr>
              <th>TOPICS</th>
              <th>ID</th>
              <th>DATE</th>
              <th>CONTENT</th>
              <th>SCORE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((value, index) => {
              return (
                <tr key={index}>
                  <td name="list_topic">{value.exam_topic_db}</td>
                  <td name="list_id">{value.id_exam}</td>
                  <td name="list_date">
                    {moment(value.exam_date_db).format('DD/MM/YYYY')}
                  </td>
                  <td>
                    <input
                      type="button"
                      value="Details"
                      onClick={() => render(value.id_exam)}
                      className="btn-details"
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="View"
                      className="btn-details"
                    ></input>
                  </td>
                  <td>
                    <div className="btn-group">
                      <div className="btn btn-danger">
                        <box-icon name="x-circle" />
                        Delete
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
