import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'
import './App.css'

function App() {

  return (
    <>
      <div className='min-h-[92vh] max-h-screen'>
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  )
}

export default App
