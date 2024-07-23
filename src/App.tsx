import HomePage from '@pages/Home'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardPage from './pages/Card'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
