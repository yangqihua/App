'use strict';
import React, {
	Component
} from 'react';

import {
	AlertIOS,
	AppRegistry,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View, Dimensions,ScrollView
} from 'react-native';
import Player from '../components/Player';

import VideoPlayer from '../components/VideoPlayer';
const windowWidth = Dimensions.get('window').width;
class VideoPlayerTest extends Component {

	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView style={{flex:1}}>
				{/*<View style={{width:windowWidth,height:300}}>*/}
					{/*<VideoPlayer*/}
						{/*source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}*/}

					{/*/>*/}
				{/*</View>*/}
				<View style={{marginBottom:20}}>
					<Text style={{ fontSize: 22, marginTop: 22 }}>React Native Video Player</Text>
					<Player
						endWithThumbnail
						thumbnail={{ uri: 'http://ozg6xzz9f.bkt.clouddn.com/detail_pics/75/72cb84f07bcc77779c8561cf19caf46c.jpg' }}
						video={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
						videoWidth={300}
						videoHeight={300}
					/>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({});

export default VideoPlayerTest;