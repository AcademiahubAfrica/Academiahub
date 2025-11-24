import React from 'react'
import { Button } from './ui/button'

const JoinUs = () => {
  return (
    <div className='w-[calc(100%+48px)] bg-linear-to-r from-[#1E3A8A] to-[#080F24] px-[30px] flex flex-col items-center justify-center pt-[72px] pb-[212px] lg:pb-[203px]'>
       <div className='max-lg:max-w-[590px] lg:max-w-[1041px] lflex flex-col justify-center items-center'>
          <header className='max-lg:max-w-[461px]'>
            <h3 className='font-medium text-lg leading-[130%] text-center text-white mt-2 md:font-semibold md:text-4xl'>Your Academic Success Starts Here</h3>
            <p className='font-normal text-sm leading-[130%] text-center text-white md:font-medium md:text-[20px]'>Join the large community of researchers who trust AcademiaHub with their academic research needs. </p>
          </header>

          <div className='flex flex-col justify-center items-center mt-[60px] gap-5 sm:flex-row'>
            <Button variant={'outline'} size={'lg'} className='w-[248px] h-14 text-primary font-medium text-lg leading-[130%]'>Join Us Now</Button>
             <Button variant={'outline2'} size={'lg'} className='w-[248px] h-14 text-white font-medium text-lg leading-[130%]'>Browse Projects</Button>
          </div>
       </div>
    </div>
  )
}

export default JoinUs