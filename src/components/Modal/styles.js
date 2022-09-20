import styled from 'styled-components';

export const ModalContent = styled.div``;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: #454f5b;
`;

export const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 136%;
  color: #000000;
  margin: 40px 0;
`;

export const ButtonsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #f4f6f8;
  padding-top: 20px;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  color:blue;
  font-weight: 500;
  font-size: 12px;
  width: 170px;
  height: 40px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: blue;
    color: white;
  }
`;

export const ModalContentLoading = styled.div`

  h2 {
    font-weight: 500;
    font-size: 20px;
    color: #000000;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 136%;
    color: #000000;
    margin: 40px 0;
  }

  img {
    width: 30%;
    margin-left: 35%;
    margin-right: 35%;

    @media screen and (max-width: 1000px) {
      width:40%;
  }
}
`;
