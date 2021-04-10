/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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

const BlogEditor = () => {
  return (
    <StyledContainer>
      <h2>Blog Editor</h2>
      <input className="titleInput" placeholder="Titel..." />
      <CKEditor
        editor={ClassicEditor}
        data="<p>Skriv det nya inlägget här!</p>"
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        } }
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({
            event,
            editor,
            data
          })
        } }
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
          onFocus={ (event, editor) => {
            console.log('Focus.', editor)
          }}
      />
      <StyledButton>Spara inlägg</StyledButton>
    </StyledContainer>
  )
}

export default BlogEditor
