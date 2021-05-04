import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PageContainer from '../../styled/PageContainer'
import MiniBlogPost from './components/MiniBlogPost'
import BlogContainer from './components/BlogContainer'


const Blog = () => {
  const [allPosts, setAllPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const getPosts = () => {
    // eslint-disable-next-line no-undef
    axios.get(process.env.REACT_APP_API_GET_POSTS).then(response => {
    setAllPosts(response.data)
  }).
  catch(err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err)
      setErrorMessage(err.message)
    }
  })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <PageContainer height="150vh">
    <BlogContainer>
    {allPosts.length > 0 && allPosts.map(post => <MiniBlogPost key={post.id} title={post.title} text={post.content} created={post.created} creator={post.creator} />)}
    {errorMessage.length > 0 && <h4>{errorMessage}</h4>}
       </BlogContainer>
    </PageContainer>
  )
}

export default Blog
