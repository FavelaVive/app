import React from 'react';
import { Text, FlatList, Image, TouchableOpacity, Share, Alert, View, Modal } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import { getApi, post } from '../services.js';

import Content from '../components/Content';
import Loading from '../components/Loading';
import colors from '../colors.js';

export default class Mural extends React.Component {
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

        let data = await getApi("/atividades/PE/Recife?pessoaId=8");
        
        this.setState({
            loading: false,
            data: data.atividades
        });
    }

    onPressMenu = () => {
        this.setState({
            menu : !this.state.menu
        })
    }

    openAtividade = item => {
        this.props.navigation.navigate('Atividade', item);
    }

    share = item => {
        Share.share({
            message: 'Venha colaborar com o "'+item.titulo+'" de '+item.pessoa.nome+". Acesse o Favela Vive.",
            title: 'Favela Vive'
        }, {
            dialogTitle: 'Compartilhe essa Atividade do Favela Vive'
        })
    }

    contribuir = async (item)  => {
        item.contribuindo = true;
        let result = await post('/atividades/'+item.id+'/contribuir/8');
        Alert.alert(
            'Muito Obrigado',
            'Valeu, o morro'+item.pessoa.favela.nome+" agradece",
            [
                {text: 'Ok', onPress: () => console.log('ok')},
            ],
            { cancelable: false }
        )
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
                        <Col size={80} style={{marginRight:10}}>
                            <Text style={{fontSize:14, marginTop: 4}}>{item.pessoa.nome}</Text>
                            <Text style={{fontSize:12}}>{item.pessoa.favela.nome}, {item.pessoa.favela.uf}</Text>
                        </Col>
                        <Col size={20} style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.share(item)}>
                                <MaterialIcons name="share" size={30} color={"#141413"} />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row style={{marginBottom:5}}>
                        <Image 
                            source={require('../../assets/calendar.png')}
                            style={{width:12,height:12, marginRight:5}} />
                        <Text style={{marginRight:15, fontSize:11}}>{item.dataAtividadeFormatada}</Text>
                        <Image
                            source={require('../../assets/contrubutors.png')}
                            style={{width:15,height:15, marginRight:5}} />
                        <Text style={{fontSize:11}}>{item.contribuicao.length}</Text>
                    </Row>
                    <Row style={{marginBottom:10}}>
                        <Text>L{item.descricao}</Text>
                    </Row>
                    <Row>
                        <Col>
                            {
                                !item.contribuindo && (
                                    <TouchableOpacity onPress={() => this.contribuir(item)}>
                                        <Text style={{color:colors.blue,fontWeight:"bold"}}>Contribuir</Text>
                                    </TouchableOpacity>
                                )
                            }
                            {
                                item.contribuindo && (
                                    <Text style={{color:colors.blue,fontWeight:"bold",opacity:0.8}}>Contribuindo</Text>
                                )
                            }
                        </Col>
                        <Col style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.openAtividade(item)}>
                                <Text>Ver mais...</Text>
                            </TouchableOpacity>
                        </Col>
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