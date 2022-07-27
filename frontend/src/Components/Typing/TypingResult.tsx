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
    </>
  )
}

export default TypingResult
