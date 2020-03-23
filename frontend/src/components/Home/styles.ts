import styled from "styled-components"

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: white;
  display: flex;
`

const Form = styled.form`
  width: 30%;
  margin: auto;
  display: flex;
  padding: 1.5rem 2rem;
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
    background-color: #7cb8c2;
  }
`

const Label = styled.label`
  margin: auto;
  margin-bottom: 2rem;
  background-color: #b7e3eb;
  border-radius: 0.5rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #8cc5cf;
  }
`

const UploadButton = styled.button`
  border: 0;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  background-color: #7aeb89;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: #67c974;
  }

  &:focus {
    background-color: #4cba5b;
  }

  &:disabled {
    color: gray;
    background-color: lightgray;
    cursor: not-allowed;
  }
`

export { Background, Form, Label, Input, UploadButton }
