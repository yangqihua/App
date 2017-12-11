/**
 * Created by yangqihua on 2017/12/11.
 */
import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native'

export const RefreshState = {
	Idle: 0,
	HeaderRefreshing: 1,
	FooterRefreshing: 2,
	NoMoreData: 3,
	Failure: 4,
}

const DEBUG = false
const log = (text: string) => {DEBUG && console.log(text)}

const footerRefreshingText = '数据加载中...'
const footerFailureText = '网络不给力，点击重新加载'
const footerNoMoreDataText = '已加载全部数据'

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
			/>
		)
	}

	renderFooter = () => {
		let footer = null

		let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
		let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
		switch (this.props.refreshState) {
			case RefreshState.Idle:
				footer = (<View style={footerContainerStyle} />)
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
					<View style={footerContainerStyle} >
						<ActivityIndicator size="small" color="#888888" />
						<Text style={[footerTextStyle, {marginLeft: 7}]}>{footerRefreshingText}</Text>
					</View>
				)
				break
			}
			case RefreshState.NoMoreData: {
				footer = (
					<View style={footerContainerStyle} >
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
		color: '#555555'
	}
})

export default RefreshListView