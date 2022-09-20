import styled from 'styled-components';

export const Container = styled.div`
  background: #fefefe;
  border: 1px solid #f4f6f8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  &.with-shadow {
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0px 8px 16px -8px rgba(0, 0, 0, 0.15);
  }
`;
