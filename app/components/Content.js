import React from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import styles from '../styles';
import colors from '../colors';

import Menu from './Menu';

class Content extends React.Component {
	constructor(props) {
	    super(props);
	}
	
	pressMenuRight = (text) => {
		if (this.props.onPressMenuRight) 
			this.props.onPressMenuRight();
	}

	render() {
		return (
		  	<View style={this.props.style ? styles.container : [styles.container,this.props.style]}>
			  	<Menu visible={this.props.menu} navigation={this.props.navigation} />
				<Row style={{height:50,paddingTop:15}}>
					<Col size={20}>
						<TouchableOpacity onPress={this.pressMenuRight}>
							{ 
								!this.props.menu && (
									<Ionicons name="ios-menu" size={30} style={{marginLeft:20}} color={colors.accent} />
								)			
							}
							{ 
								this.props.menu && (
									<Ionicons name="ios-close" size={40} style={{marginLeft:20}} color={colors.accent} />
								)			
							}
						</TouchableOpacity>
					</Col>
					<Col size={80} style={{alignItems:"center"}}>
						{ 
							!this.props.menu && (
								<Text style={{color:colors.accent, fontSize:20}}>Favela Vive</Text>
							)
						}
					</Col>
					<Col size={20}>
						{ 
							!this.props.menu && (
								<TouchableOpacity onPress={this.pressMenuRight}>
									<Ionicons name="ios-search" size={30} style={{marginLeft:20}} color={colors.accent} />
								</TouchableOpacity>
							)
						}
					</Col>
				</Row>
			  	<StatusBar backgroundColor={colors.accent} barStyle="dark-content"/>
			  	{this.props.children}
		  	</View>
		);
    }
};

export default Content;