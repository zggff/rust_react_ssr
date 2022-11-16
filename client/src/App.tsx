import { useState } from 'react'
import './App.scss'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <div className='App'>
            <nav>
                <Link to='/'>home</Link>
                <Link to='/about'>about</Link>
            </nav>
            <h1>hello</h1>
            <Routes>
                <Route path='/' element={<div>Home</div>} />
                <Route path='/about' element={<div>About</div>} />
            </Routes>
        </div>
    )
}

export default App
