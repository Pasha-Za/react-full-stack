import * as React from 'react';

export interface CounterDisplayProps {
    result?: number
}
 
const CounterDisplay: React.SFC<CounterDisplayProps> = ({result}) => {
    return ( <div>Current number: {result}</div> );
}
 
export default CounterDisplay;