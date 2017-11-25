/**
 * Created by yangqihua on 2017/11/22.
 */

import React from 'react';
import {Text,StyleSheet, ScrollView} from 'react-native';

class Top extends React.Component {
	static navigationOptions = {
		title: "榜单",
	}
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text title={'Push Screen'}/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Top;
