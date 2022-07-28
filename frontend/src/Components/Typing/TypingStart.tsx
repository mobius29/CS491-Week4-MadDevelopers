import styled from 'styled-components'

const TypingStartBlock = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .ment {
    margin-bottom: 2rem;
  }
  .start {
    display: flex;
    align-items: center;
  }

  .dropdown {
    position: relative;
    width: 100px;
    height: 30px;
    padding-top: 0.375rem;
    border: 1px solid black;
  }

  .dropdown-default {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dropdown-open {
    position: absolute;
    top: 30px;
  }

  .dropdown-element {
    width: 100px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
  }

  .start-btn {
    width: 75px;
    height: 40px;
    margin-left: 3rem;
    background: red;
  }
`

interface IProps {
  extensionError: string
  dropdownDisplay: boolean
  selectedExtension: string
  onClickDropdownDisplay: () => void
  onClickDropdown: (extension: string) => void
  onClickStartButton: () => void
}

const TypingStart = ({
  extensionError,
  dropdownDisplay,
  selectedExtension,
  onClickDropdownDisplay,
  onClickDropdown,
  onClickStartButton,
}: IProps) => {
  const extensions = ['curl', 'spring', 'git', 'dotnetgc']

  return (
    <TypingStartBlock>
      <div className='ment'>여러분의 타자 실력을 측정해보세요.</div>
      <div className='start'>
        <div className='dropdown' onClick={onClickDropdownDisplay}>
          <div className='dropdown-default'>
            {selectedExtension === '' ? '선택하세요' : selectedExtension}
          </div>
          {dropdownDisplay && (
            <div className='dropdown-open'>
              {extensions.map((extension) => (
                <div
                  className='dropdown-element'
                  onClick={() => onClickDropdown(extension)}
                >
                  {extension}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type='button'
          className='start-btn'
          onClick={() => onClickStartButton()}
        >
          Start
        </button>
        {extensionError && <div>{extensionError}</div>}
      </div>
    </TypingStartBlock>
  )
}

export default TypingStart
