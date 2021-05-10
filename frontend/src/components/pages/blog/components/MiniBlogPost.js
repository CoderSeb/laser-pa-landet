/* eslint-disable no-undef */
import React, {useState, useRef, useLayoutEffect} from 'react'
import styled from 'styled-components'
import useClickRef from '../../../../hooks/useClickRef'

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.main};
  border-radius: 10px;
  padding: 0.5em;
  margin: 0.5em auto;
  border: 1px solid ${props => props.theme.colors.accent};
  user-select: none;
  transition: all 0.2s ease;
  max-width: 100%;
  width: 100%;
  height:700px;
  overflow: hidden;
  justify-content: center;


  img {
    max-width: 80%;
    height: 350px;
    border-radius: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    max-width: 47%;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.desktop}) {
    width: 25%;
  }

  &:hover {
    background: ${props => props.theme.colors.secondary};
    cursor: zoom-in;

    .blogTextContainer {
      background: ${props => props.theme.colors.main};
    }
  }

  &:active {
    opacity: 0.8;
  }

  .createdParagraph {
    float: right;
  }


  h1 {
    text-align: center;
  }

  .blogTextContainer {
    background: ${props => props.theme.colors.secondary};
    border-radius:5px;
    padding:.5em;
    min-height:100px;
    height: 190px;
    max-height: 190px;
    overflow: hidden;
  }
`

const BlogPost = ({title, text, blogImg, created, creator}) => {
  const [selected, setSelected] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const blogRef = useRef(null)
  let bigStyle = {}
  let innerStyle = {}
  let textStyle = {}
  let imgStyle = {}
  const handleSelection = () => {
    setSelected(prevSelected => !prevSelected)
  }

  useClickRef(blogRef, () => setSelected(false))

  useLayoutEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateWidth)
    updateWidth()
  }, [])

  if (selected) {
    innerStyle = {
      scale: '1.1',
      position: 'absolute',
      top: '180px',
      left: '50%',
      transform: 'translate(-50%)',
      width: '70%',
      zIndex: '50',
      maxHeight: '1000px',
      height: '100%',
      overflowY: 'scroll',
      cursor: 'zoom-out'
    }

    imgStyle = {
      maxWidth: '95%',
      height: '850px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1rem'
    }

    textStyle = {
      maxHeight: 'unset',
      overflow: 'initial',
      height: 'unset'
    }

    bigStyle = {
      height: '100%',
      borderRadius: '10px'
    }
  }
  if (selected && windowWidth < 1275) {
    bigStyle = {
      height: '100%'
    }

    innerStyle = {
      position: 'relative',
      height: 'auto',
      marginTop: '1rem',
      marginBottom: '1rem',
      zIndex: '50',
      maxHeight: 'initial',
      cursor: 'zoom-out'
    }

    imgStyle = {
      maxWidth: '95%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1rem'
    }

    textStyle = {
      maxHeight: 'unset',
      overflow: 'initial',
      height: 'unset'
    }
  }

  return (
    <StyledContainer style={innerStyle} ref={blogRef} onClick={handleSelection}>
    <div style={bigStyle}>
    <h1>{title}</h1>
      <img src={blogImg} style={imgStyle} alt={`Laser på landet, bild för inläggstitel: ${title}`} />
      <div style={textStyle} dangerouslySetInnerHTML={{ __html: `${text}` }} className="blogTextContainer">
      </div>
      <small>Skapad {created}</small><br />
      <small>Av {creator}</small>
      </div>
    </StyledContainer>
  )
}

export default BlogPost
