import React from 'react';

// General Layout
import GeneralLayout from './General';

const DetailsLayout = ({ children }) => {
  return (
    <GeneralLayout>
      <div className="flex">
        <div className='ml-8 w-96'>
          
        </div>
        <div className='w-full'>
          {children}
        </div>
      </div>
    </GeneralLayout>
  )
}

export default DetailsLayout;