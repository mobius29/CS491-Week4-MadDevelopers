import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import TypingStart from '../../Components/Typing/TypingStart'
import { RootState } from '../../Modules'
import { check } from '../../Modules/Auth'

const TypingStartContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dropdownDisplay, setDropdownDisplay] = useState<boolean>(false)
  const [selectedExtension, setSelectedExtension] = useState<string>('')
  const [extensionError, setExtensionError] = useState<string>('')
  const { id, checkIdError } = useSelector(({ auth }: RootState) => ({
    id: auth.id,
    checkIdError: auth.checkIdError,
  }))

  useEffect(() => {
    dispatch(check())
  }, [dispatch])

  const onClickDropdownDisplay = () => {
    setDropdownDisplay(!dropdownDisplay)
  }

  const onClickDropdown = (extension: string) => {
    setSelectedExtension(extension)
    setDropdownDisplay(false)
  }

  const onClickStartButton = () => {
    if (['curl', 'spring', 'git', 'dotnetgc'].includes(selectedExtension)) {
      setExtensionError('')
      navigate(`/typing/doing/${selectedExtension}`)
    } else {
      setExtensionError(
        'extension can be only one of [curl, spring, flask, dotnetgc]'
      )
    }
  }

  useEffect(() => {
    if (checkIdError) {
      if (checkIdError.response.status === 401) {
        navigate('/login')
      }
    }
  }, [navigate, id, checkIdError])

  return (
    <>
      <Header id={id} />
      <TypingStart
        extensionError={extensionError}
        dropdownDisplay={dropdownDisplay}
        selectedExtension={selectedExtension}
        onClickDropdownDisplay={onClickDropdownDisplay}
        onClickDropdown={onClickDropdown}
        onClickStartButton={onClickStartButton}
      />
    </>
  )
}

export default TypingStartContainer
