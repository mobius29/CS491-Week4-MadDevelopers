import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PostInfoPage from './Pages/PostInfoPage'
import PostListPage from './Pages/PostListPage'
import RegisterPage from './Pages/RegisterPage'
import UserInfoPage from './Pages/UserInfoPage'
import WikiPage from './Pages/WikiPage'
import WritePostPage from './Pages/WritePostPage'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/posts' element={<PostListPage />} />
        <Route path='/posts/search' element={<PostListPage />} />
        <Route path='/post/write' element={<WritePostPage />} />
        <Route path='/post/:id' element={<PostInfoPage />} />
        <Route path='/user/:id' element={<UserInfoPage />} />
        <Route path='/wiki' element={<WikiPage />} />
      </Routes>
    </div>
  )
}

export default App
