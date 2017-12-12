/**
 * Created by yangqihua on 2017/12/11.
 */

import React, {Component} from 'react';
import {
	View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform,Dimensions
} from 'react-native';

import * as themeColor from '../../utils/Theme';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

let backImgWhite = require('../../images/back_white.png')
let backImgGray = require('../../images/back_gray.png')

const windowWidth = Dimensions.get('window').width;
const parallax_header_height = windowWidth;
const sticky_header_height = Platform.OS == 'ios' ? 68 : 48;

const backgroudUrl = 'http://ozg6xzz9f.bkt.clouddn.com/detail_pics/12/0cb3686687c35a8127cf6749fe35b136.jpg';
class Details extends Component {
	static navigationOptions = {
		title: '开发中',
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			backImg:backImgGray
		};
	}

	goBack() {
		this.props.navigation.goBack();
	}

	onChangeHeaderVisibility(visible){
		if(visible){
			this.setState({backImg:backImgGray})
		}else{
			this.setState({backImg:backImgWhite})
		}
	}

	renderBackground() {
		return (
			<View key="background">
				<Image resizeMode='cover' style={{width:windowWidth,height:parallax_header_height}} source={{uri: backgroudUrl}}/>
			</View>
		)
	}

	renderStickyHeader() {
		return (
			<View key="sticky-header" style={styles.stickySection}>
				<Text style={{color: themeColor.themeWhite,fontSize: 16,}}>商品详情</Text>
			</View>
		)
	}

	renderFixedHeader() {
		return (
			<View key="fixed-header" style={styles.fixedSection}>
				<View>
					<TouchableOpacity style={{paddingTop:16,paddingBottom:16,paddingLeft:12,}} onPress={()=>this.goBack()}>
						<Image style={{width: 16,height: 16}} source={this.state.backImg}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
				<ParallaxScrollView
					backgroundColor={themeColor.themeRed}
					headerBackgroundColor="#333"
					stickyHeaderHeight={ sticky_header_height }
					parallaxHeaderHeight={ parallax_header_height }
					backgroundSpeed={10}
					style={{flex:1}}

					onChangeHeaderVisibility={(visible)=> this.onChangeHeaderVisibility(visible)}

					renderBackground={() => this.renderBackground()}

					renderStickyHeader={() => this.renderStickyHeader()}

					renderFixedHeader={() => this.renderFixedHeader()}>

					<ScrollView>
						{[12, 32, 123, 2, 4, 32, 432, 213, 123, 123, 2, 31, 23, 12, 3123, 123, 12, 5, 5, 345, 34, 5, 34, 53, 52, 35, 2352, 35, 23, 5, 23, 123, 12, 31, 23, 1].map((item, index) => {
							return (
								<Text style={{height:30}} key={index}>hello list {item}</Text>
							)
						})}

					</ScrollView>
				</ParallaxScrollView>

			</View>
		);
	}
}

const styles = StyleSheet.create({

	stickySection: {
		height: sticky_header_height,
		paddingTop: Platform.OS == 'ios' ? 20 : 0,
		width: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 13,
	},
	fixedSection: {
		flex: 1,
		position: 'absolute',
		height: sticky_header_height,
		paddingTop: Platform.OS == 'ios' ? 20 : 0,
		justifyContent: 'center'
	},
});

export default Details;