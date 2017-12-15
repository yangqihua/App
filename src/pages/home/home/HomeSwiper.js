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
	TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import HttpUtil from '../../../utils/HTTPUtil'
import Swiper from 'react-native-swiper';
import {CachedImage} from "react-native-img-cache";
import {base_public_url} from '../../../utils/Constants'
const windowWidth = Dimensions.get('window').width;

class HomeSwiper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		let params = {
			url: 'ads/homeads',
			scb: (result) => {
				this.setState({
					data: result,
				})
			}
		};
		HttpUtil.get(params)
	}

	onPress(goods_id) {
	}

	render() {

		return (
			<Swiper height={windowWidth*3/5}
			        dot={<View style={{backgroundColor: 'rgba(200, 200, 200,.6)', width: 6, height: 6, borderRadius: 3, margin: 3}} />}
			        activeDot={<View style={{backgroundColor: 'rgba(254,65,87,.8)', width: 6, height: 6, borderRadius: 3, margin: 3}} />}
			        paginationStyle={{
			          right:10,bottom: 11, justifyContent: 'flex-end',zIndex: 2
			        }}
			        loop autoplay
			>
				{this.state.data.map(item => {
					return (
						this.state.data.length>0&&
						<TouchableWithoutFeedback key={item['goods_id']} style={styles.slide}
						                          onPress={()=>this.onPress(item['goods_id'])}>
							<View>
								<View style={styles.titleView}>
									<Text
										style={{color: 'white',  fontSize: 15,}}>{item['desc']}</Text>
								</View>
								<CachedImage resizeMode='cover' style={styles.image}
								             source={{uri: base_public_url+item['img_url']}}/>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</Swiper>
		);
	}

}

const styles = StyleSheet.create({
	image: {
		width: windowWidth,
		height: windowWidth * 3 / 5,
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	titleView: {
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		width: windowWidth,
		height: 36,
		paddingLeft: 10,
		backgroundColor: 'rgba(0,0,0,.2)',
		zIndex: 1,
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	},

});


export default HomeSwiper;
