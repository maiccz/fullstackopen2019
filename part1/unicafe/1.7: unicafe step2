import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => {
  return (
      <h1>{props.name}</h1>
  )
}

const Statistic = (props) => {
  return (
      <p>{props.name} {props.value}</p>
  )
}
  

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name={'give feedback'} />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />
      <Header name={'statistics'} />
      <Statistic name={'good'} value={good} />
      <Statistic name={'neutral'} value={neutral} />
      <Statistic name={'bad'} value={bad} />
      <Statistic name={'all'} value={good + neutral + bad} />
      <Statistic name={'average'} value={((good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)).toFixed(2)} />
      <Statistic name={'positive'} value={(good / (good + neutral + bad) * 100).toFixed(2) + '%'} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
