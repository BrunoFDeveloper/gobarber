import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      background: none;
      border: none;
    }

    span {
      font-weight: bold;
      font-size: 22px;
      color: #fff;
      margin: 0 10px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  opacity: ${({ past }) => (past ? '0.6' : 1)};

  strong {
    display: block;
    color: ${({ available }) => (available ? '#999' : '#7159c1')};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    margin-top: 3px;
    display: block;
    color: ${({ available }) => (available ? '#999' : '#666')};
  }
`;
