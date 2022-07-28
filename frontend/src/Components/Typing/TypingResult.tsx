import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TypingResultBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 2rem;
  column-gap: 2rem;
  text-align: center;

  .btns {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 5;
  }
`

interface IProps {
  total: number
  error: number
}

const TypingResult = ({ total, error }: IProps) => {
  return (
    <>
      <TypingResultBlock>
        <div>total</div>
        <div>error</div>
        <div>cpm</div>
        <div>accuracy</div>
        <div>{total}</div>
        <div>{error}</div>
        <div>{(total - error) * 2}</div>
        <div>{((total - error) / total) * 100}</div>
        <div className='btns'>
          <Link className='btn main' to='/'>
            메인으로
          </Link>
          <Link className='btn replay' to='/typing'>
            다시하기
          </Link>
        </div>
      </TypingResultBlock>
    </>
  )
}

export default TypingResult
