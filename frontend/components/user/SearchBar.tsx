'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { FaSearch } from "react-icons/fa"
import { Button } from "../ui/button"
import { useState, useEffect } from "react"

export default function SearchBar() {
  const [value, setValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()


  const handleSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams)

    if (searchValue) {
      params.set("search", searchValue)
    } else {
      params.delete("search")
    }

    router.push(`?${params.toString()}`)
  }

  
  useEffect(() => {
    const delay = setTimeout(() => {
      handleSearch(value)
    }, 400) 

    return () => clearTimeout(delay)
  }, [value])

  return (
    <div className="w-2/3 sm:flex items-center gap-5 hidden">
      
      <div className="sm:w-3/4 border h-10 flex items-center p-3 focus-within:border-2 focus-within:border-gray-600 rounded-3xl">
        <FaSearch className="text-gray-400" />
        
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          
    
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(value)
            }
          }}

          placeholder="Search..."
          className="border-none w-full rounded-3xl text-sm focus-visible:ring-0"
        />
      </div>


      <Button
        onClick={() => handleSearch(value)}
        className="h-10 w-[20%]"
      >
        Search
      </Button>
    </div>
  )
}