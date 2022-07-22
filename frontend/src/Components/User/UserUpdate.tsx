import styled from 'styled-components'

const UserUpdateBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .profileImage {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: red;
  }

  .input-div {
    margin: 2rem auto 0 auto;
    height: 2.5rem;
  }
  .input-label {
    display: inline-block;
    width: 5rem;
    margin-left: 2rem;
    text-align: center;
  }

  .input-text {
    width: 600px;
    height: 2.5rem;
    margin: 0 2rem;
    padding: 1rem;
  }

  .btns {
    margin: 2rem auto 0 auto;
  }
  .btn {
    width: 5rem;
    height: 2rem;
    margin: 0 2rem 0 2rem;
  }
`

interface IProps {
  form: {
    displayName: string
    selfInformation: string
  }
  error: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const UserUpdate = ({ form, error, onChange, onSubmit }: IProps) => {
  return (
    <UserUpdateBlock>
      <form onSubmit={onSubmit}>
        <div className='profileImage'>ProfileImage</div>
        <div className='input-div'>
          <div className='input-label'>닉네임</div>
          <input
            type='text'
            name='displayName'
            className='input-text'
            placeholder='닉네임'
            onChange={onChange}
            value={form.displayName}
          />
        </div>
        <div className='input-div'>
          <div className='input-label'>자기소개</div>
          <input
            type='text'
            name='selfInformation'
            className='input-text selfInformation'
            placeholder='자기소개'
            onChange={onChange}
            value={form.selfInformation}
          />
        </div>

        <div className='btns'>
          <button className='btn' type='submit'>
            수정
          </button>
          <button className='btn' type='button'>
            취소
          </button>
        </div>
      </form>
    </UserUpdateBlock>
  )
}

export default UserUpdate
