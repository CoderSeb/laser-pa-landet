import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MiniBlogPost from './components/MiniBlogPost'
import BlogContainer from './components/BlogContainer'
import styled, { css } from 'styled-components'


const StyledContainer = styled.div`
  width: 100%;
  min-height:100%;
  padding: 1em;
  background-color: #ccd6ff;
  justify-content: center;
  gap: 1em;

  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  `}

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    flex-direction: column;
  }
`

const Blog = () => {
  const [allPosts, setAllPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const getPosts = () => {
    // eslint-disable-next-line no-undef
    axios.get(`${process.env.REACT_APP_API}/blog`).then(response => {
    setAllPosts(response.data)

  }).
  catch(err => {
    if (err) {
      setErrorMessage(err.message)
    }
  })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <StyledContainer style={allPosts.length > 0 ? {minHeight: '100vh'} : {minHeight: '100%'}}>
    {allPosts.length === 0 && <h1 style={{textAlign: 'center'}}>Inlägg kommer inom kort, kika in snart igen!</h1>}
    <BlogContainer>
    {allPosts.length > 0 && allPosts.map(post => {
    return (
    <MiniBlogPost
    key={post.id}
    blogImg={post.image}
    title={post.title}
    text={post.content} created={post.created} creator={post.creator} />
    )
    })}
    {errorMessage.length > 0 && <h4>{errorMessage}</h4>}
       </BlogContainer>
    </StyledContainer>
  )
}

export default Blog
