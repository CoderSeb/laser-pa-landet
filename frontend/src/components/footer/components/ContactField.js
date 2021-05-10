import React from 'react'
import styled from 'styled-components'


const StyledContainer = styled.div`
  background-color: inherit;
  color: ${props => props.theme.colors.black};
  text-align: left;
  border: 1px dotted black;
  padding: .5em;
  width: 200px;

  p, a {
    line-height:20px;
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    line-height: 25px;
  }

  a:hover {
    text-decoration: underline;
  }

  a:focus {
    font-weight: bold;
  }

  .companyInfo {
    font-size: 0.8em;
    line-height: 15px;
    user-select: none;
  }
`

const ContactField = ({street, postal, city, tax, organisation, phone}) => {
  return (
    <StyledContainer>
      <p>{street}<br />{postal}</p>
      <p>{city}</p>
      <p>Tel: <a href={`tel:+46${phone.substring(1, phone.length)}`}>{phone}</a></p>
      <hr />
      <p className="companyInfo">{organisation}</p>
      <p className="companyInfo">{tax}</p>
    </StyledContainer>
  )
}

export default ContactField
