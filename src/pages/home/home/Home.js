/**
 * Created by yangqihua on 2017/11/22.
 */

import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View,StatusBar} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

import GoodsCell from '../../../components/GoodsCell'
import HomeSwiper from './HomeSwiper';
import RefreshListView, {RefreshState} from '../../../components/flatlist/RefreshListView'
import * as color from '../../../utils/Theme';
import Utils from '../../../utils/Utils';
import HttpUtil from '../../../utils/HTTPUtil'

class Home extends React.Component {

	static navigationOptions = {
		title: "趣购",
	}

	constructor(props) {
		super(props);
		const category = [{category: 0, name: '精选'}, {category: 1, name: '实用类'}, {category: 2,name: '黑科技'}, {category: 3, name: '有意思'}, {category: 4, name: '萌萌哒'}];
		this.state = {category: category, activeCategory: 1};
	}

	render() {
		return (
			<ScrollableTabView
				tabBarUnderlineStyle={{backgroundColor:color.themeRed,height:2}}
				tabBarInactiveTextColor={color.themeBlack}
				tabBarActiveTextColor={color.themeRed}
				tabBarBackgroundColor={color.themeWhite}
				tabBarTextStyle={{fontSize:12}}
				ref="scrollableTabView"
				renderTabBar={() => <DefaultTabBar style={{height: 38,borderWidth:1,borderColor:color.themeHighLine,paddingTop:8}}/>}
			>
				{this.state.category.map(cate => {
					return <TabContent navigation={this.props.navigation} key={cate.category} category={cate.category} tabLabel={cate.name}/>
				})}
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
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


class TabContent extends Component {
	static defaultProps = {
		category: 0,
		navigation:null,
	}

	constructor(props) {
		super(props);
		this.queryParams = {page: 1, limit: 10};
		this.state = {
			data: [],    // 为了便于list渲染，每个小数组包含两条数据，一行有两个商品
			refreshState: RefreshState.Idle
		};
	}

	render() {
		return (
			<View>
				<StatusBar backgroundColor={'black'}/>
				<RefreshListView
					ListHeaderComponent={this.props.category==0?<HomeSwiper/>:null}
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

	componentDidMount() {
		this.onFooterRefresh()
	}

	onHeaderRefresh = () => {
		this.setState({refreshState: RefreshState.HeaderRefreshing})
		this.queryParams.page = 1;
		let params = {
			url: 'goods/homelist',
			params: {page: this.queryParams.page, limit: this.queryParams.limit, category: this.props.category},
			scb: (result) => {
				this.setState({
					data: Utils.splitArr(result, 2),
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
			url: 'goods/homelist',
			params: {page: this.queryParams.page, limit: this.queryParams.limit, category: this.props.category},
			scb: (result) => {
				let refreshStatus = result.length < 10 ? RefreshState.NoMoreData : RefreshState.Idle;
				let data = [...this.state.data, ...Utils.splitArr(result, 2)]
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
		return <GoodsCell items={info.item} navigation={this.props.navigation}/>
	}
}





















