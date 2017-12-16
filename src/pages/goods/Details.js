/**
 * Created by yangqihua on 2017/12/11.
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	Platform,
	Dimensions,
	TouchableHighlight,
	TouchableWithoutFeedback
} from 'react-native';
import VideoPlayer from '../../components/VideoPlayer';

import * as themeColor from '../../utils/Theme';
import Toast, {DURATION} from 'react-native-easy-toast'
import ParallaxScrollView from '../../components/ParallaxScrollView';
import HttpUtil from '../../utils/HTTPUtil'
import DetailsSwiper from './DetailsSwiper';

let backImgWhite = require('../../images/back_white.png')
let backImgGray = require('../../images/back_gray.png')

import {base_public_url} from '../../utils/Constants'

const windowWidth = Dimensions.get('window').width;
const parallax_header_height = windowWidth;
const sticky_header_height = Platform.OS == 'ios' ? 68 : 48;

const backgroudUrl = 'http://ozg6xzz9f.bkt.clouddn.com/detail_pics/12/0cb3686687c35a8127cf6749fe35b136.jpg';
class Details extends Component {
	static navigationOptions = {
		title: '开发中',
		header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			backImg: backImgGray,
			data: {img_urls: [], detail_desc_array: [], video_urls: []},
			test: [],
		};
	}

	componentDidMount() {
		let params = {
			url: 'goods/details?goods_id=' + this.props.navigation.state.params.goods_id,
			scb: (result) => {
				console.log("result:", result)
				this.setState({
					data: result,
				})
			}
		};
		HttpUtil.get(params)

		setTimeout(() => {
			this.setState({
				test: [1, 2, 3, 4]
			})
		}, 200)
	}

	goBack() {
		this.props.navigation.goBack();
	}

	onPress() {
	}

	onChangeHeaderVisibility(visible) {
		if (visible) {
			this.setState({backImg: backImgGray})
		} else {
			this.setState({backImg: backImgWhite})
		}
	}

	renderBackground() {
		return (
			<View key="background" style={{width:windowWidth,height:windowWidth}}>
				<DetailsSwiper img_urls={this.state.data.img_urls} {...this.props}/>
			</View>
		)
	}

	renderStickyHeader() {
		return (
			<View key="sticky-header" style={styles.stickySection}>
				<Text style={{color: themeColor.themeWhite,fontSize: 16,}}>商品详情</Text>
			</View>
		)
	}

	renderFixedHeader() {
		return (
			<View key="fixed-header" style={styles.fixedSection}>
				<View>
					<TouchableOpacity style={{paddingTop:16,paddingBottom:16,paddingLeft:12,}}
					                  onPress={()=>this.goBack()}>
						<Image style={{width: 16,height: 16}} source={this.state.backImg}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	loadVideoStart() {
		this.refs.toast.show('loadVideoStart');
	}

	onVideoLoad() {
		this.refs.toast.show('onVideoLoad');
	}

	onVideoProgress() {
		this.refs.toast.show('onVideoProgress');
	}

	onVideoEnd() {
		this.refs.toast.show('onVideoEnd');
	}

	videoError() {
		this.refs.toast.show('videoError');
	}


	renderVideos(video_urls) {
		return video_urls.map((item, index) => {
			return (
				<View key={index} style={{flex:1,marginBottom:100}}>
					<Text
						style={{lineHeight:28,fontSize:14,textAlign:'center',marginTop:12,marginBottom:3,color:themeColor.themeBlack}}>
						{item.desc}
					</Text>
					<VideoPlayer
						endWithThumbnail
						thumbnail={{ uri: 'http://ozg6xzz9f.bkt.clouddn.com/detail_pics/75/72cb84f07bcc77779c8561cf19caf46c.jpg' }}
						video={{uri: base_public_url+item.url}}
						videoWidth={windowWidth}
						videoHeight={260}
					/>
				</View>
			)
		})
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
				<ParallaxScrollView
					stickyHeaderBackgroundColor={themeColor.themeRed}
					stickyHeaderHeight={ sticky_header_height }
					parallaxHeaderHeight={ parallax_header_height }

					onChangeHeaderVisibility={(visible)=> this.onChangeHeaderVisibility(visible)}

					renderForeground={() => (
			          <View key="parallax-header" style={ styles.parallaxHeader }>
			            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',alignItems: 'center', position: 'absolute',left:20, bottom: 40, backgroundColor: 'rgba(0,0,0,0)',}}>
			              <Text style={{color: 'white', fontSize: 24, opacity: 0.9, marginRight: 10}}>#renderForeground</Text>
			            </View>
			          </View>
			        )}

					renderBackground={() => this.renderBackground()}

					renderStickyHeader={() => this.renderStickyHeader()}

					renderFixedHeader={() => this.renderFixedHeader()}>

					<ScrollView style={{marginTop:16}}>
						<Text
							style={{lineHeight:28,fontSize:18,textAlign:'center',color:themeColor.themeBlack}}>{this.state.data.name}</Text>
						<Text
							style={{lineHeight:28,fontSize:13,textAlign:'center',color:themeColor.themeHighGrayText}}>{this.state.data.goods_desc}</Text>
						<Text
							style={{lineHeight:28,fontSize:20,textAlign:'center',color:themeColor.themeRed,marginTop:6}}>¥ {this.state.data.price}</Text>
						<View style={{flexDirection: 'row',justifyContent:'center',marginTop:10,marginLeft:4 }}>
							<View style={{flexDirection: 'row',paddingRight:20 }}>
								<Image style={{width:14, height:14, marginRight: 5}}
								       source={require('../../images/like_empty.png')}/>
								<Text
									style={{color: themeColor.themeGray,fontSize:14,paddingBottom:5,}}>{this.state.data.collection_num}</Text>
							</View>
							<View style={{flexDirection: 'row',paddingLeft:20 }}>
								<Image style={{width:14, height:14, marginRight: 5}}
								       source={require('../../images/share.png')}/>
								<Text
									style={{color: themeColor.themeGray,fontSize:14,paddingBottom:5}}>{this.state.data.share_num}</Text>
							</View>
						</View>
						{
							this.state.data.detail_desc_array.map((item, index) => {
								return (
									<Text
										style={{fontSize:14,color:themeColor.themeHighGrayText,lineHeight:20,padding:12}}
										key={index}>{item}</Text>
								)
							})
						}

						{
							this.state.data.video_urls&&this.renderVideos(this.state.data.video_urls)
						}


					</ScrollView>
				</ParallaxScrollView>
				<Toast ref="toast"/>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	stickySection: {
		height: sticky_header_height,
		paddingTop: Platform.OS == 'ios' ? 20 : 0,
		width: windowWidth,
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: 13,
	},
	fixedSection: {
		flex: 1,
		position: 'absolute',
		height: sticky_header_height,
		paddingTop: Platform.OS == 'ios' ? 20 : 0,
		justifyContent: 'center'
	},
});

export default Details;