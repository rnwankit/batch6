import React, { useCallback, useState } from 'react';
import ListItem from './ListItem';

function UseCallbackExample(props) {
    const [theme, setTheme] = useState(false);
    const [number, setNumber] = useState(0);


    console.log(number);

    const themeStyle = {
        backgroundColor: theme ? '#fff' : '#000',
        color: theme ? '#000' : '#fff'
    }

    const getItem = useCallback((inc) => {
          return [number, number+inc, number+inc+5]
        },
    [number]);

    return (
        <div style={themeStyle}>
            <button onClick={() => setTheme(!theme)}>Toogle Theme</button><br />
            <input placeholder='Please enter any number' onChange={(e) => setNumber(parseInt(e.target.value))} />

            <ListItem getItem={getItem} />
        </div>
    );
}

export default UseCallbackExample;