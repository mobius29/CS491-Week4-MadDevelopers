import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import TypingResult from '../../Components/Typing/TypingResult'
import TypingStart from '../../Components/Typing/TypingStart'
import { RootState } from '../../Modules'
import { check } from '../../Modules/Auth'
import { getCode } from '../../Modules/Code'

const TypingContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [extensionError, setExtensionError] = useState<string>('')
  const [lineInput, setLineInput] = useState<string>('')
  const { id, checkIdError, lines, getCodeSuccess, getCodeError } = useSelector(
    ({ auth, code }: RootState) => ({
      id: auth.id,
      checkIdError: auth.checkIdError,
      lines: code.lines,
      getCodeSuccess: code.getCodeSuccess,
      getCodeError: code.getCodeError,
    })
  )
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [currentLine, setCurrentLine] = useState<number>(0)
  const [timer, setTimer] = useState<number>(30)
  const [counter, setCounter] = useState<{
    total: number
    error: number
    current: number
  }>({
    total: 0,
    error: 0,
    current: 0,
  })
  const currentLineRef = useRef<HTMLInputElement>(null)
  const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false)
  const [selectedExtension, setSelectedExtension] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'lineInput') {
      let nextError = counter.error
      if (lineInput.length < value.length) {
        nextError =
          lines[currentLine].charAt(counter.current) !==
          value.charAt(counter.current)
            ? counter.error + 1
            : counter.error

        setCounter({
          total: counter.total + 1,
          error: nextError,
          current: counter.current + 1,
        })
      }

      setLineInput(value)
    }
  }

  const onClickDropdownDisplay = () => {
    setDropdownDisplay(!dropdownDisplay)
  }

  const onClickDropdown = (extension: string) => {
    setSelectedExtension(extension)
    setDropdownDisplay(false)
  }

  const onClickStartButton = () => {
    if (['curl', 'spring', 'flask', 'dotnetgc'].includes(selectedExtension)) {
      setExtensionError('')
      dispatch(getCode(selectedExtension))
    } else {
      setExtensionError(
        'extension can be only one of [curl, spring, flask, dotnetgc]'
      )
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLineInput('')
      setCounter({
        ...counter,
        error:
          counter.error + Math.abs(counter.current - lines[currentLine].length),
        current: 0,
      })
      setCurrentLine(currentLine + 1)
      if (currentLineRef && currentLineRef.current)
        currentLineRef.current.focus()
    } else if (e.key === 'Backspace') {
      if (lineInput !== '') {
        setCounter({
          total: counter.total - 1,
          error:
            lineInput.charAt(counter.current - 1) !==
            lines[currentLine].charAt(counter.current - 1)
              ? counter.error - 1
              : counter.error,
          current: counter.current - 1,
        })
      }
    }
  }

  useEffect(() => {
    if (getCodeSuccess && isFinish === false) {
      setIsStart(true)
      const interval = setInterval(() => {
        setTimer(timer - 1)

        if (timer === 0) {
          clearInterval(interval)
          setIsStart(false)
          setIsFinish(true)
          setTimer(30)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [getCodeSuccess, timer, isStart, isFinish])

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  useEffect(() => {
    if (checkIdError) {
      if (checkIdError.response.status === 401) {
        navigate('/login')
      }
    }

    if (getCodeError) {
      navigate('/')
    }
  }, [navigate, id, checkIdError, getCodeError])

  return (
    <>
      <Header id={id} />
      {!isFinish ? (
        <TypingStart
          isStart={isStart}
          timer={timer}
          currentLine={currentLine}
          currentLineRef={currentLineRef}
          extensionError={extensionError}
          lines={lines}
          lineInput={lineInput}
          dropdownDisplay={dropdownDisplay}
          selectedExtension={selectedExtension}
          onClickDropdownDisplay={onClickDropdownDisplay}
          onClickDropdown={onClickDropdown}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClickStartButton={onClickStartButton}
        />
      ) : (
        <TypingResult total={counter.total} error={counter.error} />
      )}
    </>
  )
}

export default TypingContainer
