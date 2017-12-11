/**
 * Created by yangqihua on 2017/12/11.
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import * as font from '../../constants/WHCFont';

class Details extends Component {
	static navigationOptions = {
		title: '开发中'
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<View style = {styles.view}>
				<Text style = {styles.text}>{'功能还在开发，敬请期待'}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: font.themeColor,
	},
});

export default Details;