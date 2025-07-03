import { useState } from 'react';

const faqData = [
  {
    title: 'CONNECTIVITY',
    content: [
      { label: 'Mumbai-Pune Expressway', value: '05 Mins.' },
      { label: 'Hinjawadi connectivity', value: '20 Mins.' },
      { label: 'Balewadi High Street', value: '30 Mins.' },
    ],
  },
  {
    title: 'LEISURE',
    content: [
      { label: 'Multiplex', value: '10 Mins.' },
      { label: 'Recreational Park', value: '12 Mins.' },
      { label: 'Fine Dining', value: '15 Mins.' },
    ],
  },
  {
    title: 'SHOPPING/ MALLS',
    content: [
      { label: 'Phoenix Marketcity', value: '18 Mins.' },
      { label: 'Westend Mall', value: '22 Mins.' },
      { label: 'Xion Mall', value: '25 Mins.' },
    ],
  },
  {
    title: 'EDUCATIONAL INSTITUTES',
    content: [
      { label: 'Symbiosis International', value: '08 Mins.' },
      { label: 'DY Patil College', value: '10 Mins.' },
      { label: 'Indira College', value: '12 Mins.' },
    ],
  },
  {
    title: 'HEALTHCARE',
    content: [
      { label: 'Aditya Birla Hospital', value: '10 Mins.' },
      { label: 'Jupiter Hospital', value: '15 Mins.' },
      { label: 'Lifepoint Hospital', value: '18 Mins.' },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(3); // EDUCATIONAL INSTITUTES open by default

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black py-16">
      <h2 className="text-5xl font-serif text-gray-200 mb-12 tracking-wide">Key Distances</h2>
      <div className="w-full max-w-xl space-y-4">
        {faqData.map((item, idx) => (
          <div
            key={item.title}
            className="border-2 border-yellow-600"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-200 text-2xl tracking-wide font-normal focus:outline-none"
              onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
            >
              <span>{item.title}</span>
              <span className="text-3xl">{openIndex === idx ? '\u25B2' : '\u25BC'}</span>
            </button>
            {openIndex === idx && item.content.length > 0 && (
              <div className="px-6 py-4 border-t-2 border-yellow-600 bg-black">
                {item.content.map((row) => (
                  <div key={row.label} className="flex justify-between text-lg text-gray-200 py-1">
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
