/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent} from 'react'
import {
	View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions,
	PixelRatio,
} from 'react-native'
import * as color from '../../utils/theme';
class Cell extends PureComponent {

	renderItem(item) {
		console.log("item", item)
		return (
			<TouchableWithoutFeedback key={item.key} onPress={this.props.onPress}>

				<View style={[styles.itemContainer,item.key==0?styles.item1:styles.item2]}>
					<Image source={{uri: item.imageUrl}} style={styles.icon}/>

					<View style={styles.textView}>
						<Text style={styles.h1} numberOfLines={1}>{item.title}</Text>
						<Text style={styles.p} numberOfLines={2}>{item.subtitle}</Text>
						<View style={styles.bottomContainer}>
							<Text style={[styles.h1, styles.price]}>¥ {item.price}</Text>
							<Text style={[styles.p]}>{item.key}</Text>
						</View>
					</View>
				</View>

			</TouchableWithoutFeedback>
		);
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

const pixelRatio = PixelRatio.get();
const windowWidth = Dimensions.get('window').width;
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
		borderRadius: 5,
	},
	icon: {
		width: windowWidth / 2 - 17,
		height: windowWidth / 2 - 17,
		resizeMode: 'cover',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
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
		textAlign: 'center',
		justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效
	},
	price: {
		color: color.themeRed
	},

	p: {
		fontSize: 12,
		color: color.themeGrayText,
	},
});

export default Cell
