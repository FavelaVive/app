import React from 'react';
import { Text, FlatList, Image, TouchableOpacity, Share } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

import { getApi } from '../services.js';

import Content from '../components/Content';
import Loading from '../components/Loading';

export default class Contribuicoes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list : [
                {
                    "id":1
                }
            ],
            menu: false,
            loading: false,
            data: []
        }
    }

    async componentDidMount(){
        this.setState({
            loading: true
        });

        let data = await getApi("/pessoas/8/contribuicoes");
        
        this.setState({
            loading: false,
            data: data.contribuicoes
        });
    }

    onPressMenu = () => {
        if(this.state.menu) {
            this.setState({
                menu : false
            })
        } else {
            this.setState({
                menu : true
            })
        }
    }

    openAtividade = item => {
        this.props.navigation.navigate('Atividade', item);
    }

    renderItem = ({item}) => {
        return (
            <Card>
                <Grid>
                    <Row style={{marginBottom:15}}>
                        <Col size={20}>
                            <Image
                                source={{uri:(item.pessoa.urlFoto==null || item.pessoa.urlFoto=="") ? "https://www.schoolchalao.com/app/webroot/img/no-user-image.png" : item.pessoa.urlFoto}}
                                style={{width:40,height:40,borderRadius:100}} />
                        </Col>
                        <Col size={70} style={{marginRight:10}}>
                            <Text style={{fontSize:14, marginTop: 4}}>{item.pessoa.nome}</Text>
                            <Text style={{fontSize:12}}>{item.pessoa.favela.nome}, {item.pessoa.favela.uf}</Text>
                        </Col>
                        <Col size={30}>
                            <Row>
                                <Image 
                                    source={require('../../assets/calendar.png')}
                                    style={{width:12,height:12, marginRight:5}} />
                                <Text style={{marginRight:15, fontSize:10}}>{item.atividade.dataAtividadeFormatada}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Text>Colaborou com {item.atividade.descricao}</Text>
                    </Row>
                </Grid>
            </Card>
        );
    }

    render() {
        return (
            <Content menu={this.state.menu} onPressMenuRight={this.onPressMenu} navigation={this.props.navigation}>
                <Loading loading={this.state.loading} />
                <FlatList
                    removeClippedSubviews={false}
                    keyExtractor={(item, index) => item.id.toString() }
                    data={this.state.data}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.onEndScroll} />
            </Content>
        );
    }
}