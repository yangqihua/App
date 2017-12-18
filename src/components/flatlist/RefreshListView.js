/**
 * Created by yangqihua on 2017/12/11.
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native'

import FlatListItem from './FlatListItem';
import * as ThemeColor from '../../utils/Theme';

export const RefreshState = {
	Idle: 0,
	HeaderRefreshing: 1,
	FooterRefreshing: 2,
	NoMoreData: 3,
	Failure: 4,
}

const DEBUG = false
const log = (text: string) => {
	DEBUG && console.log(text)
}

const footerRefreshingText = '数据加载中...'
const footerFailureText = '网络不给力，点击重新加载'
const footerNoMoreDataText = '---   我也是有底线的   ---'

type Props = {
	refreshState: number,
	onHeaderRefresh: (refreshState: number) => void,
	onFooterRefresh?: (refreshState: number) => void,
	data: Array<any>,

	footerContainerStyle?: any,
	footerTextStyle?: any,

	listRef?: any,
}

type State = {}

class RefreshListView extends PureComponent {
	props: Props
	state: State

	constructor(props) {
		super(props);
		this.state = {}
		this.rowRefs = []
		this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
	}

	componentWillReceiveProps(nextProps: Props) {
		log('[RefreshListView]  RefreshListView componentWillReceiveProps ' + nextProps.refreshState)
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		log('[RefreshListView]  RefreshListView componentDidUpdate ' + prevProps.refreshState)
	}

	onHeaderRefresh = () => {
		log('[RefreshListView]  onHeaderRefresh')

		if (this.shouldStartHeaderRefreshing()) {
			log('[RefreshListView]  onHeaderRefresh')
			this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
		}
	}

	onEndReached = (info: any) => {
		log('[RefreshListView]  onEndReached   ' + info.distanceFromEnd)

		if (this.shouldStartFooterRefreshing()) {
			log('[RefreshListView]  onFooterRefresh')
			this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
		}
	}

	shouldStartHeaderRefreshing = () => {
		log('[RefreshListView]  shouldStartHeaderRefreshing')

		if (this.props.refreshState == RefreshState.HeaderRefreshing ||
			this.props.refreshState == RefreshState.FooterRefreshing) {
			return false
		}

		return true
	}

	shouldStartFooterRefreshing = () => {
		log('[RefreshListView]  shouldStartFooterRefreshing')

		let {refreshState, data} = this.props
		if (data.length == 0) {
			return false
		}

		return (refreshState == RefreshState.Idle)
	}

	_addRowRefs(ref, data) {
		this.rowRefs[data.index] = {
			ref: ref,
			item: data.item,
			index: data.index,
		}
	}

	_updateItem(index, visibility) {
		if (!this.rowRefs[index].ref) {
			return false;
		}
		this.rowRefs[index].ref.setVisibility(visibility)
		return visibility
	}

	_renderItem(data) {
		const view = this.props.renderItem(data)
		return (
			<FlatListItem
				ref={ myItem => this._addRowRefs(myItem, data)}
				viewComponent={view}
				data={data}
			/>
		)
	}

	_getBoundaryItems(viewableItems, offset) {
		let low, high;
		let boundaryItems = []
		if (viewableItems.length > 1) {
			let list = this.props.data
			let lowItemIndex = viewableItems[0]['index']
			let highItemIndex = viewableItems[viewableItems.length - 1]['index']
			// add low Boundary
			if ((lowItemIndex - offset) > 0) {
				low = lowItemIndex - offset;
			} else {
				low = 0;
			}
			// add high Boundary
			if ((highItemIndex + offset) < this.rowRefs.length - 1) {
				high = highItemIndex + offset;
			} else {
				high = this.rowRefs.length - 1;
			}
		}
		return {low, high};
	}

	_onViewableItemsChanged(info: {
		changed: Array<{
			key: string,
			isViewable: boolean,
			item: any,
			index: ?number,
			section?: any,
		}>,
		viewableItems:Array<{
			index: ?number,
			item: any,
			key?: any,
			isViewable: boolean,
		}>
	}) {
		let {low, high} = this._getBoundaryItems(info.viewableItems, 1);
		// console.log("info.changed:",info.changed);
		// console.log("info.viewableItems:", info.viewableItems);
		// console.log("{low,high}:", {low, high});
		// console.log("this.rowRefs:",this.rowRefs);
		for (let i = 0; i < this.rowRefs.length; i++) {
			if (i < low || i > high) {
				this._updateItem(i, false);
			} else {
				this._updateItem(i, true);
			}
		}
		// info.changed.map(item =>
		// 	this._updateItem(item.index, item.isViewable)
		// )
	}


	render() {
		log('[RefreshListView]  render')

		return (
			<FlatList
				ref={this.props.listRef}
				onEndReached={this.onEndReached}
				onRefresh={this.onHeaderRefresh}
				refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
				ListFooterComponent={this.renderFooter}

				{...this.props}
				renderItem={ data => this._renderItem(data) }
				onViewableItemsChanged={this._onViewableItemsChanged}
			/>
		)
	}

	renderFooter = () => {
		let footer = null

		let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
		let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
		switch (this.props.refreshState) {
			case RefreshState.Idle:
				footer = (<View style={footerContainerStyle}/>)
				break
			case RefreshState.Failure: {
				footer = (
					<TouchableOpacity
						style={footerContainerStyle}
						onPress={() => {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
					>
						<Text style={footerTextStyle}>{footerFailureText}</Text>
					</TouchableOpacity>
				)
				break
			}
			case RefreshState.FooterRefreshing: {
				footer = (
					<View style={footerContainerStyle}>
						<ActivityIndicator size="small" color="#888888"/>
						<Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
					</View>
				)
				break
			}
			case RefreshState.NoMoreData: {
				footer = (
					<View style={footerContainerStyle}>
						<Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
					</View>
				)
				break
			}
		}

		return footer
	}
}

const styles = StyleSheet.create({
	footerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		height: 64,
	},
	footerText: {
		fontSize: 14,
		color: ThemeColor.themeGrayText
	}
})

export default RefreshListView