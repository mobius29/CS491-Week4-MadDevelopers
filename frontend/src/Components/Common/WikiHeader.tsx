import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WikiHeaderBlock = styled.div`
  display: grid;
  grid-template-columns: 200px 3fr 2fr;
  width: 100%;
  height: 5rem;

  background: red;

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mad-developers {
      font-size: 20px;
      font-weight: bold;
    }
    .wiki {
      margin-top: 0.25rem;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .searchbar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    margin-right: 2rem;

    .searchbar-input {
      width: 500px;
      height: 30px;
      padding-left: 1rem;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-btn {
      font-size: 18px;
    }
    .register-btn {
      margin-right: 2rem;
    }
  }
`

const WikiHeader = () => {
  return (
    <WikiHeaderBlock>
      <div className='logo'>
        <div className='mad-developers'>Mad-Developers</div>
        <div className='wiki'>Wiki</div>
      </div>
      <div className='searchbar'>
        <input
          className='searchbar-input'
          type='text'
          name='searchbar'
          placeholder='검색'
        />
      </div>
      <nav className='Header-nav'>
        <Link className='nav-btn Link-blog' to='/'>
          Blogs
        </Link>
        <div className='nav-btn login-btn'>Login</div>
        <div className='nav-btn register-btn'>Register</div>
      </nav>
    </WikiHeaderBlock>
  )
}

export default WikiHeader
