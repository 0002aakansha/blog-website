import React from 'react'

const Spinner = () => {
    return (
        <div className='h-screen fixed top-0 left-0 flex justify-center items-center w-full bg-transparent z-10'>
            <span className="loader block"></span>
            <h1 className='text-xl '>Loading...</h1>
        </div>
    )
}

export default Spinner