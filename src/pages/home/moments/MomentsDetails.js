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
const windowWidth = Dimensions.get('window').width;

class Moments extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
	}

	onPress(goods_id) {
	}

	render() {

		return (
			<View></View>
		);
	}

}

const styles = StyleSheet.create({

});


export default Moments;
