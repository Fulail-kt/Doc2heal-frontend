import React from 'react'
import Header from '../../components/Header/Header';

const Services: React.FC = () => {
  const services = [
    {
      title: "Online Consultations",
      description: "Schedule online consultations with experienced doctors from the comfort of your home."
    },
    {
      title: "24/7 Support",
      description: "Access round-the-clock support for any medical queries or assistance you may need."
    },
    {
      title: "Prescription Renewal",
      description: "Easily renew your prescriptions online without the hassle of visiting a clinic."
    }
  ];

  return (
    <div className='w-full min-h-screen profile_bg'>
      <Header/>
    <div className="container flex flex-col justify-center md:mt-20 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services
