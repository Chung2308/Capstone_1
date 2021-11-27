import React, { useState } from 'react'
import { Chart } from 'react-charts'
import './Statistical.css'

export default function Statistical() {

  const [idExam, setIdExam] = useState('')

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [
          [0, 12],
          [1, 4],
          [2, 6],
          [3, 0],
          [4, 9],
          [5, 15],
          [6, 1],
          [7, 13],
          [8, 9],
          [9, 8],
          [10, 5],
        ],
      },
    ],
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )
  const enterIdExam = (e) => {
    setIdExam({name: e.target.value})
    console.log(idExam.name)
  }
  const submitID = (e) => {
    e.preventDefault()
  }

  return (
    <div className="chart-score">
      <div className="id-exam">
        <label>Exam ID:</label>{' '}
        <input
          type="text"
          placeholder="Enter exam ID"
          name="id_exam"
          onChange={enterIdExam}
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
  )
}
