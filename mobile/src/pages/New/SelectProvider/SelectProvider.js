import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';
import BgGradient from '~/components/BackgroundGradient/BackgroundGradient';

export default function SelectProvider({ navigation }) {
  const [providers, setProdivers] = useState([]);

  useEffect(() => {
    async function getProviders() {
      const response = await api.get('providers');
      setProdivers(response.data);
    }
    getProviders();
  }, []);

  return (
    <BgGradient colors={['#7159c1', '#ab59c1']}>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider onPress={() => navigation.navigate('Date', { provider })}>
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </BgGradient>
  );
}

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
