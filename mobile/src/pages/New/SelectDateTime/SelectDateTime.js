import React, { useState, useEffect } from 'react';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';

import api from '~/services/api';

import DateInput from '~/components/DateInput/DateInput';
import { Container, HoursList, Hours, Title } from './styles';

export default function SelectDateTime({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const { provider } = route.params;

  const [hours, setHours] = useState([]);

  useEffect(() => {
    async function loadHours() {
      const response = await api.get(`/appointments/${provider.id}/available`, {
        params: { date: date.getTime() },
      });
      setHours(response.data);
    }
    loadHours();
  }, [date, provider.id]);

  function handleSelectHour(hour) {
    navigation.navigate('Confirm', { provider, hour });
  }

  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HoursList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hours
              // enabled={item.available}
              onPress={() => handleSelectHour(item.value)}
            >
              <Title>{item.time}</Title>
            </Hours>
          )}
        />
      </Container>
    </BgGradient>
  );
}
