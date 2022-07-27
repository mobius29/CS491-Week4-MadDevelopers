import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TypingDoing from '../../Components/Typing/TypingDoing'
import { RootState } from '../../Modules'
import { getCode, initialize } from '../../Modules/Code'

const TypingDoingContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { extension } = useParams()
  const currentLineRef = useRef<HTMLInputElement>(null)
  const [lineInput, setLineInput] = useState<string>('')
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
  const { lines, getCodeError } = useSelector(({ code }: RootState) => ({
    lines: code.lines,
    getCodeError: code.getCodeError,
  }))

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
      if (currentLineRef && currentLineRef.current) {
        currentLineRef.current.focus()
      }
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
    const timerInterval = setInterval(() => {
      setTimer(timer - 1)
      if (timer === 0) {
        clearInterval(timerInterval)
      }
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [timer])

  if (timer === 0) {
    setTimer(30)
    navigate(`/typing/result?total=${counter.total}&error=${counter.error}`)
  }

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  useEffect(() => {
    if (extension !== undefined) dispatch(getCode(extension))
  }, [dispatch, extension])

  useEffect(() => {
    if (getCodeError) {
      navigate('/')
    }
  }, [navigate, getCodeError])

  return (
    <TypingDoing
      timer={timer}
      currentLine={currentLine}
      currentLineRef={currentLineRef}
      lines={lines}
      lineInput={lineInput}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

export default TypingDoingContainer
