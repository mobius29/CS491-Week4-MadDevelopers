import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logout } from '../../Modules/Auth'

const HeaderBlock = styled.div`
  display: flex;
  width: 100%;
  height: 80px;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    width: 20%;
  }

  .search-bar {
    display: flex;
    padding-left: 50px;
    justify-content: left;
    align-items: center;
    width: 50%;

    .search-input {
      width: 350px;
      height: 35px;
      padding-left: 20px;
    }

    .search-btn {
      margin-left: 30px;
      width: 50px;
      height: 35px;
    }
  }

  .top-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 30%;
  }
`

interface IProps {
  id: number
}

const Header = ({ id }: IProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <HeaderBlock>
      <Link to='/' className='logo'>
        Mad-Developers
      </Link>
      <form className='search-bar'>
        <label className='search-text' htmlFor='search-text'>
          <input
            type='text'
            className='search-input'
            name='search-text'
            id='search-text'
            placeholder='search'
          />
        </label>
        <button className='search-btn'>검색</button>
      </form>
      <nav className='top-nav'>
        <Link to={'/wiki'}>위키</Link>
        {id === -1 ? (
          <>
            <Link to='/login' className='loginBtn'>
              login
            </Link>
            <Link to='/register' className='register'>
              register
            </Link>
          </>
        ) : (
          <>
            <Link to={`/user/${id}`}>내 정보</Link>
            <div onClick={() => onClick()}>로그아웃</div>
          </>
        )}
      </nav>
    </HeaderBlock>
  )
}

export default Header
