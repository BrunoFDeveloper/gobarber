import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório!'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no minimo 6 caracteres')
    .required('A senha é obrigatória!'),
});

export default function SignUp() {
  const { register, errors, handleSubmit } = useForm({
    validationSchema: signUpSchema,
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          type="text"
          placeholder="Nome completo"
          ref={register}
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          name="email"
          type="email"
          placeholder="Seu e-mail"
          autoComplete="new-username"
          ref={register}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          autoComplete="new-password"
          ref={register}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Criar conta</button>
        <Link to="/">já tenho login</Link>
      </form>
    </>
  );
}
