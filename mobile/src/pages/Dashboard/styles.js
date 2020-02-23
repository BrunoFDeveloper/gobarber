import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  align-self: center;
  margin-top: 25px;
  color: #fff;
`;

export const Appointments = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
