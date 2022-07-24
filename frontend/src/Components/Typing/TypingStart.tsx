import { ReactElement } from 'react'
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
    height: 500px;
    margin-left: 2rem;
    margin-right: 2rem;

    .typing-line {
      margin-top: 1rem;
      height: 100px;

      .show-line {
        margin-left: 3rem;
        margin-right: 2rem;
        letter-spacing: 0.25rem;
        font-size: 30px;
      }

      .input-line {
        width: 90%;
        height: 40px;
        font-size: 30px;
        letter-spacing: 0.25rem;
        margin-top: 1rem;
        margin-left: 2rem;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }

  .start-btn {
    width: 75px;
    height: 40px;
    background: red;
  }
`

const TypingLine = ({
  line,
  lineInput,
  ref,
  onKeyDown,
  onChange,
}: {
  line: string
  lineInput: string
  ref: React.RefObject<HTMLInputElement> | null
  onKeyDown: ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}) => {
  return (
    <div className='typing-line'>
      <div className='show-line'>{line}</div>
      <input
        className='input-line'
        ref={ref}
        name='lineInput'
        onKeyDown={onKeyDown}
        placeholder='repeat above line'
        value={lineInput}
        onChange={onChange}
      />
    </div>
  )
}

interface IProps {
  timer: number
  isStart: boolean
  currentLine: number
  currentLineRef: React.RefObject<HTMLInputElement> | null
  extension: string
  extensionError: string
  lines: string[]
  lineInput: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClickStartButton: () => void
}
const TypingStart = ({
  isStart,
  timer,
  currentLine,
  currentLineRef,
  extension,
  extensionError,
  lines,
  lineInput,
  onChange,
  onKeyDown,
  onClickStartButton,
}: IProps) => {
  let typingLine: ReactElement[] = []
  for (let i = currentLine; i < currentLine + 3; ++i) {
    if (i === currentLine) {
      typingLine = typingLine.concat(
        <TypingLine
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
        <>
          <input
            type='text'
            name='extension'
            placeholder='extension'
            value={extension}
            onChange={onChange}
          />
          <button
            type='button'
            className='start-btn'
            onClick={() => onClickStartButton()}
          >
            Start
          </button>
        </>
      )}
    </TypingStartBlock>
  )
}

export default TypingStart
