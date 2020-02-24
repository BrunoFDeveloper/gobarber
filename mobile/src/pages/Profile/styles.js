import styled from 'styled-components/native';
import Input from '~/components/Input/Input';
import Button from '~/components/Button/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
  margin-top: 50px;
`;

export const Separator = styled.View`
  height: 1px;
  margin: 30px 0 30px;
  background: rgba(255, 255, 255, 0.2);
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;
