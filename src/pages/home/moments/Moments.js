/**
 * Created by yangqihua on 2017/12/21.
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
import HttpUtil from '../../../utils/HTTPUtil'
import {CachedImage} from "react-native-cached-image";
import {base_public_url} from '../../../utils/Constants'

import MomentsCell from './MomentsCell'
const windowWidth = Dimensions.get('window').width;


const moments = {
	user_id: 123,
	user_name: '哥只是个传说',
	user_avatar: 'http://ozb2xxoij.bkt.clouddn.com/avatar04.png',
	publish_time: '2小时前',
	content: '这里是动态文本,这里是动态文本,这里是动态文本,昨天我听着梦想的声音里面林俊杰唱的歌，以为昨天就周五了，今天晚上听着凤凰于飞，我也以为周五了[捂脸]下意识的搜歌。',
	img_urls: ['http://ozb2xxoij.bkt.clouddn.com/avatar04.png','http://ozb2xxoij.bkt.clouddn.com/user5-128x128.jpg', 'http://ozb2xxoij.bkt.clouddn.com/user8-128x128.jpg','http://ozb2xxoij.bkt.clouddn.com/user4-128x128.jpg'],
	like_num: 123,
	comment_num: 342,
	is_like: 0
};
class Moments extends React.Component {

	static navigationOptions = {
		title: "动态",
	}

	constructor(props) {
		super(props);
		this.state = {
			moments: [],
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
		// HttpUtil.get(params)
		this.setState({
			moments: [
				{
					user_id:123,
					user_name: '杨启华',
					user_avatar: 'http://ozb2xxoij.bkt.clouddn.com/avatar04.png',
					publish_time: '2小时前',
					content: '这里是动态文本',
					img_urls: ['http://ozb2xxoij.bkt.clouddn.com/avatar04.png','http://ozb2xxoij.bkt.clouddn.com/avatar04.png'],
					like_num: 123,
					comment_num: 342,
					is_like:0
				}
			]
		});

	}

	onPress(goods_id) {
	}

	render() {

		return (
			<View style={{flex:1}}>
				<MomentsCell moments={moments}/>
			</View>
		);
	}

}

const styles = StyleSheet.create({});


export default Moments;
