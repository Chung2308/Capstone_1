import React from 'react'
import './ScoreStatistics.css'
import { axios } from '@/instances/axios'
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function ScoreStatistics() {
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    birthday: '',
    score: '',
  })
  useEffect(() => {
    async function fetchUser (){
      const id = localStorage.getItem('id')
      const response = await axios.get(`/user/${id}`)
      setUser(response?.data?.user)
      console.log('Infor User: ', response?.data?.user)
    }
    fetchUser()
  }, [])
  return (
    <div className="score">
            <h4>Score Statistics</h4>
            <table className="table table-inverse table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>Number</th>
                  <th>Username</th>
                  <th>Fullname</th>
                  <th>Birthday</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td name="list_topic">1</td>
                  <td name="list_topic">{user.username}</td>
                  <td name="list_id">{user.fullname}</td>
                  <td name="list_date">{moment(user.birthday).format('DD/MM/YYYY')}</td>
                  <td name="list_date">9.0</td>
                </tr>
                <tr>
                  <td name="list_topic">2</td>
                  <td name="list_id">DB</td>
                  <td name="list_date">DB</td>
                  <td name="list_date">DB</td>
                  <td name="list_date">DB</td>
                </tr>
                <tr>
                  <td name="list_topic">3</td>
                  <td name="list_id">DB</td>
                  <td name="list_date">DB</td>
                  <td name="list_date">DB</td>
                  <td name="list_date">DB</td>
                </tr>
              </tbody>
            </table>
          </div>
  )
}
