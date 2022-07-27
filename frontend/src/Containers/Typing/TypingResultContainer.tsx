import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../../Components/Common/Header'
import TypingResult from '../../Components/Typing/TypingResult'
import { RootState } from '../../Modules'
import { check } from '../../Modules/Auth'

const TypingResultContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, checkIdError } = useSelector(({ auth }: RootState) => ({
    id: auth.id,
    checkIdError: auth.checkIdError,
  }))
  const [queryParams] = useSearchParams()
  const total = parseInt(queryParams.get('total')!!)
  const error = parseInt(queryParams.get('error')!!)

  console.log('result')
  useEffect(() => {
    dispatch(check())
  }, [dispatch])

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
      <TypingResult total={total} error={error!!} />
    </>
  )
}

export default TypingResultContainer
