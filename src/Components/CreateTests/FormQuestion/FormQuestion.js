import React, { Component } from 'react'
import './FormQuestion.css'

import QuestionDetail from '../QuestionDetail'

// simulate data, this will be replaced with
// real data fetch from backend
import { TOPICS } from '../topics.mock'
import {
  QUESTION_TYPE_DESCRIPTION,
  QUESTION_TYPE,
} from '../question-types.enum'

import { YesNoFormQuestion } from './components/YesNo.FormQuestion'
import { OneCorrectFormQuestion } from './components/OneCorrect.FormQuestion'
import { EnterResultFormQuestion } from './components/EnterResult.FormQuestion'
import { ManyCorrectFormQuestion } from './components/ManyCorrect.FormQuestion'
import { HOUROPEN } from '../hourOpen.mock'
import { MINUTEOPEN } from '../minuteOpen.mock'
import { SECONDOPEN } from '../secondOpen.mock'
import { HOURDUE } from '../hourDue.mock'
import { MINUTEDUE } from '../minuteDue.mock'
import { SECONDDUE } from '../secondDue.mock'

export default class FormQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: TOPICS,
      topicChoosen: 'Mathematics',

      hourOpen: HOUROPEN,
      hourOpenChoosen: 0,

      minuteOpen: MINUTEOPEN,
      minuteOpenChoosen: 0,

      secondOpen: SECONDOPEN,
      secondOpenChoosen: 0,

      hourDue: HOURDUE,
      hourDueChoosen: 0,

      minuteDue: MINUTEDUE,
      minuteDueChoosen: 0,

      secondDue: SECONDDUE,
      secondDueChoosen: 0,

      questionTypeDescriptions: Object.entries(QUESTION_TYPE_DESCRIPTION),

      questions: [],

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
      // totalQuestionDb: '',
      quizs: [],
      question_content: '',
      point_question: '',
      alternatives: [],
      question_type: QUESTION_TYPE.YES_NO,
    }
  }
  onPointChange(ev) {
    this.setState({
      ...this.state,
      point_question: ev.target.value,
    })
  }

  changeQuestionForm(ev) {
    const formCode = QUESTION_TYPE[ev.target.value]
    this.setState({
      question_type: formCode,
    })
  }

  changeQuestionContent(ev) {
    this.setState({
      ...this.state,
      question_content: ev.target.value,
    })
  }

  /**
    Return true if create question success, otherwise return false
  */
  changeQuestionBody(question) {
    const { question_content, point_question } = this.state
    const valid = this.validateQuestionBody()
    if (!valid) return false
    // question = {
    //   ...question,
    //   question_content: question_content,
    // }
    // question = {
    //   ...question,
    //   point_question: point_question,
    // }

    this.setState({
      ...this.state,
      alternatives: question.alternatives,
      // questions: newQuestionsList,
    })
    return true
  }
  totalCreateQuestion() {
    this.createQuestion()
    this.sumPoint()
  }
  createQuestion() {
    const { question_content, point_question, alternatives } = this.state
    const valid = this.validateQuestionBody()
    if (valid === false) return

    if (alternatives.length == 0)
      return alert('Please choose at least one correct answer')
    // else if (
    //   alternatives.filter((item) =>
    //     item.answer_content.toString() != '' ? true : false
    //   ).length != alternatives.length
    // )
    // return alert('The answer are not empty')
    console.log(
      alternatives.filter((item) =>
        item.answer_content.toString() != '' ? true : false
      )
    )
    this.state.quizs.push({
      question_content,
      point_question,
      name_question: this.state.quizs.length + 1,
      alternatives: this.state.alternatives,
    })
    this.setState({
      ...this.state,
      question_content: '',
      point_question: 0,
      question_type: QUESTION_TYPE.YES_NO,
    })
    console.log(this.state)

    // if (!state.this.answer_corre)
    //  return alert('Please enter the point of the question first')

    // const { questions, currentQuestionBody } = this.state

    // const valid = this.validateQuestionBody()
    // if (!valid) return false

    // if (
    //   !currentQuestionBody.alternatives?.some((a) => a.answer_correct === true)
    // ) {
    //   alert('Please choose at least one correct answer')
    //   return false
    // }

    // this.setState({
    //   currentQuestionBody: DEFAULT_QUESTION_BODY,
    //   questions: questions.concat(currentQuestionBody),
    // })
    // console.log(currentQuestionBody)
  }
  validateQuestionBody() {
    const { question_content, point_question } = this.state

    if (!question_content) {
      alert('Please enter the content of the question first')
      return false
    }
    if (!point_question) {
      alert('Please enter the point of the question first')
      return false
    }
    return true
  }
  Ma_code() {
    const chuoi_random = '0123456789'
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    function GetchuoiRandom(length, base) {
      let result = ''
      const baseLength = base.length
      for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(0, baseLength)
        result += base[randomIndex]
      }
      return result
    }
    var macode = GetchuoiRandom(6, chuoi_random)
    this.setState({
      id_exam: macode,
    })
  }
  deleteCreatedQuestion(idFormQuestionDetail) {
    // const {currentQuestionBody} = this.state
    // var dataQuestion=this.state.dataQuestion
    // dataQuestion.forEach((value, i)=>{
    //   if(value.i === idFormQuestionDetail){
    //     dataQuestion=dataQuestion.filter(value=>value.i!=idFormQuestionDetail)
    //   }
    // })
    // const dataQuestion = this.state.currentQuestionBody.filter(
    //   (currentQuestionBody) => {
    //     return currentQuestionBody !== idFormQuestionDetail
    //   }
    // )
    // this.setState({
    //   currentQuestionBody: [...dataQuestion],
    // })
  }
  handleExamDateChange(event) {
    this.setState({
      exam_date_db: event.target.value,
    })
  }
  handleExamIdChange(event) {
    this.setState({
      id_exam: event.target.value,
    })
  }
  handleExamTopicChange(event) {
    this.setState({
      exam_topic_db: event.target.value,
    })
  }
  handleExamContentChange(event) {
    this.setState({
      question_content: event.target.value,
    })
  }
  handleExamHourOpenChange(event) {
    this.setState({
      hourOpenDb: event.target.value,
    })
  }
  handleExamMinuteOpenChange(event) {
    this.setState({
      minuteOpenDb: event.target.value,
    })
  }
  handleExamSecondOpenChange(event) {
    this.setState({
      secondOpenDb: event.target.value,
    })
  }
  handleExamHourDueChange(event) {
    this.setState({
      hourDueDb: event.target.value,
    })
  }
  handleExamMinuteDueChange(event) {
    this.setState({
      minuteDueDb: event.target.value,
    })
  }
  handleExamSecondDueChange(event) {
    this.setState({
      secondDueDb: event.target.value,
    })
  }
  handleExamTotalScoreChange(event){
    this.setState({
      totalScoreDb: event.target.value,
    })
  }
  sumPoint() {
    var obj = this.state.quizs
    var sum = 0
    obj.map((value) => {
      sum = sum + parseFloat(value.point_question)
      return sum
    })
    this.setState({
      totalScoreDb: sum,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = {
      id_exam: this.state.id_exam,
      exam_date_db: this.state.exam_date_db,
      exam_topic_db: this.state.exam_topic_db,
      hourOpenDb: this.state.hourOpenDb,
      minuteOpenDb: this.state.minuteOpenDb,
      secondOpenDb: this.state.secondOpenDb,
      hourDueDb: this.state.hourDueDb,
      minuteDueDb: this.state.minuteDueDb,
      secondDueDb: this.state.secondDueDb,
      totalScoreDb: this.state.totalScoreDb,
      quiz: this.state.quizs,
    }
    this.props.onSubmitForm(data)
  }

  render() {
    // console.log(this.state.questions)
    // console.log(this.state.khoitao)
    // console.log(this.state.exam_due_db)
    return (
      <div>
        <div className="create-test">
          <div className="infor-questions">
            <h4>Question Information</h4>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="time-open">
                  <label className="lable-1">Exam Date: </label>
                  <input
                    onChange={(event) => {
                      this.handleExamDateChange(event)
                    }}
                    type="date"
                    name="exam_date_db"
                    className="cel2"
                  />
                </div>
                <div className="topics">
                  <label className="lable-1">Exam topics: </label>
                  <select
                    value={this.state.name}
                    name="topic"
                    className="cel2"
                    onChange={(event) => {
                      this.handleExamTopicChange(event)
                    }}
                  >
                    {this.state.topics?.map((topicChoosen, i) => (
                      <option key={i} value={topicChoosen.name} name="topic">
                        {topicChoosen.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="id-test">
                  <h5>
                    <label name="field_id">Exam ID: </label>
                    <ion-icon
                      className="icon"
                      name="push-outline"
                      onClick={() => this.Ma_code()}
                    ></ion-icon>
                    <input
                      onChange={(event) => {
                        this.handleExamIdChange(event)
                      }}
                      type="number"
                      className="cel2"
                      name="id_exam"
                      value={this.state.id_exam}
                    />
                  </h5>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div>
                  <div className="exam-time">
                    <label className="lable-1">Open: </label>
                    <label>
                      <label>
                        Hour{' '}
                        <select
                          name="hourOpenDb"
                          value={this.state.name}
                          onChange={(event) =>
                            this.handleExamHourOpenChange(event)
                          }
                        >
                          {this.state.hourOpen?.map((hourOpenChoosen, i) => (
                            <option
                              key={i}
                              value={hourOpenChoosen.name}
                              name="hourOpenDb"
                            >
                              {hourOpenChoosen.name}
                            </option>
                          ))}
                        </select>
                      </label>{' '}
                      <label>
                        Minute{' '}
                        <select
                          name="minuteOpenDb"
                          value={this.state.name}
                          onChange={(event) => {
                            this.handleExamMinuteOpenChange(event)
                          }}
                        >
                          {this.state.minuteOpen?.map(
                            (minuteOpenChoosen, i) => (
                              <option
                                key={i}
                                value={minuteOpenChoosen.name}
                                name="minuteOpenDb"
                              >
                                {minuteOpenChoosen.name}
                              </option>
                            )
                          )}
                        </select>
                      </label>{' '}
                      <label>
                        Second{' '}
                        <select
                          name="secondOpenDb"
                          value={this.state.name}
                          onChange={(event) =>
                            this.handleExamSecondOpenChange(event)
                          }
                        >
                          {this.state.secondOpen?.map(
                            (secondOpenChoosen, i) => (
                              <option
                                key={i}
                                value={secondOpenChoosen.name}
                                name="secondOpenDb"
                              >
                                {secondOpenChoosen.name}
                              </option>
                            )
                          )}
                        </select>
                      </label>
                    </label>
                  </div>
                  <div className="exam-time">
                    <label className="lable-1">Due: </label>
                    <label>
                      Hour{' '}
                      <select
                        name="hourDueDb"
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamHourDueChange(event)
                        }}
                      >
                        {this.state.hourDue?.map((hourDueChoosen, i) => (
                          <option
                            key={i}
                            value={hourDueChoosen.name}
                            name="hourDueDb"
                          >
                            {hourDueChoosen.name}
                          </option>
                        ))}
                      </select>
                    </label>{' '}
                    <label>
                      Minute{' '}
                      <select
                        name="minuteDueDb"
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamMinuteDueChange(event)
                        }}
                      >
                        {this.state.minuteDue?.map((minuteDueChoosen, i) => (
                          <option
                            key={i}
                            value={minuteDueChoosen.name}
                            name="minuteDueDb"
                          >
                            {minuteDueChoosen.name}
                          </option>
                        ))}
                      </select>
                    </label>{' '}
                    <label>
                      Second{' '}
                      <select
                        name="secondDueDb"
                        value={this.state.name}
                        onChange={(event) => {
                          this.handleExamSecondDueChange(event)
                        }}
                      >
                        {this.state.secondDue?.map((secondDueChoosen, i) => (
                          <option
                            key={i}
                            value={secondDueChoosen.name}
                            name="secondDueDb"
                          >
                            {secondDueChoosen.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-questions">
          <h5>Content Questions</h5>
          <div className="row" id="rowclone">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 row-1">
              <div className="question-number">
                <label className="label-2">Question number: </label>
                <input
                  value={this.state.quizs.length + 1}
                  type="number"
                  required
                  name="question_number"
                  min={1}
                  step="any"
                  className="cel-2-2"
                />
              </div>
              <div className="type-question">
                <label className="label-2">Type of questions: </label>
                <select
                  name="type_question"
                  id="option1"
                  className="cel-2-2"
                  onChange={(event) => this.changeQuestionForm(event)}
                >
                  {this.state.questionTypeDescriptions?.map(
                    ([name, description], i) => (
                      <option key={i} value={name}>
                        {description}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="points">
                <label className="label-2">Score factor:</label>
                <input
                  // onChange={(event) => this.isChange2(event)}
                  type="number"
                  // required
                  name="point"
                  min={0}
                  // defaultValue={0}
                  step=".1"
                  className="cel-2-2"
                  onChange={(ev) => {
                    this.onPointChange(ev)
                  }}
                  value={this.state?.point_question}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 row-2">
              <div>
                <input
                  type="text"
                  value={this.state?.question_content}
                  onChange={(event) => this.changeQuestionContent(event)}
                  name="ques"
                  placeholder="Content Question: "
                  className="content-inf"
                />
              </div>

              <FormQuestionSwitch
                choosenForm={this.state.question_type}
                changeQuestionBody={(ques) => this.changeQuestionBody(ques)}
              />
            </div>
          </div>
          <div className="action-questions">
            <div className="add-question">
              <button
                className="btn-icon"
                onClick={() => this.totalCreateQuestion()}
              >
                <ion-icon name="add-circle-outline" id="iconadd" />
              </button>
            </div>
          </div>
          <div className="sumary">
            <label>Total questions: </label>
            <input
              type="number"
              // min={1}
              // defaultValue={1}
              name="total_number"
              value={this.state.quizs.length}
            />
            <br />
            <label>Total score: </label>
            <input
              type="number"
              min={0}
              step=".1"
              defaultValue={0}
              max={10}
              name="totalScoreDb"
              value={this.state.totalScoreDb}
              onChange={(event) => {
                this.handleExamTotalScoreChange(event)
              }}
            />
          </div>

          <div className="created-questions">
            {/* {this.state.questions?.map((ques, i) => (
              <QuestionDetail
                key={i}
                questionScore={ques.point_question}
                questionNumber={i + 1}
                questionBody={ques}
                quiz={}
              ></QuestionDetail>
            ))} */}
            {this.state.quizs?.map((quiz, index) => (
              <QuestionDetail
                key={index}
                quiz={quiz}
              ></QuestionDetail>
            ))}
          </div>
        </div>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event)
          }}
        >
          <div className="save">
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    )
  }
}

function FormQuestionSwitch({ choosenForm, ...rest }) {
  switch (choosenForm) {
    case QUESTION_TYPE.YES_NO:
      return <YesNoFormQuestion {...rest} />
    case QUESTION_TYPE.MANY_CORRECT:
      return <ManyCorrectFormQuestion {...rest} />
    case QUESTION_TYPE.ONE_CORRECT:
      return <OneCorrectFormQuestion {...rest} />
    default:
      return <EnterResultFormQuestion {...rest} />
  }
}
