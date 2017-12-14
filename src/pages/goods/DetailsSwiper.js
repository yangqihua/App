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

import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';
import {CachedImage} from "react-native-img-cache";
import {base_public_url} from '../../utils/Constants'
import PhotoSwiper from '../common/PhotoSwiper'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DetailsSwiper extends React.Component {

	constructor(props) {
		super(props);
	}

	thumbPressHandle(index) {
		this.props.navigation.navigate('PhotoPage',{
			showIndex:index,
			imgList:this.props.img_urls,
		})
	}



	render() {
		return (
			<View style={{flex:1}}>
				<Swiper index={0}
				        height={windowWidth}
				        dot={<View style={{backgroundColor: 'rgba(200, 200, 200,.6)', width: 6, height: 6, borderRadius: 3, margin: 3}} />}
				        activeDot={<View style={{backgroundColor: 'rgba(254,65,87,.8)', width: 6, height: 6, borderRadius: 3, margin: 3}} />}
				        paginationStyle={{
			          right:10,bottom: 11, justifyContent: 'center',zIndex: 2
			        }}
				        loop
				>
					{this.props.img_urls.map((item, index) => {
						return (
							<TouchableWithoutFeedback key={index} style={styles.slide}
							                          onPress={()=>this.thumbPressHandle(index)}>
								<View>
									<CachedImage resizeMode='cover' style={styles.image}
									             source={{uri: base_public_url+item['url']}}/>
								</View>
							</TouchableWithoutFeedback>
						)
					})}
				</Swiper>
			</View>

		);
	}

}

const styles = StyleSheet.create({
	image: {
		width: windowWidth,
		height: windowWidth,
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},

});


export default DetailsSwiper;
