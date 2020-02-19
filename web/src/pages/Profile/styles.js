import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  hr {
    border: none;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    margin: 10px 0 20px;
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #3b9eff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
  }
`;
