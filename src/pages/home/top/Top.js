/**
 * Created by yangqihua on 2017/11/22.
 */

import React from 'react';
import {Text, StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import TopCell from './TopCell';
import DropDown from './DropDown';
import Toast, {DURATION} from 'react-native-easy-toast'

import RefreshListView, {RefreshState} from '../../../components/flatlist/RefreshListView'
import * as color from '../../../utils/Theme';
import ActionSheet from 'react-native-actionsheet';
import Utils from '../../../utils/Utils';
import HttpUtil from '../../../utils/HTTPUtil'

const windowWidth = Dimensions.get('window').width;

class Top extends React.Component {

	static navigationOptions = ({navigation, screenProps}) => ({
		title: "榜单",
		headerLeft: (<View/>),
		headerRight: (
			<TouchableOpacity style={{height:'100%',paddingLeft:20,paddingRight:12 ,justifyContent:'center'}}
			                  onPress={navigation.state.params?navigation.state.params.showActionSheet:null}>
				<Image style={{width:18,height:18}} source={require('../../../images/my_switch_icon.png')}/>
			</TouchableOpacity>
		)
	})

	constructor(props) {
		super(props);
		this.queryParams = {page: 1, limit: 10};
		this.state = {
			category: 1,  // 1 为综合榜单，2 为按周排行
			data: [],
			refreshState: RefreshState.Idle
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			showActionSheet: this.showActionSheet.bind(this)
		})
		this.onFooterRefresh()
	}

	showActionSheet() {
		this.ActionSheet.show()
	}

	handlePress(index) {
		if (index == 0) {
			return;
		}
		this.setState({
			category: index,
		})
		this._flatList.scrollToIndex({animated: true, index: 0, viewPosition: 0});
		setInterval(() => {
			this.onHeaderRefresh();

		}, 2000)
		// this.refs.toast.show('this.cellHeight='+this.cellHeight);
		// this.refs.toast.show('index='+index);
	}

	onHeaderRefresh = () => {
		this.setState({refreshState: RefreshState.HeaderRefreshing})
		this.queryParams.page = 1;
		let params = {
			url: 'top/toplist',
			params: {page: this.queryParams.page, limit: this.queryParams.limit, category: this.state.category},
			scb: (result) => {
				this.setState({
					data: result,
					refreshState: RefreshState.Idle,
				});
				this.queryParams.page++;
			},
			ecb: (err) => {
				this.setState({refreshState: RefreshState.Failure})
			}
		}
		HttpUtil.get(params)
	}

	onFooterRefresh = () => {
		this.setState({refreshState: RefreshState.FooterRefreshing})
		let params = {
			url: 'top/toplist',
			params: {page: this.queryParams.page, limit: this.queryParams.limit, category: this.state.category},
			scb: (result) => {
				let refreshStatus = result.length < 10 ? RefreshState.NoMoreData : RefreshState.Idle;
				let data = [...this.state.data, ...result]
				this.setState({
					data: data,
					refreshState: refreshStatus,
				})
				this.queryParams.page++;
			},
			ecb: (err) => {
				this.setState({refreshState: RefreshState.Failure})
			}
		}
		HttpUtil.get(params)
	}

	keyExtractor = (item: any, index: number) => {
		return item.goods_id
	}

	renderCell = (info) => {
		return <TopCell item={info.item} navigation={this.props.navigation}/>
	}

	getItemLayout(data, index) {
		let oneHeight = 292
		return {
			length: oneHeight,
			offset: oneHeight * index + 12,
			index
		}
	}


	render() {
		return (
			<View style={styles.container}>
				<RefreshListView
					listRef={(flatList)=>this._flatList = flatList}
					data={this.state.data}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderCell.bind(this)}
					refreshState={this.state.refreshState}
					onHeaderRefresh={this.onHeaderRefresh}
					onFooterRefresh={this.onFooterRefresh}
				/>
				<ActionSheet
					ref={o => this.ActionSheet = o}
					title={'请选择'}
					options={[ '取消','综合榜单', '每周榜单']}
					cancelButtonIndex={0}
					destructiveButtonIndex={this.state.category}
					onPress={this.handlePress.bind(this)}
				/>
				<Toast ref="toast" position='top'/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.themeGrayBackground
	},
});

export default Top;
