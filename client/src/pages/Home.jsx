import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDowload from '../components/AppDowload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <JobListing />
        <AppDowload/>
        <Footer/>
    </div>
  )
}

export default Home