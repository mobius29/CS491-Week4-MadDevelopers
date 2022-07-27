import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import PostInfoPage from './Pages/PostInfoPage'
import PostListPage from './Pages/PostListPage'
import PostUpdatePage from './Pages/PostUpdatePage'
import RegisterPage from './Pages/RegisterPage'
import UserInfoPage from './Pages/UserInfoPage'
import UserUpdatePage from './Pages/UserUpdatePage'
import WritePostPage from './Pages/WritePostPage'
import TypingStartPage from './Pages/TypingStartPage'
import TypingResultPage from './Pages/TypingResultPage'
import TypingDoingPage from './Pages/TypingDoingPage'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/posts/:page' element={<PostListPage allPosts={true} />} />
        <Route
          path='/posts/results'
          element={<PostListPage allPosts={false} />}
        />
        <Route path='/post/write' element={<WritePostPage />} />
        <Route path='/post/:id' element={<PostInfoPage />} />
        <Route path='/post/update/:id' element={<PostUpdatePage />} />
        <Route path='/user/:id' element={<UserInfoPage />} />
        <Route path='/user/update/:id' element={<UserUpdatePage />} />
        <Route path='/typing' element={<TypingStartPage />} />
        <Route path='/typing/doing/:extension' element={<TypingDoingPage />} />
        <Route path='/typing/result' element={<TypingResultPage />} />
      </Routes>
    </div>
  )
}

export default App
