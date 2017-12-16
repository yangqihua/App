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
	View,
} from 'react-native';

import VideoPlayer from '../components/VideoPlayer';

class VideoPlayerTest extends Component {

	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{width:300,height:300}}>
				<VideoPlayer
					source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
					navigator={ null}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	},
	fullScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	controls: {
		backgroundColor: "transparent",
		borderRadius: 5,
		position: 'absolute',
		bottom: 44,
		left: 4,
		right: 4,
	},
	progress: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 3,
		overflow: 'hidden',
	},
	innerProgressCompleted: {
		height: 20,
		backgroundColor: '#cccccc',
	},
	innerProgressRemaining: {
		height: 20,
		backgroundColor: '#2C2C2C',
	},
	generalControls: {
		flex: 1,
		flexDirection: 'row',
		overflow: 'hidden',
		paddingBottom: 10,
	},
	skinControl: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	rateControl: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	volumeControl: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	resizeModeControl: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	ignoreSilentSwitchControl: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	controlOption: {
		alignSelf: 'center',
		fontSize: 11,
		color: "white",
		paddingLeft: 2,
		paddingRight: 2,
		lineHeight: 12,
	},
	nativeVideoControls: {
		top: 184,
		height: 300
	}
});

export default VideoPlayerTest;