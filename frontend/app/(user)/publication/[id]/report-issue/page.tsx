'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { reports } from "@/app/data/reports"

const Report = () => {
   const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
	const router = useRouter();
  return (
    <div
				className="relative z-10 bg-white text-black rounded-xl shadow-lg min-w-[320px] max-w-133.75 flex justify-center"
				onClick={(e) => e.stopPropagation()}
			>
        {
          isSubmitSuccess ? (
            <div className="w-full max-w-73.25 p-4.75 flex flex-col items-center ">
              <h3 className="font-semibold text-center mb-3.75 text-lg">Report submitted</h3>
              <p className="text-center mb-3 text-sm">Thanks for your feedback. We will review this publication and take appropriate action.</p>
              <Button className="w-full" onClick={()=> router.back()} variant={'default'}>Done</Button>
            </div>
          ) : (<div>
					<header className="mb-6.5 pt-6 px-6 ">
						<h2 className="text-lg font-semibold mb-2">
							Report this publication
						</h2>
						<p className="text-sm leading-snug">
							Tell us why your are reporting this content. Your feedback helps
							keep the platform safe
						</p>
					</header>

					<ul>
						{reports.map((report, index) => (
							<li
								key={index}
								className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 pb-3 mt-3"
							>
								<p className="font-medium">{report}</p>
								<input type="radio" value={report} name="report-issue" />
							</li>
						))}

						<li className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 pb-3 mt-3.75">
							<p className="font-medium">Other</p>
						</li>
					</ul>

					<div className="grid grid-cols-2 gap-2.5 my-6.5 px-6.5 ">
						<Button
							variant={"outline"}
							onClick={() => router.back()}
							className="border-primary-500 "
						>
							Close
						</Button>

						<Button onClick={()=>setIsSubmitSuccess(true)} variant={"default"}>Submit</Button>
					</div>
				</div>)
        }
				
			</div>
  )
}

export default Report