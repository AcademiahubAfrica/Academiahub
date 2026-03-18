'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { FaSearch } from "react-icons/fa"
import { Button } from "../ui/button"
import { useState } from "react"
export default function SearchBar() {
  const [value, setValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  

  const handleSearch = (value : string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`?${params.toString()}`)

    setValue('')
  }

  return (
    <div className="w-2/3 sm:flex  items-center gap-5 hidden  ">
       <div className="sm:w-3/4  border h-10 flex items-center p-3 focus-within:border-2 focus-within:border-gray-600 rounded-3xl">
      <FaSearch className="font-medium text-gray-400" />
      <Input
       onKeyDown={(e)=> e.key ===  'Enter' && handleSearch(value) }
      type="text"
      value={value}
      placeholder="Search..."
      onChange={(e)=>setValue(e.target.value)}
      className="border-none  w-full rounded-3xl text-sm  focus-visible:ring-0 "
    />
    </div>
     <Button variant="default" size="sm" className="h-10 w-[20%] stext-sm" onClick={()=>handleSearch(value)}>Search</Button>
    </div>
   
  )
}