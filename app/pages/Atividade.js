import React from 'react';
import { Text, Image, TouchableOpacity, ScrollView, FlatList, Share } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import Content from '../components/Content';
import Loading from '../components/Loading';
import colors from '../colors.js';

export default class Atividade extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      menu: false,
      atividade: props.navigation.state.params,
      loading: false
    };
  }

  onPressMenu = () => {
    this.setState({
        menu : !this.state.menu
    })
  }

  share = item => {
    Share.share({
      message: 'Venha colaborar com o "'+item.titulo+'" de '+item.pessoa.nome+". Acesse o Favela Vive.",
      title: 'Favela Vive'
    }, {
      dialogTitle: 'Compartilhe essa Atividade do Favela Vive'
    })
  }

  contribuir = async ()  => {
        this.state.atividade.contribuindo = true;
      let result = await post('/atividades/'+this.state.atividade.id+'/contribuir/8');
      Alert.alert(
          'Muito Obrigado',
          'Valeu, o morro'+this.state.atividade.pessoa.favela.nome+" agradece",
          [
              {text: 'Ok', onPress: () => console.log('ok')},
          ],
          { cancelable: false }
      )
  }

    renderItem = ({item}) => {
        return (
            <Grid>
                <Row style={{marginBottom:15}}>
                    <Col size={20}>
                        <Image
                            source={{uri:(item.pessoa.urlFoto==null || item.pessoa.urlFoto=="") ? "https://www.schoolchalao.com/app/webroot/img/no-user-image.png" : item.pessoa.urlFoto}}
                            style={{width:40,height:40,borderRadius:100}} />
                    </Col>
                    <Col size={70} style={{marginRight:10}}>
                        <Text style={{fontSize:14, marginTop: 15}}>{item.pessoa.nome}</Text>
                    </Col>
                    <Col size={30} style={{alignItems: 'flex-end'}}>
                        <Text style={{fontWeight:'bold', marginTop: 15}}>{item.pessoa.pontuacao} Ações</Text>
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
    return (
        <Content menu={this.state.menu} onPressMenuRight={this.onPressMenu} navigation={this.props.navigation}>
            <ScrollView>
                <Card>
                <Loading loading={this.state.loading} />
                    <Grid>
                        <Row style={{marginBottom:15}}>
                        <Col size={20}>
                            <Image
                                source={{uri:(this.state.atividade.pessoa.urlFoto==null || this.state.atividade.pessoa.urlFoto=="") ? "https://www.schoolchalao.com/app/webroot/img/no-user-image.png" : this.state.atividade.pessoa.urlFoto}}
                                style={{width:40,height:40,borderRadius:100}} />
                        </Col>
                        <Col size={80} style={{marginRight:10}}>
                            <Text style={{fontSize:14, marginTop: 4}}>{this.state.atividade.pessoa.nome}</Text>
                            <Text style={{fontSize:12}}>{this.state.atividade.pessoa.favela.nome}, {this.state.atividade.pessoa.favela.uf}</Text>
                        </Col>
                        <Col size={20} style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.share(this.state.atividade)}>
                                <MaterialIcons name="share" size={30} color={"#141413"} />
                            </TouchableOpacity>
                        </Col>
                        </Row>
                        <Row style={{marginBottom:5}}>
                        <Image 
                            source={require('../../assets/calendar.png')}
                            style={{width:12,height:12, marginRight:5}} />
                        <Text style={{marginRight:15, fontSize:11}}>{this.state.atividade.dataAtividadeFormatada}</Text>
                        <Image
                            source={require('../../assets/contrubutors.png')}
                            style={{width:15,height:15, marginRight:5}} />
                            <Text style={{fontSize:11}}>{this.state.atividade.contribuicao.length}</Text>
                        </Row>
                        <Row style={{marginBottom:10}}>
                            <Text>{this.state.atividade.descricao}</Text>
                        </Row>
                        <Row style={{marginBottom:15,marginTop:10}}>
                            <Col>
                                <Row>
                                    <Image 
                                        source={require('../../assets/brick.png')}
                                        style={{width:22,height:22, marginRight:5}} />
                                    <Text style={{fontSize:15,marginTop:2}}>Construção</Text>
                                </Row>
                            </Col>
                            <Col style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.contribuir()}>
                                    <Text style={{color:colors.blue,fontWeight:"bold"}}>Contribuir</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <FlatList
                                keyExtractor={(item, index) => item.id.toString() }
                                data={this.state.atividade.contribuicao}
                                renderItem={this.renderItem} />
                        </Row>
                    </Grid>
                </Card>
            </ScrollView>
        </Content>
        );
    }
}