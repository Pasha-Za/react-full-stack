import React from 'react';

const generateId = () => Number((Math.random() * 10000).toFixed(0))

const VoteCounter = ({ good, neutral, bad, addGood, addBad, addNeutral, reset }) => {
    const handleInput = (e) => {
        e.preventDefault()
        console.log(e.target.newnote.value, generateId());
    }
    return (
        <>
            <button onClick={addGood}>good</button>
            <button onClick={addNeutral}>neutral</button>
            <button onClick={addBad}>bad</button>
            <button onClick={reset}>reset stats</button>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            
            <form onSubmit={handleInput}>
                <input type="text" name="newnote"/>
                <button type="submit">submit</button>
            </form>
        </>
    );
};
 
export default VoteCounter;