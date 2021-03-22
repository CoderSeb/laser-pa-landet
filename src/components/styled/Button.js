import styled from 'styled-components'


const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.light};
  padding:16px 38px;
  color:${props => props.theme.colors.dark};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  text-decoration:none;
  margin:1rem;
  font-weight:bold;
  transition: 0.2s ease-in-out;
  text-shadow:0px 1px 0px ${props => props.theme.colors.dark};

  &:hover {
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.main};
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.light};
    text-shadow:0px 1px 0px ${props => props.theme.colors.dark};
  }

  &:active {
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.dark};
  }
`


const Button = ({children}) => {
  return (
    <StyledButton>{children}</StyledButton>
  )
}

export default Button