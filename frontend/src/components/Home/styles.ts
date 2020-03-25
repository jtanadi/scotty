import styled from "styled-components"

const Form = styled.form`
  width: 25%;
  min-width: 250px;
  margin: auto;
  display: flex;
  padding: 1.75rem 2rem;
  flex-direction: column;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0rem 0rem 1.5rem rgba(0, 0, 0, 0.25);
  font-family: sans-serif;
`

// Effectively hiding input
const Input = styled.input`
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

const Label = styled.label`
  margin: auto;
  margin-bottom: 1.75rem;
  background-color: #8ad7e6;
  border-radius: 0.5rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #6cbecc;
  }
`

const UploadButton = styled.button`
  border: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  background-color: #67e678;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: #54c463;
  }

  &:active {
    background-color: #40a84e;
  }

  &:disabled {
    color: gray;
    background-color: lightgray;
    cursor: not-allowed;
  }
`

export { Form, Label, Input, UploadButton }
