import styled from 'styled-components'
import { useState } from 'react'

const WritePostBlock = styled.div`
  width: 90%;
  margin: 0 auto;

  .title {
    width: 100%;
    height: 50px;
    margin-top: 0.5rem;
    padding-top: 1rem;
    padding-left: 1rem;
    font-size: 1.5rem;
  }

  .title-input {
    width: 100%;
    height: 50px;
    margin-top: 0.5rem;
    padding-left: 1rem;
  }

  .content-area {
    margin-top: 1rem;
  }

  .content-text {
    margin-left: 1rem;
    font-size: 1.5rem;
  }

  .content-textarea {
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

interface TagType {
  tagId: number
  tag: string
}

interface IProps {
  form: {
    title: string
    content: string
    tags: TagType[]
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error: string
  addTags: (id: number) => void
  removeTags: (idx: number) => void
}

const findMaxTagId = (tags: TagType[]) => {
  let maxId = -1
  for (let i = 0; i < tags.length; ++i) {
    if (maxId < tags[i].tagId) {
      maxId = tags[i].tagId
    }
  }

  return maxId
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
      key={tag.tagId}
      id={tag.tagId}
      tag={tag.tag}
      onChange={onChange}
      removeTags={removeTags}
    />
  ))
  const [numId, setNumId] = useState<number>(findMaxTagId(form.tags) + 1)

  return (
    <WritePostBlock>
      <form onSubmit={onSubmit}>
        <div className='title-area'>
          <div className='title'>Title</div>
          <input
            type='text'
            className='title-input'
            name='title'
            placeholder='title'
            value={form.title}
            onChange={onChange}
          />
        </div>

        <div className='content-area'>
          <div className='content-text'>Content</div>
          <textarea
            className='content-textarea'
            name='content'
            placeholder='content'
            value={form.content}
            onChange={onChangeTextArea}
          />
        </div>

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
