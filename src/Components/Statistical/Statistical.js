import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import { axios } from '@/instances/axios'
import './Statistical.css'
import { useHistory } from 'react-router'

export default function Statistical() {
  const [idExam, setIdExam] = useState({
    id_exam: '',
  })
  const history = useHistory()
  const [statistical, setStatistical] = useState([])
  const [data, setData] = useState([
    {
      data: [[0, 0]],
    },
  ])
  const loadUser = async () => {
    const id = localStorage.getItem('id')
    const response = await axios.get(`/user/${id}`)
    if (response?.data?.user?.user_type === 'Student') history.push('/not-view')
  }

  useEffect(() => {
    loadUser()
  })
  const enterIdExam = (e) => {
    e.preventDefault()
    setIdExam({ id_exam: e.target.value })
  }
  const submitID = async (e) => {
    enterIdExam(e)
    const response = await axios.get(`/result/score/${idExam.id_exam}`, idExam)
    const newData = [[0, 0]]
    for (const element of response.data.data) {
      newData.push([element._id.total_score, element.count])
    }
    setData([{ data: newData }])
    setStatistical(response?.data?.data)
  }
  console.log(data)
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div className="chart-score">
      <div className="row">
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <div className="id-exam">
            <label>Exam ID:</label>{' '}
            <input
              type="text"
              placeholder="Enter exam ID"
              name="id_exam"
              onChange={enterIdExam}
              defaultValue={idExam.id_exam}
            ></input>
            <form onSubmit={submitID}>
              <button>OK</button>
            </form>
          </div>
          <div className="chart">
            <label className="quantity">Quantity</label>
            <Chart data={data} axes={axes} />
            <label className="score">Score</label>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" id="table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Score</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {statistical.map((value, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{value?._id?.total_score}</td>
                  <td>{value?.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
