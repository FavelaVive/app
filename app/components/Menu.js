import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import colors from '../colors';

export default class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.visible) {
      return (
        <View style={{ backgroundColor:'#000', position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, zIndex: 9999, alignItems: 'center',width:'100%',height:'100%' }}>
            <Grid>
                <Row>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Mural')} style={{width:'100%',alignItems:'center'}}>
                        <Image source={require('../../assets/feed.png')} style={{width:65,height:65,marginBottom:3}} />
                        <Text style={{fontSize: 18,color:colors.accent}}>Home</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CadastrarAtividade')} style={{width:'100%',alignItems:'center'}}>
                        <Image source={require('../../assets/new_activity.png')} style={{width:65,height:65,marginBottom:3}} />
                        <Text style={{fontSize: 18,color:colors.accent}}>Nova Atividade</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Contribuicoes')} style={{width:'100%',alignItems:'center'}}>
                        <Image source={require('../../assets/arm.png')} style={{width:65,height:65,marginBottom:3}} />
                        <Text style={{fontSize: 18,color:colors.accent}}>Minhas Contribuições</Text>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil')} style={{width:'100%',alignItems:'center'}}>
                        <Image source={require('../../assets/profile.png')} style={{width:65,height:65,marginBottom:3}} />
                        <Text style={{fontSize: 18,color:colors.accent}}>Perfil</Text>
                    </TouchableOpacity>
                </Row>
            </Grid>
        </View>
      );
    } else {
      return <View />;
    }
  }
}