import React from 'react';

// Common components
import Header from '../components/Header';

const GeneralLayout = ({ children }) => {
  return (
    <div className='w-full h-screen bg-white relative'>
      <Header />

      <div className='w-[800px] m-auto'>
        {children}
      </div>
    </div>
  )
}

export default GeneralLayout;