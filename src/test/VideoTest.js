/**
 * Created by yangqihua on 2017/12/16.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VideoPlayer from '../components/Player';

export default class VideoTest extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<View>
				<Text style={{ fontSize: 22, marginTop: 22 }}>React Native Video Player</Text>
				<VideoPlayer
					endWithThumbnail
					thumbnail={{ uri: this.state.thumbnailUrl }}
					video={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
					videoWidth={300}
					videoHeight={300}
				/>
			</View>
		);
	}
}