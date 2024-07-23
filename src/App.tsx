import HomePage from '@pages/Home'
import Test from '@pages/Test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
import CardPage from './pages/Card'
=======
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
<<<<<<< HEAD
        <Route path="/card/:id" Component={CardPage} />
=======
>>>>>>> 77b9a6a2174119c93ca9bfacc069cc914a53103a
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
