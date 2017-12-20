/**
 * Created by yangqihua on 2017/12/19.
 */

import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight, } from 'react-native'
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [ 'Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian' ]
const title = 'Which one do you like?'

export default class DropDownTest extends React.Component {

	static navigationOptions = ({navigation, screenProps}) => ({
		title: "榜单",
		headerLeft:(<View/>),
		headerRight: (
			<TouchableHighlight style={{height:'100%',paddingLeft:20,paddingRight:12 ,justifyContent:'center'}} onPress={navigation.state.params?navigation.state.params.showActionSheet:null}><Text style={{textAlign:'center'}} >切换</Text></TouchableHighlight>
		)
	})

	constructor(props) {
		super(props)
		this.state = {
			selected: ''
		}
		this.handlePress = this.handlePress.bind(this)
		this.showActionSheet = this.showActionSheet.bind(this)
	}

	componentDidMount(){

		this.props.navigation.setParams({
			title:'自定义Header',
			showActionSheet:this.showActionSheet
		})
	}

	showActionSheet() {
		this.ActionSheet.show()
	}

	handlePress(i) {
		this.setState({
			selected: i
		})
	}

	render() {
		return (
			<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
				<ActionSheet
					ref={o => this.ActionSheet = o}
					title={'请选择'}
					options={[ '取消','综合榜单', '每周榜单']}
					cancelButtonIndex={0}
					destructiveButtonIndex={1}
					onPress={this.handlePress}
				/>
			</View>
		)
	}
}

