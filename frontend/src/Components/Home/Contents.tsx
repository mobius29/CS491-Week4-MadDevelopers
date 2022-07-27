import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 700px;

  .Notice-title {
    margin-top: 2rem;
    font-size: 3.5rem;
    text-align: center;
  }

  .Notice-elements {
    width: 80%;
    margin: 0 auto;
    margin-top: 2rem;
    font-size: 1.5rem;
  }

  .go-all-posts {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.5rem;
  }
`

const Contents = () => {
  return (
    <MainBlock>
      <div className='Notice'>
        <div className='Notice-title'>코딩도문</div>
        <div className='Notice-contents'>
          <p className='Notice-elements'>
            1. 누군가에게 코드에 대해 많이 아는 척하며 상대방을 무시하지 않을 것
          </p>
          <p className='Notice-elements'>
            2. 코딩에 취해 누군가에게 피해 주지 않을 것
          </p>
          <p className='Notice-elements'>
            3. 과도한 코딩으로 응급실에 실려가지 않을 것{' '}
          </p>
        </div>
      </div>
      <div className='go-all-posts'>
        <Link to='/posts/1'>다 읽었으면 게시글 보러가기</Link>
      </div>
    </MainBlock>
  )
}

export default Contents
