import Navbar from '@components/shared/Navbar'
import ScrollToTop from '@components/shared/ScrollToTop'
import CardPage from '@pages/Card'
import HomePage from '@pages/Home'
import SigninPage from '@pages/Signin'
import SignupPage from '@pages/Signup'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PrivateRoute from '@components/auth/PrivateRoute'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'
import MyPage from '@pages/My'
import { Suspense } from 'react'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={Test} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<div>ds</div>}>
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
