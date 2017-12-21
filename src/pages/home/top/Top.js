/**
 * Created by yangqihua on 2017/11/22.
 */

import React from 'react';
import {Text, StyleSheet, ScrollView, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import TopCell from './TopCell';
import HeaderView from './HeaderView';

import RefreshListView, {RefreshState} from '../../../components/flatlist/RefreshListView'
import * as color from '../../../utils/Theme';
import HttpUtil from '../../../utils/HTTPUtil'

class Top extends React.Component {

	static navigationOptions = ({navigation, screenProps}) => ({
		title: "榜单",
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
		this.onFooterRefresh()
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
		return index
	}

	renderCell = (info) => {
		return <TopCell item={info.item} navigation={this.props.navigation}/>
	}

	selectCategory(index) {
		this.setState({
			category: index,
		},()=>{
			this.onHeaderRefresh();
		})

	}


	render() {
		return (
			<View style={styles.container}>
				<RefreshListView
					ListHeaderComponent={<HeaderView selectedIndex={this.state.category} onSelected={this.selectCategory.bind(this)}/>}
					data={this.state.data}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderCell.bind(this)}
					refreshState={this.state.refreshState}
					onHeaderRefresh={this.onHeaderRefresh}
					onFooterRefresh={this.onFooterRefresh}
				/>
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
