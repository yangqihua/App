/**
 * Created by yangqihua on 2017/11/22.
 */

import React from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import HomeTabBar from '../../components/HomeTabBar';
import * as color from '../../utils/theme';
class Home extends React.Component {

	static navigationOptions = {
		title: "趣购",
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let cateContent1 =
			<View style={styles.cateContent1}>
				<Text>News</Text>
			</View>
		return (
			<ScrollableTabView
				tabBarUnderlineStyle={{backgroundColor:color.themeWhite,height:2}}
				tabBarInactiveTextColor='mintcream'
				tabBarActiveTextColor={color.themeWhite}
				tabBarBackgroundColor={color.themeRed}
				tabBarTextStyle={{fontSize:13}}
				ref="scrollableTabView"
				renderTabBar={() => <ScrollableTabBar style={{height: 40}} tabStyle={{height: 36}}/>}
			>
				<ScrollView tabLabel="精选" style={styles.tabView}>
					{cateContent1}
				</ScrollView>
				<ScrollView tabLabel="实用类" style={styles.tabView}>
					<View style={styles.card}>
						<Text>Friends</Text>
					</View>
				</ScrollView>
				<ScrollView tabLabel="黑科技" style={styles.tabView}>
					<View style={styles.card}>
						<Text>Friends</Text>
					</View>
				</ScrollView>
				<ScrollView tabLabel="有意思" style={styles.tabView}>
					<View style={styles.card}>
						<Text>Friends</Text>
					</View>
				</ScrollView>
				<ScrollView tabLabel="萌萌哒" style={styles.tabView}>
					<View style={styles.card}>
						<Text>Friends</Text>
					</View>
				</ScrollView>
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	tabView: {
		flex: 1,
		padding: 10,
		// backgroundColor: color.themeWhite,
	},
	cateContent1:{

	},
	card: {
		borderWidth: 1,
		backgroundColor: '#fff',
		borderColor: 'rgba(0,0,0,0.1)',
		margin: 5,
		height: 150,
		padding: 15,
		shadowColor: '#ccc',
		shadowOffset: {width: 2, height: 2,},
		shadowOpacity: 0.5,
		shadowRadius: 3,
	},
});

export default Home;
