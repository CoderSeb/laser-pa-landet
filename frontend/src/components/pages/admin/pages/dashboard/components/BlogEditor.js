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
      'heading', '|',
      'bold', 'italic',
      '|',
      'link', '|',
      'bulletedList', 'numberedList',
      'outdent', 'indent', '|',
      'undo', 'redo'
    ]
  },
  image: {},
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

    

  .idTd {
    width: 230px;
  }

  .btnTd {
    width:50px;
  }


  .tableBtn {
    width: 100%;
    height: 60px;
    margin:0;
    padding: 0;
    border-radius:0;
    border-style: ridge;
    border-width: 3px;
  }

  td, th {
    border: 1px solid ${props => props.theme.colors.accent};
    padding: 0px;
  }

  tr:nth-child(odd){background-color: ${props => props.theme.colors.mainTransparent};}


  tr:hover {
    background: ${props => props.theme.colors.mainTransparent};
    color: black;
    font-weight: bold;
    cursor: default;
  }

  th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: black;
  color: white;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
      width: 100%;
      margin: 0 auto;
      font-size: 0.8em;
      padding: 0;

      .idTd {
        display: none;
      }

      .btnTd {
        width:40px;
      }
    }
}
`

const StyledButton = styled.button`
  min-width: 100px;
  font-size: 1em;
  padding: .5em;
  border: 1px solid ${props => props.theme.colors.accent};
  outline: none;
  border-radius: 10px;
  margin:1em 0;
  background: ${props => props.theme.colors.main};

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
    height: 40px;
    font-size: 0.9em;
    padding: 0;
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
  const [blogContent, setBlogContent] = useState('<p>Skriv ditt inlägg här!</p>')
  const [blogImg, setBlogImg] = useState({})
  const [fileError, setFileError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [blogPosts, setBlogPosts] = useState([])
  const [modified, setModified] = useState(false)
  const [willEdit, setWillEdit] = useState(false)
  const [editId, setEditId] = useState('')

  const getPosts = () => {
    // eslint-disable-next-line no-undef
    axios.get(`${process.env.REACT_APP_API}/blog`).then(response => {
    setBlogPosts(response.data)
  }).
  catch(err => {
    if (err) {
      setFeedback(err.message)
    }
  })
  }

  const sendPayload = bodyPayload => {
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    axios({
      method: 'post',
      // eslint-disable-next-line no-undef
      url: `${process.env.REACT_APP_API}/blog`,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      },
      data: bodyPayload
    }).then(response => {
      setFeedback(response.data.message)
      setModified(true)
      setBlogImg({})
      setBlogContent('<p>Skriv ditt inlägg här!</p>')
      setBlogTitle('')
    }).
      catch(err => {
      setFeedback(err.response.data.message)
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const bodyFormData = new FormData()
    bodyFormData.append('title', blogTitle)
    bodyFormData.append('content', blogContent)
    bodyFormData.append('image', blogImg.currentFile)
    sendPayload(bodyFormData)
  }

  const selectFile = e => {
    e.preventDefault()
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
    getPosts()
    setModified(false)
  }, [modified])

  const handleRemovePost = id => {
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    axios({
      method: 'delete',
      // eslint-disable-next-line no-undef
      url: `${process.env.REACT_APP_API}/blog/${id}`,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      }
    }).then(response => {
      if (response.status === 204) {
        setFeedback('Inlägg borttaget')
        setModified(true)
      }
    }).
    catch(err => {
      setFeedback(err.response.data.message)
    })
  }

  const handleStartEdit = id => {
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    axios({
      method: 'get',
      // eslint-disable-next-line no-undef
      url: `${process.env.REACT_APP_API}/blog/${id}`,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      }
    }).then(response => {
      console.log(response.data)
      setBlogTitle(response.data.title)
      setBlogContent(response.data.content)
      setEditId(response.data._id)
      setWillEdit(true)
      setFeedback('Inlägget kan nu editeras.')
    }).
    catch(err => {
      if (err) {
        setFeedback('Något gick fel! Ladda om sidan och försök igen.')
      }
    })
  }

  const saveEditedPost = (e, id) => {
    e.preventDefault()
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    const payload = {
      title: blogTitle,
      content: blogContent
    }
    axios({
      method: 'put',
      // eslint-disable-next-line no-undef
      url: `${process.env.REACT_APP_API}/blog/${id}`,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      },
      data: payload
    }).then(response => {
      setBlogTitle('')
      setBlogContent('<p>Skriv ditt inlägg här!</p>')
      setEditId('')
      setFeedback(response.data)
      setWillEdit(false)
      setModified(true)
    }).
    catch(err => {
      if (err) {
        setFeedback('Något gick fel! Ladda om sidan och försök igen.')
      }
    })
  }

  return (
    <StyledContainer>
      <h2>Blog Editor</h2>
      <form encType="multipart/form-data">
      {editId.length > 0 && <p>ID: {editId}</p>}
      <input className="titleInput" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} placeholder="Titel..." />
      <br />
      {!willEdit && <label>Välj bild för inlägg</label>}
        {fileError.length > 0 && <small className="fileError">{fileError}</small>}
        {!willEdit && <input className="imageInput" type="file" name="file" accept="image/*" onChange={selectFile} />}
        <br />
        {blogImg.previewImage && !willEdit &&
          <PreviewImgContainer>
            <PreviewImg alt="Förhandsvisning för ny blog bild" src={blogImg.previewImage} />
            <br />
            <button onClick={() => setBlogImg({})}>Ta bort bild</button>
          </PreviewImgContainer>}
      <CKEditor
          editor={ ClassicEditor }
          config={ editorConfiguration }
          data={blogContent}
          onReady={editor => {
            console.log(Array.from(editor.ui.componentFactory.names()))
          }}
          onChange={(event, editor) => {
              const data = editor.getData()
              setBlogContent(data)
          }}
      />
      <p className="feedbackParagraph">{feedback}</p>
      {willEdit && <StyledButton onClick={e => saveEditedPost(e, editId)}>Spara redigerat inlägg</StyledButton>}
      {!willEdit && <StyledButton onClick={e => handleSubmit(e)}>Spara inlägg</StyledButton>}
      </form>
      <div className="tableContainer">
      <h2>Aktiva inlägg</h2>
        <table>
          <tbody>
          <tr><th className="idTd">ID</th><th>Titel</th><th>Edit</th><th>Delete</th></tr>
            {blogPosts.map(post => <tr key={post.id}>
              <td className="idTd">{post.id}</td>
              <td>{post.title}</td>
              <td className="btnTd"><StyledButton className="tableBtn" onClick={() => handleStartEdit(post.id)}>Redigera</StyledButton></td>
              <td className="btnTd"><StyledButton className="tableBtn" onClick={() => handleRemovePost(post.id)}>Ta bort</StyledButton></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </StyledContainer>
  )
}

export default BlogEditor
