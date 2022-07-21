import styled from 'styled-components'
import Recommends from './Recommends'

const TagbarBlock = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background: red;

  li {
    margin-left: 30px;
    font-size: 18px;
  }
`

const MainBlock = styled.div`
  display: flex;
  width: 100%;
  height: 700px;
  background: blue;
`

const Contents = () => {
  return (
    <>
      <TagbarBlock>
        <li>Language</li>
        <li>Algorithm</li>
        <li>Web</li>
        <li>Game</li>
      </TagbarBlock>
      <MainBlock>
        <Recommends />
        <Recommends />
      </MainBlock>
    </>
  )
}

export default Contents
