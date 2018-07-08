import React from 'react';
import { Text, ScrollView, Picker, AsyncStorage } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import Content from '../components/Content';
import { post } from '../services.js';
import { Grid } from 'react-native-easy-grid';

export default class CadastrarAtividade extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      loading: false,
      descricao: "",
      atividade: "",
      titulo: "",
      dataAtividade:""
    };
  }

  onPressMenu = () => {
      this.setState({
          menu : !this.state.menu
      })
  }

  submeter = async () => {
    let id = (Math.floor((Math.random() * 100) + 1));
    let result = await post('/pessoas/atividades/'+id,{
      'titulo': this.state.titulo,
      'descricao': this.state.descricao,
      'dataAtividade': this.state.dataAtividade,
      'atividadeTipo': 'TAREFA',
      'atividadeCategoria':this.state.atividade
    });
    this.props.navigation.navigate('Mural');
  }

  render() {
    return (
      <Content menu={this.state.menu} onPressMenuRight={this.onPressMenu} navigation={this.props.navigation}>
        <ScrollView>
          <Card containerStyle={{padding:0}}>
            <FormLabel>Categoria da Atividade</FormLabel>
            <Picker
              selectedValue={this.state.atividade}
              style={{ height: 50, width: '100%', marginRight: 5, marginLeft:5 }}
              onValueChange={(itemValue, itemIndex) => this.setState({atividade: itemValue})}>
              <Picker.Item label="Outros" value="OUTRO" />
              <Picker.Item label="Pintura" value="PINTURA" />
              <Picker.Item label="Construção" value="CONSTRUCAO" />
              <Picker.Item label="Esportes" value="ESPORTES" />
              <Picker.Item label="Eletricista" value="ELETRICISTA" />
            </Picker>
          </Card>
          <Card containerStyle={{padding:0,marginBottom:20}}>
            <FormLabel>Título</FormLabel>
            <FormInput
              placeholder="Titulo"
                value={this.state.titulo}
                multiline
                onChangeText={titulo => this.setState({ titulo })}/>
          </Card>
          <Card containerStyle={{padding:0,marginBottom:20}}>
            <FormLabel>Descrição</FormLabel>
            <FormInput
                placeholder="Descreva aqui a atividade que você precisa de uma forcinha..."
                value={this.state.descricao}
                multiline
                onChangeText={descricao => this.setState({ descricao })}/>
          </Card>
          <Card containerStyle={{padding:0,marginBottom:20}}>
          <DatePicker
              style={{width: 200}}
              date={this.state.dataAtividade}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {this.setState({dataAtividade: date})}}
            />
          </Card>
          <Button
            onPress={() => this.submeter()}
            title='Criar atividade' />
        </ScrollView>
      </Content>
    );
  }
}