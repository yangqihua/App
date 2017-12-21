/**
 * Created by yangqihua on 2017/12/20.
 */
import React, {Component} from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Text,Dimensions,PixelRatio,
	Image
} from "react-native";
const windowWidth = Dimensions.get('window').width;

export default class HeaderView extends Component {

	static defaultProps = {
		onSelected: () => {},
		selectedIndex:1,
		list: [{key:1,title:'综合榜单'}, {key:2,title:'本周榜单'}]
	}

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.list.map((item, index) => (
					<TouchableOpacity
						style={[{ backgroundColor: this.props.selectedIndex == item.key ? '#FE566D' : 'white' }, styles.item]}
						key={item.key}
						onPress={() => this.props.onSelected(item.key)}>
						<Text
							style={{ color: this.props.selectedIndex == item.key ? 'white' : '#555555' }}>
							{item.title}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent:'center',
		marginTop:12,
	},
	item: {
		width: windowWidth / 4 - 10,
		margin: 8,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		borderWidth: 1 / PixelRatio.get(),
		borderColor: '#e0e0e0',
	},
});
