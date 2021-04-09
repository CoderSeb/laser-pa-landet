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
`


const BlogEditor = () => {
  return (
    <StyledContainer>
      <h2>Blog Editor</h2>
      <CKEditor
        className="blogEditor"
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
    </StyledContainer>
  )
}

export default BlogEditor
