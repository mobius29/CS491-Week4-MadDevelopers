import styled from 'styled-components'

const WikiHomeBlock = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;

  .info {
    width: 70%;
  }
`

const WikiHome = () => {
  return (
    <WikiHomeBlock>
      <div className='info'>Info</div>
      <div className='sidebar'>Sidebar</div>
    </WikiHomeBlock>
  )
}

export default WikiHome
