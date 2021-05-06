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

  .companyInfo {
    font-size: 0.8em;
    line-height: 15px;
    user-select: none;
  }
`

const ContactField = ({street, postal, city, tax, organisation}) => {
  return (
    <StyledContainer>
      <p>{street}<br />{postal}</p>
      <p>{city}</p>
      <hr />
      <p className="companyInfo">{organisation}</p>
      <p className="companyInfo">{tax}</p>
    </StyledContainer>
  )
}

export default ContactField
