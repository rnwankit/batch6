import React, { useEffect, useState } from 'react';

function ListItem({ getItem }) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        setItem(getItem(5))
    }, [getItem])


    return (
        <div>
            {
                item.map((i) => {
                    return(
                        <p>{i}</p>
                    )
                })
            }
        </div>
    );
}

export default ListItem;