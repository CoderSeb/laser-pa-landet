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
  width: 90%;
  height:fit-content;
  overflow: hidden;


  img {
    width: 100%;
    border-radius: 10px;
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
    max-height: 190px;
    overflow: hidden;
  }
`

const BlogPost = ({title, text, blogImg, created}) => {
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
      scale: '1.2',
      position: 'absolute',
      top: '280px',
      left: '50%',
      translate: '-50%',
      width: '70%',
      zIndex: '50',
      maxHeight: 'initial',
      cursor: 'zoom-out'
    }

    imgStyle = {
      maxWidth: '500px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1rem'
    }

    textStyle = {
      maxHeight: 'initial',
      overflow: 'initial'
    }

    bigStyle = {}
  }
  if (selected && windowWidth < 1275) {
    bigStyle = {
      height: '100%'
    }

    innerStyle = {
      scale: '1.1',
      position: 'relative',
      height: 'auto',
      marginTop: '8rem',
      marginBottom: '8rem',
      zIndex: '50',
      maxHeight: 'initial',
      cursor: 'zoom-out'
    }

    textStyle = {
      maxHeight: 'initial',
      overflow: 'initial'
    }
  }

  return (
    <StyledContainer style={innerStyle} ref={blogRef} onClick={handleSelection}>
    <div style={bigStyle}>
    <h1>{title}</h1>
      {blogImg && <img src={blogImg} style={imgStyle} alt={`Image for ${title}`} />}
      <div style={textStyle} className="blogTextContainer">
        <p>{text}</p>
      </div>
      <small>Skapad {created}</small>
      </div>
    </StyledContainer>
  )
}

export default BlogPost
