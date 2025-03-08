import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {

  return (
    <div>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
