import { Link, Route, Routes } from 'react-router-dom'
import React from 'react'
import { Helmet } from 'react-helmet'
import Favicon from './assets/icon.svg'

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <link rel='icon' type='image/svg+xml' href={Favicon} />
                <title>Vite + React + TS</title>
            </Helmet>
            <div className='App'>
                <nav>
                    <Link to='/'>home</Link>
                    <Link to='/about'>about</Link>
                </nav>
                <h1 className='text-primary text-4xl font-bold'>hello</h1>
                <Routes>
                    <Route path='/' element={<div>Home</div>} />
                    <Route path='/about' element={<div>About</div>} />
                </Routes>
            </div>
        </>
    )
}

export default App
