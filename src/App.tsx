import './App.css'
import './components/Loader.css'
import Header from './components/Header'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import LeadForm from './components/LeadForm'
import { useRef, useState, useEffect } from 'react'
import Loader from './components/Loader'

function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <Loader />;

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
