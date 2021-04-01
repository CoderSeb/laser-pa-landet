import React from 'react'
import styled from 'styled-components'


const StyledContainer = styled.div`
  background-color: inherit;
  color: ${props => props.theme.colors.black};
  text-align: left;
  border: 1px dotted black;
  padding: .5em;
  width: 200px;

  p {
    line-height:normal;
  }
`

const ContactField = ({street, postal, city}) => {
  return (
    <StyledContainer>
      <p>{street}<br />{postal}</p>
      <p>{city}</p>
    </StyledContainer>
    )
}

export default ContactField