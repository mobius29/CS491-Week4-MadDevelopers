import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PostInfoPage from './Pages/PostInfoPage'
import PostListPage from './Pages/PostListPage'
import RegisterPage from './Pages/RegisterPage'
import WritePostPage from './Pages/WritePostPage'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/posts/tag' element={<PostListPage />} />
        <Route path='/posts/search' element={<PostListPage />} />
        <Route path='/post/write' element={<WritePostPage />} />
        <Route path='/post/:id' element={<PostInfoPage />} />
        <Route path='/user/:id' element={<PostInfoPage />} />
      </Routes>
    </div>
  )
}

export default App
