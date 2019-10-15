import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Header from '~/components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscriptions from './pages/Subscriptions';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator({
          Main: {
            screen: createBottomTabNavigator(
              {
                Dashboard,
                Subscriptions,
                Profile,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#fff',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: '#2B1A2F',
                  },
                },
              }
            ),
            navigationOptions: {
              header: <Header />,
            },
          },
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
