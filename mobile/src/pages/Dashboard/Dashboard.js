import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import api from '~/services/api';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';

import { Container, Appointments } from './styles';
import Appointment from '~/components/Appointment/Appointment';
import TitlePage from '~/components/TitlePage/TitlePage';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        Alert.alert('Erro ao buscar os agendamentos');
      }
    }
    getAppointments();
  }, []);

  async function handleCancel(id) {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(apointment => apointment.id !== id));
    } catch (error) {
      Alert.alert('Errou ao cancelar o agendamento!');
    }
  }

  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <TitlePage text="Agendametos" />
        <Appointments
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </BgGradient>
  );
}
