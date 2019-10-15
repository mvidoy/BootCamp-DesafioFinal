import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, MeetupList, EmptyList, EmptyText } from './styles';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    try {
      setLoading(true);
      const response = await api.get('subscriptions');
      console.tron.log('subscriptions', response.data);
      setMeetups(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscribe(id) {
    try {
      setLoading(true);
      // await api.delete(`subscriptions/${id}`);
      await api.delete(`meetups/${id}/subscriptions`);

      Alert.alert('Sucesso!', 'Inscrição cancelada.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      loadSubscriptions();
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
    // loadSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Background>
      <Container>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            refreshing={loading}
            onRefresh={loadSubscriptions}
            renderItem={({ item }) => (
              <Meetup
                loading={loading}
                onSubmit={() => handleUnsubscribe(item.Meetup.id)}
                data={item.Meetup}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyList>
                <Icon name="mood-bad" size={56} color="#FFF" />
                <EmptyText>Você não se inscreveu em nenhum meetup</EmptyText>
              </EmptyList>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={22} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
