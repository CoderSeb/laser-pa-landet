/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
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
      'redo'
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

  .fileError {
    color: red;
    display: block;
  }

  .imageInput {
    display: block;
  }

  .feedbackParagraph {
    display: block;
    color: yellow;
    font-size: 1.3em;
  }

  .tableContainer table {
    text-align: center;
  border-collapse: collapse;
  border: 3px solid  ${props => props.theme.colors.accent};
  width: 100%;

  td, th {
    border: 1px solid ${props => props.theme.colors.accent};
    padding: 8px;
  }

  tr:nth-child(odd){background-color: ${props => props.theme.colors.mainTransparent};}
  }


  tr:hover {
    background: ${props => props.theme.colors.mainTransparent};
    color: black;
    font-weight: bold;
  }

  th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: black;
  color: white;
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
  padding: 1em 0em;
`

const BlogEditor = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogImg, setBlogImg] = useState({})
  const [fileError, setFileError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [blogPosts, setBlogPosts] = useState([])

  const sendPayload = bodyPayload => {
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    axios({
      method: 'post',
      // eslint-disable-next-line no-undef
      url: 'http://localhost:5050/api/v1/blog',
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      },
      data: bodyPayload
    }).then(response => {
      setFeedback(response.data.message)
    }).
      catch(err => {
      setFeedback(err.response.data.message)
    })
  }

  const getPosts = () => {
    // eslint-disable-next-line no-undef
    axios.get(process.env.REACT_APP_API_BLOG).then(response => {
    setBlogPosts(response.data)

  }).
  catch(err => {
    if (err) {
      setFeedback(err.message)
    }
  })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setTimeout(() => {
    const bodyFormData = new FormData()
    bodyFormData.append('title', blogTitle)
    bodyFormData.append('content', blogContent)
    bodyFormData.append('image', blogImg.currentFile)
    sendPayload(bodyFormData)
    getPosts()
  }, 500)
  }

  const selectFile = e => {
    if (e.target.files[0].size > 1572864) {
      setFileError('Bilden är för stor! Max 1,5MB.')
      return
    }
      setFileError('')
      const selectedFile = {
        currentFile: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0])
      }
      setBlogImg(selectedFile)
  }

  useEffect(() => {
    setBlogPosts(blogPosts)
  }, [blogPosts])


  useEffect(() => {
    getPosts()
  }, [])

  const handleRemovePost = id => {
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    axios({
      method: 'delete',
      // eslint-disable-next-line no-undef
      url: `${process.env.REACT_APP_API_BLOG}/${id}`,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      }
    })

    getPosts()
  }

  return (
    <StyledContainer>
      <h2>Blog Editor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input className="titleInput" onChange={e => setBlogTitle(e.target.value)} placeholder="Titel..." />
      <br />
      <label>Välj bild för inlägg</label><br />
      {fileError.length > 0 && <small className="fileError">{fileError}</small>}
      <input className="imageInput" type="file" name="file" accept="image/*" onChange={selectFile} />
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
      {feedback.length > 0 && <p className="feedbackParagraph">{feedback}</p>}
      <StyledButton type="submit">Spara inlägg</StyledButton>
      </form>
      <div className="tableContainer">
      <h2>Aktiva inlägg</h2>
        <table>
          <tbody>
          <tr><th>ID</th><th>Titel</th><th>Edit</th><th>Delete</th></tr>
            {blogPosts && blogPosts.map(post => {
              const { id, title } = post
              return (
              <tr key={post.id}>
              <td>{id}</td>
              <td>{title}</td>
              <td><button type="button">Redigera</button></td>
              <td><button onClick={() => handleRemovePost(id)}>Ta bort</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </StyledContainer>
  )
}

export default BlogEditor
