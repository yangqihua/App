/**
 * Created by yangqihua on 2017/12/18.
 */
import React from 'react';
import {Text, StyleSheet, ScrollView, View, PixelRatio, Dimensions, TouchableWithoutFeedback} from 'react-native';

import {CachedImage} from "react-native-cached-image";
import * as color from '../../../utils/Theme';
import {base_public_url} from '../../../utils/Constants'

const windowWidth = Dimensions.get('window').width;

const img_thumbnail = '?imageView2/1/w/' + PixelRatio.get() * (windowWidth - 26);

class TopCell extends React.Component {
	constructor(props) {
		super(props);
	}

	goDetails(goods_id) {
		this.props.navigation.navigate('GoodsDetails', {
			goods_id: goods_id,
		})
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={()=>this.goDetails(this.props.item['goods_id'])}>
				<View style={styles.container}>
					<CachedImage
						activityIndicatorProps={{opacity:0}}
						loadingIndicator={null}
						source={{uri: base_public_url+this.props.item.home_url.url+img_thumbnail}}
						style={styles.icon}/>

					<View style={styles.textView}>
						<Text style={styles.h1} numberOfLines={1}>{this.props.item.name}</Text>
						<View style={styles.bottomContainer}>
							<Text style={[styles.h1, styles.price]}>¥ {this.props.item.price}</Text>
							<Text style={[styles.h1, styles.p]}>{this.props.item.collection_num}</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 12,
		marginRight: 12,
		marginLeft: 12,
		borderWidth: 1,
		borderTopRightRadius: 3,
		borderTopLeftRadius: 3,
		borderColor: color.themeHighLine,
		backgroundColor:color.themeWhite
	},
	icon: {
		width: windowWidth - 26,
		height: (windowWidth - 26) * 3 / 5,
		borderTopRightRadius: 3,
		borderTopLeftRadius: 3,
		borderColor: color.themeHighLine,
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginRight: 4,
		marginLeft: 4,
		marginTop: 5,
	},
	textView: {
		marginTop: 15,
		marginBottom: 6,
		marginRight: 2,
		marginLeft: 2,
	},
	h1: {
		marginBottom: 4,
		marginTop: 4,
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 20,
		color: color.themeBlack,
	},
	price: {
		color: color.themeRed,
		marginRight: 40,
	},

	p: {
		fontSize: 14,
		color: color.themeGrayText,
		marginLeft: 40,
	},
});

export default TopCell;
