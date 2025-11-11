import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { mockData } from '../data/exploreMockData'

const Explore = () => {
 
  return (
   <section className='flex flex-col items-center min-[1290px]:mt-[175px]'>
     <header className='text-center mt-[35px] flex flex-col items-center gap-2'>
       <h1 className='max-lg:font-medium max-lg:text-[24px] max-sm:w-[200px] leading-[130%] lg:font-bold lg:text-[32px]'>
        Explore and Find What You Need
       </h1>
       <h3 className='max-lg:font-medium max-lg:text-[18px] max-lg:leading-[130%] lg:font-normal lg:text-[24px] '>
        Search through thousands of publications by topic, university or field of study
       </h3>
       <div className='flex gap-[9.06px] items-stretch mt-[37px] mb-8 min-[1290px]:mb-[60px] min-[1290px]:w-[1275px] min-[1290px]:justify-between'>
        <input type="search" className='max-md:w-[239px] md:max-[1290px]:w-[539px] min-[1290px]:w-[961px]  border-[#D9D9D9] border rounded-[40px] p-[11px] md:pt-[22px] pb-[23px]' placeholder='Search for Projects, Schools....' />
        <Button variant='default' size='sm' className='h-11 md:w-[150px] md:h-14' >Search</Button>
       </div>
     </header>

     <div>
      <h3 className='font-medium text-[18px] leading-[130%] mb-5'>Suggested publications</h3>
      <div className="publication-list flex max-sm:flex-col sm:flex-row sm:flex-wrap items-center sm:justify-center gap-[50px]">
        {
          mockData.map(data => (
            <section className='max-[1290px]:w-[306px] min-[1290px]:w-[367px] py-3 px-2 rounded-[15px] border-[#D9D9D9] border flex flex-col max-[1290px]:gap-2.5 min-[1290px]:gap-[18px] ' key={data.id}>
              <Image className='rounded-t-[15px] min-[1290px]:w-[351px]' src={data.imagePath} width={290} height={246} alt='Publication image' />
              <div className='flex flex-col gap-2.5 w-[298px]'>
                <h4 className='font-medium  max-[1290px]:text-[16px] min-[1290px]:text-[18px] leading-[130%]'>{data.name}</h4>
                <div className='flex items-center gap-1.5'>
                  <div>
                    <Image className='rounded-full '  width={40} height={40} src={data.userPfp} alt="user's profile picture" />
                  </div>
                  <div>
                    <p className='text-[14px] leading-[130%]'>{data.username}</p>
                    <p className='text-[#AEAEAE] text-[14px] leading-[130%]'>{data.institution}</p>
                  </div>
                </div>
              </div>
              <Button variant='default' size='lg' className='w-full font-medium text-[16px] leading-[130%]'>View Details</Button>
            </section>
          ))
        }
      </div>
     </div>
     <Button variant={'default'} size={'lg'} className='w-[272px] h-14 font-medium text-[16px] leading-[130%] mt-9'>Explore full library</Button>
   </section>
  )
}

export default Explore