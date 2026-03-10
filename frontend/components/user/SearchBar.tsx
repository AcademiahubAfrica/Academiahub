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
    <div className="w-2/3 flex gap-5.5 items-center pr-5">
       <div className="w-3/4 border h-10 flex items-center p-3 focus-within:border-2 focus-within:border-gray-600 rounded-3xl">
      <FaSearch className="font-medium text-gray-400" />
      <Input
      type="text"
      value={value}
      placeholder="Search..."
      onChange={(e)=>setValue(e.target.value)}
      className="border-none  w-full rounded-3xl focus:outline-none focus:border-none focus-visible:ring-0"
    />
    </div>
     <Button variant="default" size="sm" className=" h-10 w-[15%] text-sm" onClick={()=>handleSearch(value)}>Search</Button>
    </div>
   
  )
}