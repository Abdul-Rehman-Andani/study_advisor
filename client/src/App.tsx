import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { useUIStore } from './store/uiStore'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Planner from './pages/Planner'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import SignInPage from './pages/Signin'

const App = () => {
  const { sidebarOpen, closeSidebar } = useUIStore()

  return (
    <BrowserRouter>
      <Routes>

        {/* public */}
        <Route path='/sign-in/*' element={<SignInPage />} />

        {/* protected */}
        <Route path='/*' element={
          <>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
              <div className='flex flex-col h-screen'>

                <Navbar />

                <div className='flex flex-1 overflow-hidden relative'>

                  {sidebarOpen && (
                    <div
                      onClick={closeSidebar}
                      className='fixed inset-0 bg-black/40 z-20 md:hidden'
                    />
                  )}

                  <div className={`fixed md:static top-0 left-0 h-full z-30 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                  `}>
                    <SideBar />
                  </div>

                  <main className='flex-1 overflow-y-auto bg-background'>
                    <Routes>
                      <Route path='/'                element={<Home />}         />
                      <Route path='/planner'         element={<Planner />}      />
                      <Route path='/courses'         element={<Courses />}      />
                      <Route path='/courses/:name'   element={<CourseDetail />} />
                      <Route path='/tasks'           element={<Tasks />}        />
                      <Route path='/profile'         element={<Profile />}      />
                    </Routes>
                  </main>

                </div>
              </div>
            </SignedIn>
          </>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App