{/*
import { axios } from '@/instances/axios'
import React, { Component } from 'react'
import './CreateTests.css'
import FormQuestion from './FormQuestion/FormQuestion'

export default class CreateTests2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item : [],
      id_exam: '',
      exam_date_db: '',
      exam_topic_db: '',
      hourOpenDb: '',
      minuteOpenDb: '',
      secondOpenDb: '',
      hourDueDb: '',
      minuteDueDb: '',
      secondDueDb: '',
      totalScoreDb: '',
    }
  }

  content(event) {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    this.setState({
      ...this.state,
      [name]: value,
    })
  }
  async submitQuestion(data) {
    const {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    } = data
    
    const submitInfor = await axios.post(`/quiz/question/`, {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    })
    console.log(submitInfor)
    if (submitInfor.data?.jwt) {
      localStorage.setItem('idExam', submitInfor.data.question.id_exam)
    }
    if (submitInfor.data?.success === false) {
      alert('submitInfor.data?.message')
    }
  }
  render() {
    return (
      <div>
        <FormQuestion onSubmitForm={this.submitQuestion}></FormQuestion>
      </div>
    )
  }
}

*/}
import React from 'react'
import './CreateTests.css'
import FormQuestion from './FormQuestion/FormQuestion'
import { axios } from '@/instances/axios'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

export default function CreateTest2() {

  const history = useHistory()
  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Student') history.push('/not-view')
  }
  useEffect(()=>{
    loadUser()
  })
  const submitQuestion = async (data) => {
    const {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    } = data
    const submitInfor = await axios.post(`/quiz/question/`, {
      id_exam,
      exam_date_db,
      exam_topic_db,
      hourOpenDb,
      minuteOpenDb,
      secondOpenDb,
      hourDueDb,
      minuteDueDb,
      secondDueDb,
      totalScoreDb,
      quiz,
    })
    console.log(submitInfor)
    if (submitInfor.data?.jwt) {
      localStorage.setItem('idExam', submitInfor.data.question.id_exam)
    }
    if (submitInfor.data?.success === false) {
      alert('submitInfor.data?.message')
    }
  }
  return (
    <div>
      <FormQuestion onSubmitForm={submitQuestion}></FormQuestion>
    </div>
  )
}
