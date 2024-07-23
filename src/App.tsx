import HomePage from '@pages/Home'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import ScrollToTop from './components/shared/ScrollToTop'
import CardPage from './pages/Card'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
