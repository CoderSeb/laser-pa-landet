/* eslint-disable no-console */
import React, { useState } from 'react'
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/sv'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo',
      '|',
      'mediaEmbed'
    ]
  },
  image: {},
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  language: 'sv'
}

const StyledContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding:1em;
  background: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.accent};

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
    padding: .5em;
  }

  .titleInput {
    font-size: 1.3em;
    padding: 0.5em;
    width: 50%;
    margin: 1em 0em;

    @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
    }
  }
`

const StyledButton = styled.button`
  width: 30%;
  font-size: 1.2em;
  padding: .5em;
  border: 1px solid ${props => props.theme.colors.accent};
  outline: none;
  border-radius: 10px;
  margin: 1em 0;

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
  }

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.main};
  }

  &:active {
    background: black;
  }
`

const PreviewImg = styled.img`
  height: 400px;
`

const PreviewImgContainer = styled.div`
  padding: 2em;
`

const BlogEditor = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogImg, setBlogImg] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    console.log(blogTitle)
    console.log(blogContent)
  }

  const selectFile = e => {
    const selectedFile = {
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
      progress: 0,
      message: ""
    }
    setBlogImg(selectedFile)
  }

  return (
    <StyledContainer>
      <h2>Blog Editor</h2>
      <form onSubmit={handleSubmit}>
      <input className="titleInput" onChange={e => setBlogTitle(e.target.value)} placeholder="Titel..." />
      <br />
      <label>Välj bild för inlägg</label><br />
      <input type="file" accept="image/*" onChange={selectFile} />
      <br />
      {blogImg.previewImage &&
        <PreviewImgContainer>
          <PreviewImg src={blogImg.previewImage} />
          <br />
          <button onClick={() => setBlogImg({})}>Ta bort bild</button>
        </PreviewImgContainer>}
      <CKEditor
          editor={ ClassicEditor }
          config={ editorConfiguration }
          data="<p>Skriv ditt inlägg här!</p>"
          onReady={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
          } }
          onChange={(event, editor) => {
              const data = editor.getData()
              setBlogContent(data)
              console.log({event,
                editor,
                data })
          }}
          onBlur={(event, editor) => {
              console.log('Blur.', editor)
          } }
          onFocus={(event, editor) => {
              console.log('Focus.', editor)
          }}
      />
      <StyledButton type="submit">Spara inlägg</StyledButton>
      </form>
    </StyledContainer>
  )
}

export default BlogEditor
