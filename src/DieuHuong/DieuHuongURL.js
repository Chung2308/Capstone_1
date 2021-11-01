import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateTests2 from '../Components/CreateTests/CreateTests2'
import Exam from '../Components/Exam/Exam'
import ExamBank from '../Components/ExamBank/ExamBank'
import ExamBankDetail from '../Components/ExamBankDetail/ExamBankDetail'
import Home from '../Components/Home/Home'
import IntoRoom from '../Components/IntoRoom/IntoRoom'
import Nav from '../Components/Nav/Nav'
import Profile from '../Components/Profile/Profile'
import Resources from '../Components/Resources/Resources'
import ScoreStatistics from '../Components/ScoreStatistics/ScoreStatistics'
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'
import WaitingRoom from '../Components/WaitingRoom/WaitingRoom'

export default class DieuHuongURL extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isAuthentication: false,
  //   }
  // }
  // checkToken = () => {
  //     const local = localStorage['userToken'];
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${local}`;
  //     const verifytoken = await axios.get('https://trung-api-capstone1.herokuapp.com/auth');
  //     if (verifytoken.success == true){
  //         this.setState({ ...this.state, [this.state.isAuthentication]: true });
  //         localStorage.setItem('userToken',verifytoken.token);
  //     }
  //     else
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${local}`;
  // }
  // useEffect(checkToken, []);

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/home">
            <Nav></Nav>
            <Home></Home>
          </Route>
          <Route exact path="/sign-up">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/profile">
            <Nav></Nav>
            <Profile></Profile>
          </Route>
          <Route exact path="/resources">
            <Nav></Nav>
            <Resources></Resources>
          </Route>
          <Route exact path="/create-test">
            <Nav></Nav>
            <CreateTests2></CreateTests2>
          </Route>
          <Route exact path="/into-room">
            <Nav></Nav>
            <IntoRoom></IntoRoom>
          </Route>
          <Route exact path="/waiting-room">
            <Nav></Nav>

            <WaitingRoom></WaitingRoom>
          </Route>
          <Route exact path="/exam-bank">
            <Nav></Nav>
            <ExamBank></ExamBank>
          </Route>
          <Route exact path="/exam-bank-detail">
            <Nav></Nav>
            <ExamBankDetail></ExamBankDetail>
          </Route>
          <Route exact path="/exam">
            <Nav></Nav>
            <Exam></Exam>
          </Route>
          <Route exact path="/score-statistics">
            <Nav></Nav>
            <ScoreStatistics></ScoreStatistics>
          </Route>
        </div>
      </Router>
    )
  }
}
