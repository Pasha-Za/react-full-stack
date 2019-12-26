import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Profile from './components/Profile'
import CounterDisplay from './components/CounterDisplay'
import Button from './components/utils/Button'

const Counter = () => {
    let [counter, setCounter] = useState(0)

    const setCounterValue = (value: number) => () => setCounter(value)

    return (
        <div className="counter">
            <p>Test counter</p>
            <CounterDisplay result={counter}/>
            <Button onClick={setCounterValue(counter + 1)} text="pluse"/>
            <Button onClick={setCounterValue(counter - 1)} text="minus"/>
            <Button onClick={setCounterValue(0)} text="reset"/>
        </div>
    )
}

// const TopBar = (props: object) => {
//     return (
//         <div className="top-bar">
//             {props.course.name}
//             <br/>
//         </div>
//     )
// }

// const Topic = (props) => {
//     const {part, exercises} = props;
//     return <p>{part}: {exercises}</p>
// }

// const Content = (props) => {
//     let topicsList = props.course.parts.map((topic, index) => {
//         return <Topic part={topic.part} exercises={topic.exercises} key={index}/>
//     })
//     return (
//         topicsList
//     )
// }

// const Total = (props) => {
//     const { amount } = props
//     return <div>Total amount of exercises: {amount}</div>
// }

const App = () => {
    // const course = {
    //     name: 'Half Stack application development',
    //     parts: [{
    //         part: 'Fundamentals of React',
    //         exercises: 10
    //     }, {
    //         part: 'Using props to pass data',
    //         exercises: 7
    //     }, {
    //         part: 'State of a component',
    //         exercises: 14
    //     }]
    // }

    // const exercises = course.parts.map((topic) => topic.exercises).reduce((pervVal, curVal) => pervVal + curVal)

    return (
        <div className="test">
            <Counter/>
            {/* <Profile name="Tom" age="29"/> */}
            {/* <TopBar course={course}/>
            <Content course={course}/>
            <Total amount={exercises}/> */}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
