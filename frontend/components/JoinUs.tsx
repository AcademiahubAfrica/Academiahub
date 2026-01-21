import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

const JoinUs = () => {
  return (
    <div className='w-full bg-linear-to-r from-[#1E3A8A] to-[#080F24] px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center pt-18 pb-12 lg:pb-50'>
       <div className='max-w-147 lg:max-w-260 w-full flex flex-col justify-center items-center'>
          <header className='max-w-115 lg:max-w-full'>
            <h3 className='font-medium text-lg leading-[130%] text-center text-white mt-2 md:font-semibold md:text-4xl'>Your Academic Success Starts Here</h3>
            <p className='font-normal text-sm leading-[130%] text-center text-white mt-2 md:font-medium md:text-[20px]'>Join the large community of researchers who trust AcademiaHub with their academic research needs.</p>
          </header>

          <div className='flex flex-col justify-center items-center mt-10 gap-2 sm:flex-row'>
            <Link href={'/signup'}>
              <Button variant={'outline'} size={'lg'} className='w-74 h-11 text-primary  text-base leading-[130%]'>Join Us Now</Button>
            </Link>
            <Link href={'/explore'}>
              <Button variant={'outline2'} size={'lg'} className='w-74 h-11 text-white  text-base leading-[130%]'>Browse Projects</Button>
            </Link>
          </div>
       </div>
    </div>
  )
}

export default JoinUs