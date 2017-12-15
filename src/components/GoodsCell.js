/**
 * Created by yangqihua on 2017/11/25.
 */
import React, {PureComponent} from 'react'
import {
	View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions,
	PixelRatio,
} from 'react-native'
import {CachedImage} from "react-native-cached-image";
import * as color from '../utils/Theme';
import {base_public_url} from '../utils/Constants'

const windowWidth = Dimensions.get('window').width;
const img_thumbnail = '?imageView2/1/w/' + PixelRatio.get()*(windowWidth / 2 - 17);
class HomeCell extends PureComponent {

	renderItem(item) {
		return (
			<TouchableWithoutFeedback key={item.key} onPress={()=>this.goDetails(item['id'])}>
				<View style={[styles.itemContainer,item.key==0?styles.item1:styles.item2]}>
					<CachedImage source={{uri: base_public_url+item.home_url.url+img_thumbnail}} style={styles.icon}/>

					<View style={styles.textView}>
						<Text style={styles.h1} numberOfLines={1}>{item.name}</Text>
						<Text style={styles.p} numberOfLines={2}>{item.desc}</Text>
						<View style={styles.bottomContainer}>
							<Text style={[styles.h1, styles.price]}>¥ {item.price}</Text>
							<Text style={[styles.p]}>{item.collection_num}</Text>
						</View>
					</View>
				</View>

			</TouchableWithoutFeedback>
		);
	}

	goDetails(goods_id){
		this.props.navigation.navigate('GoodsDetails',{
			goods_id:goods_id,
		})
	}

	render() {

		return (
			<View style={styles.container}>
				{this.props.items.map((item, index) => {
					item['key'] = index;
					return this.renderItem(item)
				})}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	item1: {
		marginTop: 10,
		marginRight: 5,
		marginLeft: 10,
	},
	item2: {
		marginTop: 10,
		marginRight: 10,
		marginLeft: 5,
	},
	itemContainer: {
		width: windowWidth / 2 - 15,
		borderWidth: 1,
		borderColor: color.themeBorder,
		borderRadius: 3,
	},
	icon: {
		width: windowWidth / 2 - 17,
		height: windowWidth / 2 - 17,
		// resizeMode: 'cover',
		borderTopRightRadius: 3,
		borderTopLeftRadius: 3,
		borderColor: color.themeBorder,
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 4,
		marginLeft: 4,
		marginTop: 5,
	},
	textView: {
		marginTop: 10,
		marginBottom: 2,
		marginRight: 2,
		marginLeft: 2,
	},
	h1: {
		marginBottom: 4,
		fontSize: 14,
		color: color.themeBlack,
	},
	price: {
		color: color.themeRed
	},

	p: {
		fontSize: 12,
		color: color.themeGrayText,
	},
});

export default HomeCell
