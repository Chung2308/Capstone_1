import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { QUESTION_TYPE } from './question-types.enum'

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

// const deleteCreatedQuestionButton (idFormQuestionDetail) {
//   props.deleteCreatedQuestion(idFormQuestionDetail);
// }

export default function QuestionDetail({ quiz }) {
  return (
    <div className="answers-container">
      <hr width="80%" />
      <span className="question-content">
        <h5>Question Content:</h5> {quiz.question_content}
        <br />
        <h5>Question Number:</h5> {quiz.name_question}
        <br />
        <h5>Question Score:</h5> {quiz.point_question}
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
        {/* <span>
          <ion-icon name="create-outline"></ion-icon>
        </span> */}
        <span>
          <ion-icon
            name="trash-outline"
            // onClick={questionBody.deleteCreatedQuestion}
          ></ion-icon>
        </span>
      </div>
    </div>
  )
}

// export default function QuestionDetail({
//   questionScore,
//   questionNumber,
//   questionBody,
// }) {
//   const [obj, setObj] = useState()

//   const content = (event) => {
//     event.preventDefault()
//     setObj({ ...obj, [event.target.name]: event.target.value })
//   }
//   const callTest = () => {
//     console.log('Hello')

//   }
//   useEffect(() => {
//     callTest()
//   }, [])
//   return (
//     <div className="answers-container">
//       <hr width="80%" />
//       <span className="question-content">
//         <h5>Question Content:</h5> {questionBody.question_content}
//         <br />
//         <h5>Question Number:</h5> {questionNumber}
//         <br />
//         <h5>Question Score:</h5> {questionScore}
//       </span>
//       <div className="answers-group">
//         <span>Correct Answers:</span>
//         <ul>
//           {questionBody.alternatives
//             .filter((a) => a.answer_correct === true)
//             .map((answer, i) => (
//               <li key={i}>{answer.answer_content}</li>
//             ))}
//         </ul>
//       </div>
//       <div className="answers-group">
//         <span>Incorrect Answers:</span>
//         <ul>
//           {questionBody.alternatives
//             .filter((a) => a.answer_correct === false)
//             .map((answer, i) => (
//               <li key={i}>{answer.answer_content}</li>
//             ))}
//         </ul>
//       </div>
//       <div className="answers-group action">
//         <span>
//           <ion-icon name="create-outline"></ion-icon>
//         </span>
//         <span>
//           <ion-icon
//             name="trash-outline"
//             onClick={questionBody.deleteCreatedQuestion}
//           ></ion-icon>
//         </span>
//       </div>
//     </div>
//   )
// }

/*export default class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      //type 2
      isChecked: this.props.status_tral1_type2_props2,
      isChecked2: this.props.status_tral2_type2_props2,
      isChecked3: this.props.status_tral3_type2_props2,
      isChecked4: this.props.status_tral4_type2_props2,
      //type 3
      // isChecked5: this.props.status_tral1_type3_props2,
      // isChecked6: this.props.status_tral2_type3_props2,
    };
  }
  Check_value_answer() {
    if (this.props.loai_cauhoi_props == 1) {
      return this.Show_question_1();
    } else if (this.props.loai_cauhoi_props == 2) {
      return this.Show_question_2();
    } else if (this.props.loai_cauhoi_props == 3) {
      return this.Show_question_3();
    } else if (this.props.loai_cauhoi_props == 4) {
      return this.Show_question_4();
    }
  }
  Show_question_1() {
    return (
      <div className="answ">
        <input type="radio" name="question_type1_ans" defaultValue="yes" />{" "}
        <label name="content_question_type1_ans"> Yes </label>
        <br />
        <input type="radio" name="question_type1_ans" defaultValue="no" />{" "}
        <label name="content_question_type1_ans"> No </label>
        <br />
      </div>
    );
  }
  isCheck() {
    this.setState({
      isChecked: !this.state.isChecked,
      isChecked2: !this.state.isChecked2,
      isChecked3: !this.state.isChecked3,
      isChecked4: !this.state.isChecked4,
    });
    // console.log(this.state.isChecked);
  }
  // isCheck3() {
  //   this.setState({
  //     isChecked5: true,
  //     isChecked6: true
  //   });
  // }
  Show_question_2() {
    return (
      <div className="answ">
        <input
          type="checkbox"
          defaultChecked={this.props.status_tral1_type2_props2}
          onClick={(value2) => this.isCheck(value2)}
          name="question_type2"
          defaultValue="a"
        />{" "}
        <label name="content_question_type2">{this.props.traloi1_props} </label>
        <br />
        <input
          type="checkbox"
          name="question_type2"
          defaultValue="b"
          defaultChecked={this.props.status_tral2_type2_props2}
          onClick={(value2) => this.isCheck(value2)}
        />{" "}
        <label name="content_question_type2">
          {this.props.traloi2_type2_props}
        </label>
        <br />
        <input
          type="checkbox"
          name="question_type2"
          defaultValue="c"
          defaultChecked={this.props.status_tral3_type2_props2}
          onClick={(value2) => this.isCheck(value2)}
        />{" "}
        <label name="content_question_type2">
          {this.props.traloi3_type2_props}
        </label>
        <br />
        <input
          type="checkbox"
          name="question_type2"
          defaultValue="d"
          defaultChecked={this.props.status_tral4_type2_props2}
          onClick={(value2) => this.isCheck(value2)}
        />{" "}
        <label name="content_question_type2">
          {this.props.traloi4_type2_props}
        </label>
        <br />
      </div>
    );
  }
  Show_question_3() {
    return (
      <div className="answ">
        <input
          type="radio"
          name="question_type3_ans"
          defaultValue="a"
          // defaultChecked={this.props.status_tral1_type3_props2}
          // onClick={(value3) => this.isCheck3(value3)}
        />{" "}
        <label name="content_question_type3_ans">
          {this.props.traloi1_type3_props}
        </label>
        <br />
        <input
          type="radio"
          name="question_type3_ans"
          defaultValue="b"
          // defaultChecked={this.props.status_tral2_type3_props2}
          // onClick={(value3) => this.isCheck3(value3)}
        />{" "}
        <label name="content_question_type3_ans">
          {this.props.traloi2_type3_props}
        </label>
        <br />
        <input type="radio" name="question_type3_ans" defaultValue="c" />{" "}
        <label name="content_question_type3_ans">
          {this.props.traloi3_type3_props}
        </label>
        <br />
        <input type="radio" name="question_type3_ans" defaultValue="d" />{" "}
        <label name="content_question_type3_ans">
          {this.props.traloi4_type3_props}
        </label>
        <br />
      </div>
    );
  }
  Show_question_4() {
    return (
      <div className="answ">
        <input
          type="text"
          name="question_type4"
          placeholder="Content answers: "
          className="input-2-type-4"
        />
      </div>
    );
  }
  editQuestion() {}
  removeQuestion() {
    let remove_question = document.getElementsByClassName("answ");
    remove_question.remove();
  }
  render() {
    // console.log("trang thai" + this.Ktra_Checked());
    console.log(this.state.isChecked);
    return (
      <div className="type-1" id="type1">
        <div className="ques">
          <label name="infor_question" className="label_infor">
            <label name="name_question">
              <strong>Question {this.props.ques_number_props}: </strong>
            </label>
            <label name="content_question">
              {this.props.cauhoi_props} {" / "}
            </label>
            <label className="point_question">
              {this.props.ques_point_props}
            </label>
          </label>
        </div>
        {this.Check_value_answer()}
        <div className="action">
          <ion-icon name="create-outline"></ion-icon>
          <ion-icon name="trash-outline"></ion-icon>
        </div>
      </div>
    );
  }
}
*/
