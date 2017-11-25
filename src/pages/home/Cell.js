/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */

import React, {PureComponent} from 'react'
import {
	View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,
	PixelRatio,
} from 'react-native'

class Cell extends PureComponent {

	renderItem(item) {
		console.log("item", item)
		return (
			<TouchableOpacity key={item.key} style={[styles.itemContainer,item.key==0?styles.item1:styles.item2]} onPress={this.props.onPress}>

			<Image source={{uri: item.imageUrl}} style={styles.icon}/>

			<View style={styles.rightContainer}>
				<Text style={styles.h1}>{item.title}</Text>
				<View>
				</View>
				<Text style={styles.p} numberOfLines={0}>{item.subtitle}</Text>
				<View style={{flex: 1, justifyContent: 'flex-end'}}>
					<Text style={[styles.h1, styles.price]}>{item.price}元</Text>
				</View>
			</View>

			</TouchableOpacity>
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

const color = {
	theme: '#06C1AE',
	border: '#e0e0e0',
	background: '#f3f3f3'
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
		borderColor: color.border,
		borderRadius: 5,
	},
	icon: {
		width: windowWidth / 2 - 17,
		height: windowWidth / 2 - 17,
		resizeMode: 'cover',
		borderTopRightRadius:5,
		borderTopLeftRadius:5,
		borderColor:color.border,
	},
	rightContainer: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 10,
	},
	price: {
		color: color.theme
	},
	h1: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#222222',
	},
	p: {
		fontSize: 13,
		color: '#777777',
	},
});

export default Cell
