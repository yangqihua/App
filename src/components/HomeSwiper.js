/**
 * Created by yangqihua on 2017/12/11.
 */
'use strict';

import React from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	Dimensions,
	TouchableOpacity,TouchableWithoutFeedback
} from 'react-native';

import Swiper from 'react-native-swiper';

const {windowWidth} = Dimensions.get('window');

class HomeSwiper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgList: [
				'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
				'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
				'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
				'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
			],
		};
	}


	componentDidMount() {

	}

	onPress() {
	}

	render() {

		return (
			<Swiper style={styles.wrapper}
			        height={180}
			        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
			        dot={<View style={{backgroundColor: 'rgba(255,255,255,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
			        activeDot={<View style={{backgroundColor: 'rgba(255,255,255,.8)', width: 7, height: 7, borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3}} />}
			        paginationStyle={{
			          bottom: 5, justifyContent: 'center', alignItems: 'center'
			        }}
			        loop
			>
				<TouchableWithoutFeedback style={styles.slide} onPress={this.onPress}>
					<Image resizeMode='cover' style={styles.image} source={{uri: this.state.imgList[0]}}/>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback style={styles.slide}>
					<Image resizeMode='cover' style={styles.image} source={{uri: this.state.imgList[1]}}/>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback style={styles.slide}>
					<Image resizeMode='cover' style={styles.image} source={{uri: this.state.imgList[2]}}/>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback style={styles.slide}>
					<Image resizeMode='cover' style={styles.image} source={{uri: this.state.imgList[3]}}/>
				</TouchableWithoutFeedback>

			</Swiper>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		width: windowWidth,
		height: windowWidth*3/5,
	},
	image: {
		width: windowWidth,
		height: windowWidth*3/5,
		flex: 1
	},
	wrapper: {},

	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	title: {
		width: windowWidth,
		marginLeft: -10,
		marginTop: -13,
		paddingLeft: 10,
		backgroundColor: 'rgba(0,0,0,0.2)',
		opacity: 0.8,
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	},

});


export default HomeSwiper;
