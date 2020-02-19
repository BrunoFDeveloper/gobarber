import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import AvatarPreview from './AvatarPreview/AvatarPreview';

import { Container, Form } from './styles';
import Input from '~/components/Input/Input';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function onSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <AvatarPreview imageUrl={profile.avatar.url} register={register} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          defaultValue={profile.name}
          name="name"
          type="text"
          placeholder="Seu nome"
          ref={register}
        />
        <Input
          defaultValue={profile.email}
          name="email"
          type="email"
          placeholder="Seu email"
          ref={register}
        />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha antiga"
          ref={register}
        />
        <Input
          name="password"
          type="password"
          placeholder="Sua nova senha"
          ref={register}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
          ref={register}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar perfil'}
        </button>
      </Form>
      <button type="button" onClick={() => dispatch(signOut())}>
        Sair do gobarber
      </button>
    </Container>
  );
}
