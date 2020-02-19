import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório!'),
  password: Yup.string().required('A senha é obrigatória!'),
});

export default function SignIn() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: signInSchema,
  });

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function onSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          placeholder="Seu e-mail"
          ref={register}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          ref={register}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta gratuita</Link>
      </form>
    </>
  );
}
