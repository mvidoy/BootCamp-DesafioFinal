import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  Separator,
} from './styles';
import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  return (
    <Background>
      <ScrollView>
        <Container>
          <Form>
            <FormInput
              autoCorrect={false}
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              ref={emailRef}
              value={email}
              onChangeText={setEmail}
            />

            <Separator />

            <FormInput
              secureTextEntry
              placeholder="Senha atual"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              ref={oldPasswordRef}
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <FormInput
              secureTextEntry
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
            />

            <FormInput
              secureTextEntry
              placeholder="Confirmação de senha"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Salvar perfil
            </SubmitButton>

            <LogoutButton loading={loading} onPress={handleLogout}>
              Sair do meetapp
            </LogoutButton>
          </Form>
        </Container>
      </ScrollView>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={22} color={tintColor} />
  ),
};
