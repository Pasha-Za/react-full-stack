import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Profile from './components/Profile'
import CounterDisplay from './components/CounterDisplay'
import Button from './components/utils/Button'

const ClickHistory = ({allClicks}) => {
    if (allClicks.length === 0) {
        return <p>click on the buttons</p>
    }

    return ( 
        <p>Click history: {allClicks.join(' ')}</p>
     );
}

const Counter = () => {
    let [counter, setCounter] = useState(0)
    let [allClicks, setClicks] = useState([])

    const setCounterValue = (value) => () => {
        setCounter(value[0])
        setClicks(allClicks.concat(value[1]))
    }

    const reset = () => {
        setCounter(0)
    }

    return (
        <div className="counter">
            <p>Test counter</p>
            <CounterDisplay result={counter}/>
            <Button onClick={setCounterValue([counter + 1, '+'])} text="pluse"/>
            <Button onClick={setCounterValue([counter - 1, '-'])} text="minus"/>
            <Button onClick={setCounterValue([0, 'reset'])} text="reset + history"/>
            <Button onClick={reset} text="reset"/>
            <ClickHistory allClicks={allClicks}/>
        </div>
    )
}

const TopBar = (props) => {
    return (
        <div className="top-bar">
            {props.course.name}
            <br/>
        </div>
    )
}

const Topic = (props) => {
    const {part, exercises} = props;
    return <p>{part}: {exercises}</p>
}

const Content = (props) => {
    let topicsList = props.course.parts.map((topic, index) => {
        return <Topic part={topic.part} exercises={topic.exercises} key={index}/>
    })
    return (
        topicsList
    )
}

const Total = (props) => {
    const { amount } = props
    return <div>Total amount of exercises: {amount}</div>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
            part: 'Fundamentals of React',
            exercises: 10
        }, {
            part: 'Using props to pass data',
            exercises: 7
        }, {
            part: 'State of a component',
            exercises: 14
        }]
    }

    const exercises = course.parts.map((topic) => topic.exercises).reduce((pervVal, curVal) => pervVal + curVal)

    return (
        <div className="main-app">
            <div className="test">
                <Counter/>
                <Profile name="Tom" age="29"/>
                <TopBar course={course}/>
                <Content course={course}/>
                <Total amount={exercises}/>
            </div>

            <CafePanel/>
        </div>
    )
}

// part 1 exersise
const FeedbackVotes = ({good, netural, bad}) => {
    return (
        <>
            <h4>Statistic</h4>
            <ul>
                <li>Good: {good}</li>
                <li>Netural: {netural}</li>
                <li>Bad: {bad}</li>
            </ul>
        </>
    )
}

const FeedbackStats = ({all, average, positive}) => {
    let positiveMarkup;
    if (positive) {
        positiveMarkup = <p>Positive: {positive} %</p>
    } else  {
        positiveMarkup = <p>Positive: no feedbacks yet</p>
    }
    return (
        <div className="statistic">
            <p>All: {all}</p>
            <p>Average: {average}</p>
            {positiveMarkup}
        </div>
    )
}

const CafePanel = () => {
    const [good, setGood] = useState(0)
    const [netural, setNetural] = useState(0)
    const [bad, setBad] = useState(0)
    const [allFeedbacks, setAllFeedbacks] = useState([])

    const feedbacksAmount = allFeedbacks.length

    const addFeedback = (feedback) => () => {
        switch (feedback) {
            case 'good':
                setGood(good + 1)
                setAllFeedbacks(allFeedbacks.concat(1))
                break;

            case 'netural':
                setNetural(netural + 1)
                setAllFeedbacks(allFeedbacks.concat(0))
                break;

            case 'bad':
                setBad(bad + 1)
                setAllFeedbacks(allFeedbacks.concat(-1))
                break;
        
            default:
                break;
        }
    }

    const feedbackAverage = () => {
        let result = 0;
        if (feedbacksAmount > 0) {            
            result = allFeedbacks.reduce((pervVal, curVal) => pervVal + curVal) / feedbacksAmount
        }
        return result;
    }

    const positiveAmount = () => {
        let positives = [];
        allFeedbacks.forEach(feedback => feedback === 1 && positives.push(feedback))
        return !!(positives.length / feedbacksAmount) && positives.length / feedbacksAmount * 100;
    }
    
    return (
        <div className="cafe-panel">
            <h3>Give your feedback</h3>
            <Button onClick={addFeedback('good')} text="good"/>
            <Button onClick={addFeedback('netural')} text="netural"/>
            <Button onClick={addFeedback('bad')} text="bad"/>

            <FeedbackVotes good={good} netural={netural} bad={bad}/>
            <FeedbackStats all={feedbacksAmount} average={feedbackAverage()} positive={positiveAmount()}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
