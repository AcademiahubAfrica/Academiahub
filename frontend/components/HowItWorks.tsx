import { howItWorks } from '@/app/data/howItWorks'
import Image from 'next/image'
import React from 'react'

const HowItWorks = () => {
  return (
    <div className=' my-[59px] '>
      <header className='mb-4 lg:mb-[34px]'>
        <h1 className='font-medium text-2xl leading-[130%] text-center mb-4 lg:font-bold lg:text-[32px] lg:leading-[100%]'>How AcademiaHub works </h1>
        <h3 className='font-medium text-lg leading-[130%] text-center lg:text-2xl lg:font-normal lg:leading-[100%]'>Get started in minutes and access thousands of academic resources from various institutions.</h3>
      </header>

      <section className='flex flex-wrap justify-center gap-[70px]'>
        {
          howItWorks.map(card=>(
            <div key={card.id} className='flex items-center flex-col w-[350px]'>
              <div  className='rounded-full bg-primary text-white w-[55px] h-[55px] p-4 font-medium text-2xl text-center'>
                {card.id}
              </div>
              <div className='mt-4 shadow-md shadow-primary rounded-lg p-5 pb-[65px]'>
                <Image className='mb-[41px] mt-[38px]' src={card.imagePath} alt='Image visualisation of how it works' width={310} height={187} />
                
                <h3 className='font-medium text-lg leading-[130%] mb-[12.89px] text-center'>{card.header}</h3>
                <p className='text-sm font-normal leading-[130%] text-center'>{card.paragraph}</p>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default HowItWorks