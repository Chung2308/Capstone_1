import { axios } from '@/instances/axios'
import React, { Component } from 'react'
import './CreateTests.css'
// import data_qs from './Question.json'
import FormQuestion from './FormQuestion/FormQuestion'

export default class CreateTests2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  //     localStorage.setItem('Question', JSON.stringify(data_qs))
  //   } else {
  //     var temp = JSON.parse(localStorage.getItem('Question'))
  //     this.setState({
  //       data_qs: temp,
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
      // totalQuestionDb,
      quiz,
    } = data
    
    const id = localStorage.getItem('id');
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
      // localStorage.setItem(username, loginData.data.jwt);
      localStorage.setItem('idExam', submitInfor.data.question.id_exam)
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

// import React , {useState, useEffect} from 'react'
// import { axios } from '@/instances/axios'
// import './CreateTests.css'
// // import data_qs from './Question.json'
// import FormQuestion from './FormQuestion/FormQuestion'

// export default function CreateTests2() {
//   const [data, setData] = useState({
//           id_exam: '',
//           exam_date_db: '',
//           exam_topic_db: '',
//           hourOpenDb: '',
//           minuteOpenDb: '',
//           secondOpenDb: '',
//           hourDueDb: '',
//           minuteDueDb: '',
//           secondDueDb: '',
//           totalScoreDb: '',
//           quiz: '',
//   })
//   useEffect(() => {
//     async function fetchUser() {
//       // const id=localStorage.getItem('id')
//       const response=await axios.post(`/quiz/question/`)
//       setData(response?.data?.data)
//       console.log('create: ',response?.data?.data )
//     }
//     fetchUser()
//   }, [])
//   const submitQuestion = async (data) =>{

//   }
//   return (
//     <div>
//       <FormQuestion onSubmitForm={this.submitQuestion}></FormQuestion>
//     </div>
//   )
// }
