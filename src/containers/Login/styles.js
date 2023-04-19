import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  box-align: center;
`

export const ContainerItens = styled.div`
  display: flex;
  background-color: #373737;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 47vh;
    height: 17vh;
  }
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 28px;
    color: #ffffff;
    text-align: center;
    margin-top: 11vh;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
      flex: 1 1 0%;

      svg {
        position: absolute;
        left: 12px;
        top: 5px;
      }

      span {
        position: absolute;
        right: 0;
        cursor: pointer;

        .iconVisiblity {
          position: relative;
          right: 0;
          top: 18px;
          bottom: 0;
          left: 0;
          transform: translateX(-12px) translateY(-16px);
          transition: all 0.5s ease;

          :hover {
            fill: #000;
          }
        }
      }
    }
  }
`

export const Label = styled.p`
  margin-top: 17px;
  margin-bottom: 5px;
  margin-left: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 14px;
  color: #ffffff;
`

export const Input = styled.input`
  max-width: 75vw;
  width: 55vh;
  height: 5vh;
  background: #ffffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
`

export const CadastrarLink = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-top: 5vh;
  cursor: pointer;
  color: #ffffff;
`

export const ContainerButton = styled.div`
  max-width: 75vw;
  width: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
