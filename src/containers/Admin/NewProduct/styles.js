import styled from 'styled-components'
import { Button } from '../../../components/Atoms/Button'

export const Container = styled.div`
  form {
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 25;
    .dropzone {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      margin-top: 15px;
      border-width: 2px;
      border-radius: 2px;
      border: 2px #8f8f8f dashed;
      border-style: dashed;
      background-color: #fafafa;
      color: #bdbdbd;
      outline: none;
      transition: border 0.24s ease-in-out;

      p {
        font-size: 15px;
        color: #000000;
      }
    }
  }
`
export const Label = styled.p`
  font-size: 15px;
  color: #000;
  margin-bottom: 5px;
`

export const BoxArea = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

export const ButtonStyle = styled(Button)`
  width: 100%;
  margin-top: 25px;
`
export const LabelUpload = styled.label`
  margin-top: 10px;
  margin-bottom: 25px;
  cursor: pointer;
  display: flex;
  border: 1px #000 dashed;
  border-radius: 5px;
  padding: 35px;
  gap: 5px;
  align-items: center;
  color: #000;

  input {
    width: 1px;
    opacity: 0;
  }
`

export const ContainerInput = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 20px;

  input {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`
