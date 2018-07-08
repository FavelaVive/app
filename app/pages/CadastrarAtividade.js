import React from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';

import Content from '../components/Content';
import { Grid } from 'react-native-easy-grid';

export default class CadastrarAtividade extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      loading: false,
      descricao: "",
    };
  }

  onPressMenu = () => {
      this.setState({
          menu : !this.state.menu
      })
  }

  render() {
    return (
      <Content menu={this.state.menu} onPressMenuRight={this.onPressMenu} navigation={this.props.navigation}>
        <ScrollView>
          <Card style={{padding:0}}>
            <FormLabel>Descrição</FormLabel>
            <FormInput
                placeholder="Descreva aqui a atividade que você precisa de uma forcinha..."
                value={this.state.descricao}
                multiline
                onChangeText={descricao => this.setState({ descricao })}/>
          </Card>
          <Card style={{padding:0,marginBottom:10}}>
            <FormLabel>Forcinha</FormLabel>
            <FormInput
              placeholder="De quantas pessoas você precisa?"
                value={this.state.descricao}
                multiline
                onChangeText={descricao => this.setState({ descricao })}/>
          </Card>
          <Button
          raised
          title='Criar atividade' />
        </ScrollView>
      </Content>
    );
  }
}