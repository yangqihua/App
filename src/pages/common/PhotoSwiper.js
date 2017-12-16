'use strict';

import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	Dimensions,
	TouchableWithoutFeedback,
	View,
	ScrollView,
	ActivityIndicator, PixelRatio
} from 'react-native';

import Swiper from '../../components/Swiper';
import PhotoView from 'react-native-photo-view';

import {base_public_url} from '../../utils/Constants'
const {width, height} = Dimensions.get('window');
const img_slide_thumbnail = '?imageView2/1/w/' + PixelRatio.get() * width;

class PhotoSwiper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			shouldLoad: false,
		}
	}

	viewerPressHandle() {
		this.props.viewerPressHandle();
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({shouldLoad: true});
			console.log("PhotoSwiper componentDidMount");
		}, 250);
	}

	renderPagination(index, total, context) {
		return (
			<View style={{
		      position: 'absolute',
		      justifyContent: 'center',
		      alignItems: 'center',
		      top: 25,
		      left: 0,
		      right: 0
		    }}>
				<View style={{
			        borderRadius: 7,
			        backgroundColor: 'rgba(200,200,200,.15)',
			        padding: 3,
			        paddingHorizontal: 7
		        }}>
					<Text style={{
			          color: '#fff',
			          fontSize: 14
			        }}>
						{index + 1} / {total}
					</Text>
				</View>
			</View>
		)
	};

	onLoadStart(){

	}

	onLoadEnd(){

	}

	renderPhotoView() {
		return this.props.imgList.map((item, index) => {
			return (
				<View style={styles.slide} key={item['url']}>
					{
						this.state.shouldLoad &&
						<PhotoView
							onLoadStart={this.onLoadStart.bind(this)}
							onLoadEnd={this.onLoadEnd.bind(this)}
							source={{uri: base_public_url + item['url']+img_slide_thumbnail}}
							onTap={this.viewerPressHandle.bind(this)}
							onViewTap={this.viewerPressHandle.bind(this)}
							style={styles.photo}
						/>
					}
				</View>
			)
		})
	}

	render() {
		return (
			<Swiper height={height}
			        index={this.props.showIndex}
			        style={styles.wrapper}
			        viewerPressHandle={this.viewerPressHandle.bind(this)}
			        renderPagination={this.renderPagination.bind(this)}
			>
				{this.renderPhotoView()}
			</Swiper>
		);
	}
}


let styles = StyleSheet.create({

	wrapper: {
		backgroundColor: '#000',
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	photo: {
		width, height: width,
		flex: 1,
	},
});

export default PhotoSwiper;
