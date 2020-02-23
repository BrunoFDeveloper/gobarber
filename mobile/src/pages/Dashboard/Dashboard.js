import React from 'react';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';

import { Container, Title, Appointments } from './styles';
import Appointment from '~/components/Appointment/Appointment';

const dataArr = [0, 1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <Title>Agendamento</Title>
        <Appointments
          data={dataArr}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Appointment data={item} />}
        />
      </Container>
    </BgGradient>
  );
}
