import React, { useEffect, useState } from 'react'

export default function Home() {
    let [counter, setCounter] = useState(0);
    useEffect(() => { }, []);
    
    return <>
        <h1 className='text-blue-500 text-center font-[900]'>home component</h1>
    </>
}
