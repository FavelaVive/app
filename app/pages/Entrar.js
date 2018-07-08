import React from 'react';
import { AsyncStorage, ImageBackground, StatusBar, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import { getApi } from '../services.js';
import Loading from '../components/Loading';
import colors from '../colors';

export default class Entrar extends React.Component {
  static navigationOptions = {
    header: null
  };
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  entrarFacebook = async () => {
    this.setState({
      loading: true
    });
    let data = await getApi("/pessoas/0");

    AsyncStorage.setItem('@Tokens:urlFoto', data.pessoa.foto);
    AsyncStorage.setItem('@Tokens:email', data.pessoa.email);
    AsyncStorage.setItem('@Tokens:nome', data.pessoa.nome);

    this.setState({
      loading: false
    });

    this.props.navigation.navigate('Mural');
  }

  render() {
    return (
        <ImageBackground style={{flex: 1}} source={require('../../assets/bg.png')}>
          <Image source={require('../../assets/logo.png')} style={{width:140,height:90,marginTop:25,marginLeft:25, resizeMode:"contain"}} />
          <StatusBar backgroundColor={colors.accent} barStyle="dark-content"/>
          <Loading loading={this.state.loading} />
          <SocialIcon
            title='Entrar com Facebook'
            button
            type='facebook'
            style={{marginTop:250}}
            onPress={this.entrarFacebook}

          />
          <SocialIcon
            title='Entrar com Google+'
            button
            type='google-plus-official'
            onPress={this.entrarGoogle}
          />
        </ImageBackground>
    );
  }
}