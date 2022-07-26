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
  const [extension, setExtension] = useState<string>('')
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'extension') {
      setExtension(value)
    } else if (name === 'lineInput') {
      setLineInput(value)
    }
  }

  const onClickStartButton = () => {
    if (['c', 'cpp', 'java', 'python'].includes(extension)) {
      setExtensionError('')
      dispatch(getCode(extension))
    } else {
      setExtensionError('extension can be only one of [c, cpp, java, python]')
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLineInput('')
      setCurrentLine(currentLine + 1)
      if (currentLineRef && currentLineRef.current)
        currentLineRef.current.focus()
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
          extension={extension}
          extensionError={extensionError}
          lines={lines}
          lineInput={lineInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClickStartButton={onClickStartButton}
        />
      ) : (
        <TypingResult />
      )}
    </>
  )
}

export default TypingContainer
