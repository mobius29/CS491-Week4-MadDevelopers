import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import MinigamePage from './Pages/MinigamePage'
import PostInfoPage from './Pages/PostInfoPage'
import PostListPage from './Pages/PostListPage'
import PostUpdatePage from './Pages/PostUpdatePage'
import RegisterPage from './Pages/RegisterPage'
import UserInfoPage from './Pages/UserInfoPage'
import UserUpdatePage from './Pages/UserUpdatePage'
import WikiPage from './Pages/WikiPage'
import WritePostPage from './Pages/WritePostPage'

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
        <Route path='/wiki' element={<WikiPage />} />
        <Route path='/minigame' element={<MinigamePage />} />
      </Routes>
    </div>
  )
}

export default App
