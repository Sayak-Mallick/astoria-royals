import './App.css'
import Header from './components/Header'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import LeadForm from './components/LeadForm'
import React, { useRef } from 'react'

function App() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header onScheduleClick={scrollToForm} />
      <FAQ />
      <div ref={formRef}>
        <LeadForm />
      </div>
      <Footer />
    </>
  )
}

export default App
