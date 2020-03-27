import styled from "styled-components"

import { ButtonOK } from "../globalStyles"

export const Form = styled.form`
  width: 25%;
  min-width: 250px;
  margin: auto;
  display: flex;
  padding: 1.75rem 2rem;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
  font-family: sans-serif;
`

// Effectively hiding input
export const Input = styled.input`
  width: 0.01px;
  height: 0.01px;
  opacity: 0;
  position: absolute;
  z-index: -999;

  &:focus + label {
    outline: 1px dotted black;
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:active + label {
    background-color: #56aab8;
  }
`

export const Label = styled.label`
  margin: auto;
  margin-bottom: 1.75rem;
  background-color: #8ad7e6;
  border-radius: 0.5rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: #6cbecc;
  }
`

export const UploadButton = styled(ButtonOK)`
  width: 100%;
`
