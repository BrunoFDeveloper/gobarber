import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';
import { signInRequest } from '~/store/modules/auth/actions';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';
import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const passwordRef = useRef();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('Signup')}>
          <SignLinkText>Criar Conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </BgGradient>
  );
}
