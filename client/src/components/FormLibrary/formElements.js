import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colors = {
  // border: "#0075FF", Color azul del borde por defecto
  border: '#49bebc',
  error: '#b22222',
  errorHover: '#751e1a',
  success: '#1ed12d',
  inputColor: 'transparent',
  darkPrimaryColor: '#27272a',
  darkInputColor: '#3f3f46',
  buttonPrimary: '#4f46e5',
  buttonPrimaryHover: '#4338ca'
}

export const Label = styled.label`
  // display: inline;
  line-height: 40px;
  font-weight: 500;
  padding: 15px 3px;
  cursor: pointer;
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
`

export const Input = styled.input`
  width: 100%;
  background: ${colors.inputColor};
  border-radius: 0.375rem;
  height: 45px;
  line-height: 45px;
  padding: 0 40px 0 10px;
  transition: 0.3s ease all;
  border: 2px solid transparent;

  &:focus {
    border: 2px solid ${colors.border};
    outline: none;
  }

  ${(props) =>
    props.$valid === 'true' &&
    css`
      border: 2px solid transparent;
    `}

  ${(props) =>
    props.$valid === 'false' &&
    css`
      border: 2px solid ${colors.error} !important;
    `}
`
export const Select = styled.select`
  width: 100%;
  background: ${colors.inputColor};
  border-radius: 0.375rem;
  height: 45px;
  line-height: 45px;
  padding: 0 40px 0 10px;
  transition: 0.3s ease all;
  border: 2px solid transparent;

  &:focus {
    border: 2px solid ${colors.border};
    outline: none;
  }

  ${(props) =>
    props.$valid === 'true' &&
    css`
      border: 2px solid transparent;
    `}

  ${(props) =>
    props.$valid === 'false' &&
    css`
      border: 2px solid ${colors.error} !important;
    `}
`

export const Textarea = styled.textarea`
  width: 100%;
  background: ${props => props.$inputColor === 'dark' ? colors.darkInputColor : colors.inputColor};
  border-radius: 0.375rem;
  transition: 0.3s ease all;
  line-height: 40px;
  padding: 0px 40px 0px 10px;
  border: 2px solid transparent;
  // border: 2px solid ${props => props.$inputColor === 'dark' ? 'transparent' : '#d4d4d4'};

  &:focus {
    border: 2px solid ${colors.border};
    outline: none;
  }

  ${(props) =>
    props.$valid === 'true' &&
    css`
      border: 2px solid transparent;
    `}

  ${(props) =>
    props.$valid === 'false' &&
    css`
      border: 2px solid ${colors.error} !important;
  `}
`

export const InputError = styled.p`
  font-size: 12px;
  color: ${colors.error};
  display: none;
  max-width: 237px;

  ${(props) =>
    props.$valid === 'true' &&
    css`
      display: none;
    `}

  ${(props) =>
    props.$valid === 'false' &&
    css`
      display: block;
    `}
`

export const ValidationIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  border-radius: 50%;
  z-index: 1;
  font-size: 18px;
  opacity: 0;

  ${(props) =>
    props.$valid === 'false' &&
    css`
      opacity: 1;
      color: #b92a27;
    `}

  ${(props) =>
    props.$valid === 'true' &&
    css`
      opacity: 1;
      color: ${colors.success};
    `}

  ${(props) =>
    props.$hidden === 'true' &&
    css`
      display: none;
    `}
`

export const Button = styled.button`
  margin: 15px 0px;
  // padding: 10px 15px;
  padding: ${props => props.$modal === true ? '7px 60px' : '10px 15px'};
  width: fit-content;
  background: ${colors.buttonPrimary};
  color: #fff;
  font-size: 1em;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.1s ease all;

  &:hover {
    background: ${colors.buttonPrimaryHover};
  }
`
export const DeleteButton = styled(Button)`
  background: ${colors.error};

  &:hover {
    background: ${colors.errorHover};
  }
`

export const SuccessMessage = styled.p`
  font-size: 14px;
  color: ${colors.success};
`

export const ErrorMessage = styled.div`
  height: 45px;
  line-height: 45px;
  background: #f66060;
  padding: 0px 15px;
  border-radius: 0.375rem;
  p {
    margin: 0;
  }
  b {
    margin-left: 10px;
  }
`
