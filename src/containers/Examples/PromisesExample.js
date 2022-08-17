import React, { useEffect } from 'react';

function PromisesExample(props) {
    const one = () => {
        return "One";
    }

    const two = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("two")
            }, 2000);
        })
    }

    const three = () => {
        return "Three"
    }

    const All = async () => {
        const oneAns = one();
        console.log(oneAns);

        const twoAns = await two();
        console.log(twoAns);

        const threeAns = three();
        console.log(threeAns);
    }

    const print = (z) => {
        console.log(z);
    }


    const sum = (a, b, callBackFun) => {
        let c = a + b;
        callBackFun(c)
    }

    sum(10, 20, print)

    useEffect(
        () => {
            All()
        }
    )


    return (
        <div>
            
        </div>
    );
}

export default PromisesExample;