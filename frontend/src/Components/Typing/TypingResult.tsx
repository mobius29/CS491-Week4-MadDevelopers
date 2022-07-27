import { Link } from "react-router-dom"

interface IProps {
  total: number
  error: number
}

const TypingResult = ({ total, error }: IProps) => {
  return (
    <>
      <div>total: {total}</div>
      <div>error: {error}</div>
      <div>cpm: {(total - error) * 2}</div>
      <Link to="/typing">다시하기</Link>
    </>
  )
}

export default TypingResult
