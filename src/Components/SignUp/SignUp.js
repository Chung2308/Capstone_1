import React, { Component } from 'react'
import './SignUp.css'
import { axios } from '@/instances/axios'
import { Redirect } from 'react-router-dom'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirect: false,
      fullname: '',
      username: '',
      password: '',
      phone: '',
      birthday: '',
      // account:""
    }
  }
  submitForm (event) {
    event.preventDefault()
    if (this.state.password == this.state.password2) {
      this.setState({
        isRedirect: true,
      })
    } else {
      alert("Password doesn't match")
      this.setState({
        isRedirect: false,
      })
    }
  }
  content (event) {
    event.preventDefault()
    // console.log(event.target.name);
    const tenControl = event.target.name
    const giatri = event.target.value
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      [tenControl]: giatri,
    })
  }
  async LoginForm(event) {
    event.preventDefault()
    const { fullname, phone, birthday, username, password } = this.state
    const loginData = await axios.post(
      '/auth/register',
      {
        fullname,
        phone,
        birthday,
        username,
        password,
      }
    )
    console.log(loginData)
    if (loginData.data?.sucess === false) {
      alert(loginData.data?.message)
    } else {
      this.setState({
        isRedirect: true,
      })
    }
  }
  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div style={{ backgroundImage: 'url(/img/login3.jpg)' }}>
          <div className="sign-up">
            <form onSubmit={(event) => this.LoginForm(event)}>
              <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Full name</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby=""
                      placeholder="Enter full name"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id=""
                      aria-describedby="emailHelp"
                      placeholder="Enter username"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      onChange={(event) => this.content(event)}
                      name="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      onChange={(event) => this.content(event)}
                      name="password2"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Phone number</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Birth of year</label>
                    <input
                      type="date"
                      name="birthday"
                      onChange={(event) => this.content(event)}
                      className="form-control"
                      id
                      placeholder="Enter birth of year"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: 'rgba(21, 133, 141, 0.829)',
                  textAlign: 'center',
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
