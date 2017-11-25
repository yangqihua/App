/**
 * Created by yangqihua on 2017/11/22.
 */

import React,{Component} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import Cell from './Cell'
import testData from './data'

import HomeTabBar from '../../components/HomeTabBar';

import * as color from '../../utils/theme';
import Utils from '../../utils/Utils';

class Home extends React.Component {

	static navigationOptions = {
		title: "趣购",
	}

	constructor(props) {
		super(props);
		const category = [{category:1,name:'精选'},{category:2,name:'实用类'},{category:3,name:'黑科技'},{category:4,name:'有意思'},{category:5,name:'萌萌哒'}];
		this.state = {category:category,activeCategory:1};
	}

	render() {
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
				{this.state.category.map(cate=>{
					return <TabContent key={cate.category} category={cate} tabLabel={cate.name}/>
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


class TabContent extends Component{
	static defaultProps = {
		category:{category:1,name:'精选'},
	}

	constructor(props) {
		super(props);
		this.state = {
			data:[],    // 为了便于list渲染，每个小数组包含两条数据，一行有两个商品
			pull:{page:1,limit:10,refreshState:RefreshState.Idle}
		};
	}

	render() {
		return (
			<View>
				<RefreshListView
					data={this.state.data}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderCell}
					refreshState={this.state.pull.refreshState}
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
		this.setState({pull:{refreshState: RefreshState.HeaderRefreshing}})

		// 模拟网络请求
		setTimeout(() => {
			// 模拟网络加载失败的情况
			if (Math.random() < 0.002) {
				this.setState({pull:{refreshState: RefreshState.Failure}})
				return
			}

			//获取测试数据
			let dataList = this.getTestList(true)

			this.setState({
				data: dataList,
				pull:{refreshState: RefreshState.Idle},
			})
		}, 1000)
	}

	onFooterRefresh = () => {
		this.setState({pull:{refreshState: RefreshState.FooterRefreshing}})

		// 模拟网络请求
		setTimeout(() => {
			// 模拟网络加载失败的情况
			if (Math.random() < 0.002) {
				this.setState({pull:{refreshState: RefreshState.Failure}})
				return
			}

			//获取测试数据
			let dataList = this.getTestList(false)

			this.setState({
				data: dataList,
				pull:{refreshState: dataList.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle},
			})
		}, 1000)
	}

	// 获取测试数据
	getTestList(isReload: boolean): Array<Object> {
		let newList = testData.map((data) => {
			return {
				imageUrl: data.squareimgurl,
				title: data.mname,
				subtitle: `[${data.range}]${data.title}`,
				price: data.price,
			}
		})
		let subArr = Utils.splitArr(newList,2);
		return isReload ? subArr : [...this.state.data, ...subArr]
	}

	keyExtractor = (item: any, index: number) => {
		return index
	}

	renderCell = (info) => {
		// console.log('info',info)
		return <Cell items={info.item} />
	}


}





















