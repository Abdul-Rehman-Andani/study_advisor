import { SignIn } from '@clerk/clerk-react'

const Signin = () => {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <SignIn  />
    </div>
  )
}

export default Signin