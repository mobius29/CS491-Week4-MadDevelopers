import styled from 'styled-components'
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
    </>
  )
}

export default Contents
