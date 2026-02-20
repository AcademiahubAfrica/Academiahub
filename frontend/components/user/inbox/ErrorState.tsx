import { ConversationListItem } from '@/app/_types/messaging'
import { QueryObserverResult } from '@tanstack/react-query'

interface ErrorStateProps {
  onRetry: ()=>Promise<QueryObserverResult<ConversationListItem[],Error >>
  error: Error | null
}
const ErrorState = ({onRetry} : ErrorStateProps) => {
  
  return (

    <div className='mt-10 lg:mt-5 flex flex-col justify-center items-center py-20'>
      
      <h3 className='font-semibold text-lg leading-5 text-gray-800 mb-3'>Something went wrong</h3>
      <button className='cursor-pointer bg-red-700 px-5 py-2 font-semibold text-white rounded-lg' onClick={()=>onRetry()}>Retry</button>
    </div>
  )
}

export default ErrorState