/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';

import { AppRegistry, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './app/styles.js';
import colors from './app/colors.js';
import { APP_NAME } from './app/constants.js';

import Entrar from './app/pages/Entrar';
import Mural from './app/pages/Mural';
import Atividade from './app/pages/Atividade';
import CadastrarAtividade from './app/pages/CadastrarAtividade';
import Perfil from './app/pages/Perfil';
import Contribuicoes from './app/pages/Contribuicoes';

import Icon from 'react-native-vector-icons/dist/Ionicons';

const Stack = StackNavigator(
  {
    Entrar: { screen: Entrar },
    CadastrarAtividade: { screen: CadastrarAtividade },
    Mural: { screen: Mural },
    Atividade: { screen: Atividade },
    Perfil: { screen: Perfil },
    Contribuicoes: { screen: Contribuicoes },
    Main: {
      screen: Mural,
      navigationOptions: {
        title: APP_NAME
      }
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      navigationOptions: {
        headerVisible: false,
      }
    }
  }
);

export default Stack;

AppRegistry.registerComponent('FavelaVive', () => Stack);
