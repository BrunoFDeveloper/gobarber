import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { StackActions } from '@react-navigation/native';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ route, navigation }) {
  const { provider, hour } = route.params;
  const timeFormatted = useMemo(
    () => formatRelative(parseISO(hour), new Date(), { locale: pt }),
    [hour]
  );

  function confirmSchedule() {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('Dashboard');
  }
  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? `https://api.adorable.io/avatar/50/${provider.name}.png`
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{timeFormatted}</Time>
        <SubmitButton onPress={confirmSchedule}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </BgGradient>
  );
}
