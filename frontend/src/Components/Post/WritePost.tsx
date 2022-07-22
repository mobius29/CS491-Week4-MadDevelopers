import styled from 'styled-components'
import { useState } from 'react'

const WritePostBlock = styled.div`
  width: 100%;
  height: 800px;

  .title {
    width: 100%;
    height: 50px;
    margin-top: 2rem;
    padding-left: 1rem;
  }

  .content {
    width: 100%;
    height: 600px;
    margin-top: 1rem;
    padding-left: 1rem;
    padding-top: 1rem;
  }

  .tag-area {
    margin-top: 1rem;
    display: flex;
  }

  .bottom-btns {
    display: flex;

    margin-top: 1rem;
  }
`

const TagBlock = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid black;
`

interface TagProps {
  id: number
  tag: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  removeTags: (idx: number) => void
}

const Tag = ({ id, tag, onChange, removeTags }: TagProps) => {
  return (
    <>
      <TagBlock
        id={id.toString()}
        name='tags'
        value={tag}
        onChange={onChange}
      />
      <span onClick={() => removeTags(id)}>X</span>
    </>
  )
}

interface IProps {
  type: 'write'
  form: {
    title: string
    content: string
    tags: {
      id: number
      tag: string
    }[]
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error: string
  addTags: (id: number) => void
  removeTags: (idx: number) => void
}

const WritePost = ({
  form,
  onChange,
  onChangeTextArea,
  onSubmit,
  addTags,
  removeTags,
  error,
}: IProps) => {
  const tagList = form.tags.map((tag) => (
    <Tag
      key={tag.id}
      id={tag.id}
      tag={tag.tag}
      onChange={onChange}
      removeTags={removeTags}
    />
  ))
  const [numId, setNumId] = useState<number>(1)

  return (
    <WritePostBlock>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='title'
          name='title'
          placeholder='title'
          value={form.title}
          onChange={onChange}
        />
        <textarea
          className='content'
          name='content'
          placeholder='content'
          value={form.content}
          onChange={onChangeTextArea}
        />

        <div className='tag-area'>{tagList}</div>
        <div className='bottom-btns'>
          <span
            className='add-tag-btn'
            onClick={() => {
              addTags(numId)
              setNumId(numId + 1)
            }}
          >
            add
          </span>
          <button className='submit-btn' type='submit'>
            submit
          </button>
        </div>
      </form>
    </WritePostBlock>
  )
}

export default WritePost
