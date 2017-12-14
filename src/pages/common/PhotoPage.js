/**
 * Created by yangqihua on 2017/12/15.
 */
import React from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	Dimensions,
	TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';

import PhotoSwiper from './PhotoSwiper'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PhotoPage extends React.Component {

	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			showViewer: false,
			showIndex: 0,
		}
	}

	viewerPressHandle() {
		this.props.navigation.goBack();
	}

	render() {
		return (
			<View style={{flex:1}}>
				<PhotoSwiper
					imgList={this.props.navigation.state.params.imgList}
					showIndex={this.props.navigation.state.params.showIndex}
					viewerPressHandle={this.viewerPressHandle.bind(this)}
				/>
			</View>
		)
	}
}

export default PhotoPage
