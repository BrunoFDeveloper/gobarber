import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  align-self: center;
  margin-top: 25px;
  color: #fff;
`;

export default function TitlePage({ text }) {
  return <Title>{text}</Title>;
}

TitlePage.propTypes = {
  text: PropTypes.string.isRequired,
};
