import { Button } from '@/components/ui/button'
import React from 'react'

const Explore = () => {
  const mockData = [
    {
      id: 1,
      imagePath: '/assets/images/exploreImg-1.png',
      name: 'Analysis of Renewable Energy Solutions in Nigeria',
      userPfp: '/assets/images/users/user-3.png',
      username: 'Chiamaka Nwosu',
      institution: 'University of Nigeria, Nsukka'
    },
    {
      id:2,
      imagePath: '/assets/images/exploreImg-2.png',
      name: 'Analysis of Renewable Energy Solutions in Nigeria',
      userPfp: '/assets/images/users/user-2.png',
      username: 'Damilare Aremu',
      institution: 'University of Lagos, Akoka'
    }
  ]
  return (
   <section>
     <header className='text-center flex flex-col gap-2'>
       <h1 className='font-medium text-[24px] leading-[130%]'>
        Explore and Find What You Need
       </h1>
       <h3 className='font-medium text-[18px] leading-[130%]'>
        Search through thousands of publications by topic, university or field of study
       </h3>
       <div className='flex gap-[9.06px]'>
        <input type="search" className='' placeholder='Search for Projects, Schools....' />
        <Button variant='default' size='sm' >Search</Button>
       </div>
     </header>

     <div>
      <h3 className='font-medium text-[18px] leading-[130%] mb-5'>Suggested publications</h3>
      <div className="publication-list">
        
      </div>
     </div>
   </section>
  )
}

export default Explore