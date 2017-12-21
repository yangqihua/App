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
import * as color from '../../../utils/Theme'
import Utils from '../../../utils/Utils'

const margin = 15;
const imgInterval = 5;
const userAvatarInterval = 48;
const windowWidth = Dimensions.get('window').width;


class Moments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
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
	}

	onPress(goods_id) {
	}

	renderMomentsImages(images) {
		let imagesView = [];
		images.forEach(item => {
			imagesView.push(<CachedImage source={{uri:item}} key={item}
			                             style={styles.momentsContentImage} activityIndicatorProps={{opacity:0}}/>);
		})
		return imagesView;
	}

	renderMomentsContent(moments) {
		if (!moments.content) {
			return (
				<View style={styles.momentsContentImages}>{this.renderMomentsImages(this.props.moments.img_urls)}</View>
			);
		}
		return (
			<View>
				<Text style={styles.momentsContentText}>{this.props.moments.content}</Text>
				<View style={styles.momentsContentImages}>
					{this.renderMomentsImages(this.props.moments.img_urls)}
				</View>
			</View>
		);
	}

	renderMomentsFooter(moments) {
		return (
			<View style={{flexDirection:'row',marginLeft: margin,marginRight: margin,marginTop: 4,justifyContent:'space-between'}}>
				<Text style={styles.momentsTime}>{this.props.moments.publish_time}</Text>
				<View style={{flexDirection:'row',marginLeft: 8,justifyContent:'flex-end'}}>
					<View style={{flexDirection:'row',marginRight: 10,justifyContent:'center'}}>
						<Image style={{width:18, height:18, marginRight: 5}}
						       source={require('../../../images/like.png')}/>
						<Text style={{color:color.themeGrayText}}>{this.props.moments.like_num}</Text>
					</View>
					<View style={{flexDirection:'row',marginLeft: 8,justifyContent:'center'}}>
						<Image style={{width:18, height:18, marginRight: 5}}
						       source={require('../../../images/chat.png')}/>
						<Text style={{color:color.themeGrayText}}>{this.props.moments.like_num}</Text>
					</View>
				</View>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.momentsHeader}>
					<View>
						<CachedImage source={{uri:this.props.moments.user_avatar}}
						             style={styles.avatar} activityIndicatorProps={{opacity:0}}/>
					</View>
					<View style={styles.momentsUserInfo}>
						<Text style={styles.momentsUserName}>{this.props.moments.user_name}</Text>
					</View>
				</View>
				<View style={styles.momentsContent}>
					{this.renderMomentsContent(this.props.moments)}
					{this.renderMomentsFooter(this.props.moments)}
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderBottomWidth: 0.5,
		borderColor: '#EEEEEE',
	},
	momentsHeader: {
		flexDirection: 'row',
		marginTop: margin,
		marginLeft: margin,
		marginRight: margin,
		marginBottom: 0,
		backgroundColor: '#fff',
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	momentsUserInfo: {
		marginLeft: 8,
	},
	momentsUserName: {
		marginTop: 3,
		fontSize: 15,
		color: '#00B5AD',
		lineHeight: 15,
	},
	momentsTime: {
		fontSize: 12,
		color: '#7B7C84',
		lineHeight: 18,
	},


	momentsContent: {
		marginLeft: userAvatarInterval,
		marginTop: -17,
		flex: 1,
	},
	momentsContentText: {
		marginLeft: margin,
		marginRight: margin,
		marginBottom: 10,
		fontSize: 14,
		color: color.themeBlack,
		lineHeight: 18,
	},
	momentsContentImages: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: margin,
	},
	momentsContentImage: {
		width: (windowWidth - margin * 2 - imgInterval * 2 - userAvatarInterval) / 3,
		height: (windowWidth - margin * 2 - imgInterval * 2 - userAvatarInterval) / 3,
		marginBottom: imgInterval,
		marginRight: imgInterval,
	},
});


export default Moments;
