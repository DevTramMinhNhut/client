import { React, useState } from 'react';

const tens = [
    'nhut',
    'quang',
    'long'
]

function Welcome() {
    const [ten, setTen] = useState();

    const ramdomten = () => {
        const index = Math.floor(Math.random() * tens.length);
        setTen(tens[index]);
        console.log(index);
    }
    return (
        <>
            {/* <div className='1'>
                <h1>Hello, 1 </h1>
            </div> */}
            <div className='2'>
                <h2> {ten || 'chua co ten'}    </h2>
                <button onClick={ramdomten}> click </button>
                {/* <h1>Hello , {ten} </h1> */}
            </div>

        </>
    );
}

export default Welcome;