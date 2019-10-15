import React from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import {
  Container,
  Card,
  Banner,
  Details,
  Title,
  TextContainer,
  Txt,
  SubmitButton,
} from './styles';

export default function Meetup({ data, loading, isDashboard, onSubmit }) {
  if (Object.keys(data.Subscriptions).length === 0) {
    isDashboard = true;
  } else {
    isDashboard = false;
  }

  const dateFormatted = format(parseISO(data.date), "d 'de' MMMM', às' HH'h'", {
    locale: pt,
  });

  return (
    <Background>
      <Container>
        <Card>
          <Banner
            source={{
              uri: data.banner
                ? data.banner.url
                : `https://api.adorable.io/avatar/50/${data.name}-${data.id}.png`,
            }}
          />
          <Details>
            <Title>{data.title}</Title>
            <TextContainer>
              <Icon name="event" size={14} color="#999" />
              <Txt>{dateFormatted}</Txt>
            </TextContainer>
            <TextContainer>
              <Icon name="place" size={14} color="#999" />
              <Txt>{data.location}</Txt>
            </TextContainer>
            <TextContainer>
              <Icon name="person" size={14} color="#999" />
              <Txt>Organizador: {data.User.name}</Txt>
            </TextContainer>

            <SubmitButton
              past={data.past}
              onPress={onSubmit}
              loading={loading}
              // isDashboard={isDashboard}
            >
              {isDashboard ? 'Realizar Inscrição' : 'Cancelar Inscrição'}
            </SubmitButton>
          </Details>
        </Card>
      </Container>
    </Background>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    past: PropTypes.bool,
    Subscriptions: PropTypes.isRequired,
  }).isRequired,
  isDashboard: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

Meetup.defaultProps = {
  isDashboard: false,
  loading: false,
};
