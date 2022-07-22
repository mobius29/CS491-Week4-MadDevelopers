import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../Common/Footer'
import Header from '../Common/Header'
import Recommends from './Recommends'

const MainBlock = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  background: blue;
`

const Contents = () => {
  return (
    <>
      <MainBlock>
        <Recommends />
        <Recommends />
      </MainBlock>
      <div className='go-all-posts'>
        <Link to='/posts'>전체 게시글 보기</Link>
      </div>
    </>
  )
}

export default Contents
