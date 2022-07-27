import styled from 'styled-components'

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-left: 1rem;
  border-top: 1px solid black;

  img {
    display: inline-block;
    width: 17px;
    height: 17px;
  }

  .madCamp {
    font-size: 2.5rem;
  }

  .developers {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 2rem;
  }

  .github {
    text-align: center;
  }

  .github-profile {
    display: inline-block;
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
`

const Footer = () => {
  return (
    <FooterBlock>
      <div>
        <div className='madCamp'>Mad-Developers</div>
        <div className='developers'>Developers</div>
        <div className='github'>
          <div className='github-each'>
            <img src='/github.png' alt='github' />
            <a
              className='LJY github-profile'
              href='https://github.com/leejy12'
              target='_blank'
              rel='noopener noreferrer'
            >
              KAIST Univ 19 이준영
            </a>
          </div>
          <div className='github-each'>
            <img src='/github.png' alt='github' />
            <a
              className='LSJ github-profile'
              href='https://github.com/mobius29'
              target='_blank'
              rel='noopener noreferrer'
            >
              KOREA Univ 19 이성진
            </a>
          </div>
        </div>
      </div>
    </FooterBlock>
  )
}

export default Footer
