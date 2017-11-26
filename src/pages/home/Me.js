/**
 * Created by yangqihua on 2017/11/22.
 */

import React, {Component} from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Alert,
} from 'react-native';

import MyHeader from '../my/MyHeader';
import WHCLine from '../../components/WHCLine';
import MyItem from '../my/MyItem';

class Me extends Component {

	static navigationOptions = {
		title: '我的',
	}
	constructor(props) {
		super(props);
		this.state = {};
	}

	_clickItem = (e) => {
		const {navigate} = this.props.navigation;
		navigate('Blank');
	}

	render() {
		return (
			<ScrollView style = {styles.scrollView}>
				<MyHeader style = {styles.header}
				          click = {this._clickItem}/>
				<WHCLine/>
				<View style = {styles.section1}>
					<MyItem img = {require('../../images/my_love_icon.png')}
					        title = {'我的收藏'}
					        value = {'48个'}
					        click = {this._clickItem}
					/>
					<MyItem img = {require('../../images/my_collect_icon.png')}
					        title = {'我要推荐'}
					        value = {''}
					        click = {this._clickItem}
					/>
				</View>

				<View style = {styles.section2}>
					<MyItem img = {require('../../images/my_suggest_icon.png')}
					        title = {'关于我们'}
					        click = {this._clickItem}
					/>
					<MyItem img = {require('../../images/my_set_icon.png')}
					        title = {'设置'}
					        click = {this._clickItem}
					/>
				</View>
			</ScrollView>
		)
	}
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: '#F4F6F9',
		paddingTop: 15,
		paddingBottom: 15,
	},
	header: {
		flex: 1,
	},
	section1: {
		marginTop: 15,
		backgroundColor: 'white',
	},
	section2: {
		marginTop: 15,
		backgroundColor: 'white',
	},
});

export default Me;

