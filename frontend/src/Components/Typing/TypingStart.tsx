import { forwardRef, ReactElement } from 'react'
import styled from 'styled-components'

const TypingStartBlock = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .typing-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-left: 2rem;
    margin-right: 2rem;

    .typing-line {
      font-family: Consolas, monaco, monospace;
      margin-top: 1rem;
      height: 150px;

      .show-line {
        margin-left: 3rem;
        margin-right: 2rem;
        letter-spacing: 0.125rem;
        font-size: 24px;

        .wrong {
          color: red;
        }
      }

      .input-line {
        font-family: Consolas, monaco, monospace;
        width: 90%;
        height: 40px;
        font-size: 24px;
        letter-spacing: 0.125rem;
        overflow-wrap: break-word;
        margin-top: 1rem;
        margin-left: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
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

const Letter = ({ letter, isWrong }: { letter: string; isWrong: boolean }) => {
  return <span className={isWrong ? 'letter wrong' : 'letter'}>{letter}</span>
}

const TypingLine = forwardRef(
  (
    {
      isFirstline,
      line,
      lineInput,
      onKeyDown,
      onChange,
    }: {
      isFirstline: boolean
      line: string
      lineInput: string
      onKeyDown:
        | ((e: React.KeyboardEvent<HTMLInputElement>) => void)
        | undefined
      onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    let id = -1
    const letterLine = line.split('').map((letter) => {
      ++id
      const isWrong =
        lineInput.charAt(id) !== '' && lineInput.charAt(id) !== letter
      return <Letter key={id} letter={letter} isWrong={isWrong} />
    })

    return (
      <div className='typing-line'>
        <div className='show-line'>{letterLine}</div>
        {isFirstline && (
          <input
            className='input-line'
            ref={ref}
            name='lineInput'
            onKeyDown={onKeyDown}
            placeholder='repeat above line'
            value={lineInput}
            onChange={onChange}
          />
        )}
      </div>
    )
  }
)

interface IProps {
  timer: number
  isStart: boolean
  currentLine: number
  currentLineRef: React.RefObject<HTMLInputElement> | null
  extensionError: string
  lines: string[]
  lineInput: string
  dropdownDisplay: boolean
  selectedExtension: string
  onClickDropdownDisplay: () => void
  onClickDropdown: (extension: string) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickStartButton: () => void
}
const TypingStart = ({
  isStart,
  timer,
  currentLine,
  currentLineRef,
  extensionError,
  lines,
  lineInput,
  dropdownDisplay,
  selectedExtension,
  onClickDropdownDisplay,
  onClickDropdown,
  onChange,
  onKeyDown,
  onClickStartButton,
}: IProps) => {
  const extensions = ['curl', 'spring', 'flask', 'dotnetgc']
  let typingLine: ReactElement[] = []
  for (let i = currentLine; i < currentLine + 3; ++i) {
    if (i === currentLine) {
      typingLine = typingLine.concat(
        <TypingLine
          isFirstline={true}
          line={lines[i]}
          onKeyDown={onKeyDown}
          ref={currentLineRef}
          onChange={onChange}
          lineInput={lineInput}
        />
      )
    } else {
      typingLine = typingLine.concat(
        <TypingLine
          isFirstline={false}
          line={lines[i]}
          ref={null}
          onKeyDown={undefined}
          lineInput={''}
          onChange={undefined}
        />
      )
    }
  }

  return (
    <TypingStartBlock>
      {isStart ? (
        <>
          <div className='timer'>{timer}</div>
          <div className='typing-area'>{typingLine}</div>
        </>
      ) : (
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
      )}
    </TypingStartBlock>
  )
}

export default TypingStart
