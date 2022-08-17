import { Button, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { useState } from 'react';

function UseMemoExample(props) {
    const [counter, setCounter] = useState(0);
    const [number, setNumber] = useState(0);

    const findFactorial = (n) => {
        console.log("findFactorial");
        if (n > 1) {
            return n * findFactorial(n-1)
        } else {
            return 1;
        }
    }

    // without useMemo
    // const result = findFactorial(number)



    
    // with useMemo
    const result = useMemo(() => findFactorial(number), [number]);

    return (
        <div>
            <TextField
                margin="dense"
                onChange={(e) => setNumber(e.target.value)}
            />

            <Button onClick={() => setCounter(counter+1)}>Counter</Button>

            <p>Counter: {counter}</p>
            <p>Factorial value is: {result}</p>

        </div>
    );
}

export default UseMemoExample;