import React, { useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import { axios } from '@/instances/axios'
import './Statistical.css'
import { useHistory } from 'react-router'

export default function Statistical() {
  const [idExam, setIdExam] = useState({
    id_exam: '',
  })
  // const [statistical, setStatistical] = useState({})
  const [score, setScore] = useState({})
  const [quantity, setQuantity] = useState({})
  const history = useHistory()
  const [data, setData] = useState([
    {
      // label: 'Series 1',
      data: [
        [0,0]
      ],
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
    const newData = [[0.0, 0.0]]
    for (const element of response.data.data) {
      newData.push([element._id.total_score, element.count])
    }
    // console.log(newData)
    setData([{ data: newData }])
    // setScore(response?.data?._id?.total_score)
    // setQuantity(response?.data?.count)
    // console.log('response: ', response)
    // console.log('id', idExam)
    // for (const dataObj of response ){
    //   score.push(parseFloat(dataObj.score));
    //   quantity.push(parseFloat(dataObj.quantity))
    // }
  }
  console.log(data)
  // const data = React.useMemo(
  //   () => [
  //     {
  //       // label: 'Series 1',
  //       data: [
  //         // [score, quantity],
  //         [1, 4],
  //         [2, 6],
  //         [3, 0],
  //         [4, 9],
  //         [5, 19],
  //         [6, 1],
  //         [7, 13],
  //         [8, 9],
  //         [9, 8],
  //         [10, 5],
  //       ],
  //     },
  //   ],
  //   []
  // ) 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

  return (
    <div className="chart-score">
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
      <div
        className="chart"
      >
        <label className="quantity">Quantity</label>
        <Chart data={data} axes={axes} />
        <label className="score">Score</label>
      </div>
    </div>
  )
}
