import React from 'react';
import { Text,ScrollView, Image, ImageBackground, FlatList, View } from 'react-native';

import Content from '../components/Content';
import { Card } from 'react-native-elements';
import colors from '../colors';
import Loading from '../components/Loading';
import { getApi } from '../services.js';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Perfil extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menu: false,
      item: props.navigation.state.params,
      loading: false,
      pessoa: {}
    };
  }

  async componentDidMount(){
    this.setState({
      loading: true
    });

    let data = await getApi("/pessoas/8");
    let contribuicoes = await getApi("/pessoas/8/contribuicoes");
    
    this.setState({
        loading: false,
        pessoa: data.pessoa,
        contribuicoes: contribuicoes.contribuicoes
    });
  }

  onPressMenu = () => {
    this.setState({
      menu : !this.state.menu
    })
  }

  renderItem = ({item}) => {
    return (
      <View style={{flex:1}}>
        <Card>
          <Grid>
            <Row style={{marginBottom:15}}>
              <Col size={20}>
                <Image
                    source={{uri:(item.pessoa.urlFoto==null || item.pessoa.urlFoto=="") ? "https://www.schoolchalao.com/app/webroot/img/no-user-image.png" : item.pessoa.urlFoto}}
                    style={{width:40,height:40,borderRadius:100}} />
              </Col>
              <Col size={60} style={{marginRight:10}}>
                <Text style={{fontSize:14, marginTop: 4}}>{item.pessoa.nome}</Text>
                <Text style={{fontSize:12}}>{item.pessoa.favela.nome}, {item.pessoa.favela.uf}</Text>
              </Col>
              <Col size={40} style={{alignItems: 'flex-end'}}>
                <Text>12 ações</Text>
                <Text>realizadas</Text>
              </Col>
            </Row> 
            <Row style={{marginBottom:10}}>
              <Text>Lorem Ipsum</Text>
            </Row>    
          </Grid>
        </Card>
      </View>
    );
}

  render() {
    return (
      <Content menu={this.state.menu} onPressMenuRight={this.onPressMenu} navigation={this.props.navigation}>
        { 
          this.state.pessoa.favela!=null && (
            <ImageBackground style={{flex:1}} source={require('../../assets/bg-house.png')}>
              <Loading loading={this.state.loading} />
              <View style={{alignItems:"center",padding:10}}>
                <Image style={{borderRadius:100, width: 120, height:120,marginTop:15}} source={{uri:(this.state.pessoa.urlFoto==null || this.state.pessoa.urlFoto=="") ? "https://www.schoolchalao.com/app/webroot/img/no-user-image.png" : this.state.pessoa.urlFoto}} />
                <Text style={{color:colors.accent,fontSize:20,marginTop:10}}>{this.state.pessoa.nome}</Text>
                <Text style={{color:colors.accent,marginTop:5}}>{this.state.pessoa.favela.nome}, {this.state.pessoa.favela.uf}</Text>

                <Row style={{padding:10,height:20}}>
                  <Col style={{alignItems:"flex-start"}}><Text style={{color:colors.accent,fontWeight:"bold",fontSize:16}}>Minhas últimas atividade:</Text></Col>
                </Row>
              </View>
              
              <FlatList
                style={{flex:1}}
                keyExtractor={(item, index) => item.id.toString() }
                data={this.state.contribuicoes}
                renderItem={this.renderItem} />
            </ImageBackground>
          )
        }
      </Content>
    );
  }
}