/**
 * Created by yangqihua on 2017/11/22.
 */

import React from 'react';
import {Text,StyleSheet, ScrollView} from 'react-native';

class Recommend extends React.Component {
	static navigationOptions = {
		title: "每周推荐",
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

export default Recommend;
