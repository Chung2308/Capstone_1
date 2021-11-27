import { axios } from '@/instances/axios'
import React, { Component } from 'react'
import './CreateTests.css'
// import dataQuestion from './Question.json'
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
  // componentWillUnmount() {
  //   if (localStorage.getItem('Question') === null) {
  //     localStorage.setItem('Question', JSON.stringify(dataQuestion))
  //   } 
  //   else {
  //     var temp = JSON.parse(localStorage.getItem('Question'))
  //     this.setState({
  //       dataQuestion: temp,
  //     })
  //   }
  // }
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
    // if (submitInfor.data?.jwt) {
    //   localStorage.setItem('idExam', submitInfor.data.question.id_exam)
    // }
    if (submitInfor.data?.success === false) {
      alert(submitInfor.data?.message?.errors?.message)
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