import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  MeetupList,
  Header,
  HeaderButton,
  HeaderDate,
  EmptyList,
  EmptyText,
} from './styles';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

const perPage = 10;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isDashboard, setIsDashboard] = useState(true);
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups() {
    if (isFocused) {
      setPage(1);
      console.tron.log('setPage(0)', page, loading);
      setTotal(0);
      console.tron.log('total/page', total, page, date, isDashboard, loading);
    }
    console.tron.log('isFocused-2', page, isFocused, loading);
    if (total && page > total) return;

    console.tron.log('loadMeetups', page, date, isDashboard);
    try {
      setLoading(true);
      console.tron.log('page', page, 'date', date);
      const response = await api.get('meetups', {
        params: { page, date: format(date, 'yyyy-MM-dd hh:mm:ss-03:00') },
        // params: { page, date },
      });

      const meetups_data = response.data;
      console.tron.log('meetups_data', meetups_data);

      const totalItems = await Object.keys(response.data).length;

      setTotal(Math.ceil(totalItems / perPage));
      setMeetups(page >= 2 ? [...meetups, ...meetups_data] : meetups_data);
      // setPage(page);
      setPage(page + 1);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        console.tron.log('loadMeetups', isDashboard);
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function refreshList() {
    setPage(0);
    setTotal(0);
    setLoading(true);
    setRefreshing(true);
    loadMeetups();
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    console.tron.log('useEffect', page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isDashboard, isFocused]);

  // console.tron.log('isFocused', isFocused);

  async function handleSubscribe(id) {
    // console.tron.log('handleSubscribe', isDashboard);
    // console.tron.log('id', id);
    try {
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          loading: meetup.id === id,
        }))
      );
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Sucesso!', 'Inscrição realizada.');
      setPage(1);
      console.tron.log('handleSubscribe-1', page, date, isDashboard);
      loadMeetups();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        console.tron.log('handleSubscribe', isDashboard);
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      setIsDashboard(false);
    }
  }

  async function handleUnsubscribe(id) {
    try {
      setLoading(true);
      await api.delete(`meetups/${id}/subscriptions`);
      Alert.alert('Sucesso!', 'Inscrição cancelada.');
      setPage(1);
      console.tron.log('handleSubscribe-2', page, date, isDashboard);
      loadMeetups();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        console.tron.log('handleUnsubscribe', isDashboard);
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      setIsDashboard(true);
    }
  }

  function handleNextDay() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(addDays(date, 1));
  }

  function handlePreviusDay() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(subDays(date, 1));
  }
  return (
    <Background>
      <Container>
        <Header>
          <HeaderButton onPress={handlePreviusDay}>
            <Icon name="chevron-left" size={26} color="#fff" />
          </HeaderButton>
          <HeaderDate>{dateFormatted}</HeaderDate>
          <HeaderButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={26} color="#fff" />
          </HeaderButton>
        </Header>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.2}
          onEndReached={() => loadMeetups()}
          refreshing={refreshing}
          onRefresh={() => refreshList()}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#FFF" />
          }
          renderItem={({ item }) => (
            <Meetup
              isDashboard
              loading={loading}
              onSubmit={() =>
                Object.keys(item.Subscriptions).length === 0
                  ? handleSubscribe(item.id)
                  : handleUnsubscribe(item.id)
              }
              data={item}
            />
          )}
          ListEmptyComponent={() =>
            !loading && (
              <EmptyList>
                <Icon name="sentiment-dissatisfied" size={56} color="#FFF" />
                <EmptyText>Nenhum meetup para este dia</EmptyText>
              </EmptyList>
            )
          }
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={22} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
