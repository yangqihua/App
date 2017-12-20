/**
 * Created by yangqihua on 2017/12/20.
 */
import React, {Component} from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	Image
} from "react-native";
import Popover from '../../../components/popover/Popover'
import Toast, {DURATION} from 'react-native-easy-toast';

export default class DropDown extends Component {

	static defaultProps = {
		placement: 'bottom',
		list: ['综合', '每周']
	}

	constructor(props) {
		super(props);
		this.state = {
			//下拉列表是否可见
			isVisible: false,
			//下拉列表大小范围
			spinnerRect: {},
		}
	}

	//显示下拉列表
	showSpinner() {
		this.refs.spinner.measure((x, y, width, height, left, top) => {
			console.log("ox, oy, width, height, left, top:",x, y, width, height, left, top)
			this.setState({
				isVisible: true,
				spinnerRect: {x: 0, y: 48, width: 60, height: 10}
			});
		});
	}

	//隐藏下拉列表
	closeSpinner() {
		this.setState({
			isVisible: false
		});
	}

	//下拉列表每一行点击事件
	onItemClick(spinnerItem) {
		this.closeSpinner();
		this.toast.show(spinnerItem, DURATION.LENGTH_SHORT);
	}

	//TouchableOpacity用于封装视图，使其可以正确响应触摸操作
	render() {
		return (
			<View style={{flex:1,alignItems:'center'}}>
				<TouchableOpacity
					ref='spinner'
					underlayColor='transparent'
					onPress={()=>this.showSpinner()}>
					<Text style={{padding:20}}>
						综合
					</Text>
				</TouchableOpacity>
				<Popover
					//设置可见性
					isVisible={this.state.isVisible}
					//设置下拉位置
					fromRect={this.state.spinnerRect}
					placement={this.props.placement}
					//点击下拉框外范围关闭下拉框
					onClose={()=>this.closeSpinner()}
					//设置内容样式
					contentStyle={{opacity:0.9,backgroundColor:'#000'}}
				>
					<View style={{alignItems: 'center'}}>
						{
							this.props.list.map((result, i, arr) => {
								return (
									<TouchableHighlight key={i} onPress={()=>this.onItemClick(arr[i])}
									                    underlayColor='transparent'>
										<Text
											style={{fontSize: 18,color:'#fff', padding: 8, fontWeight: '400'}}>
											{arr[i]}
										</Text>
									</TouchableHighlight>
								)
							})
						}
					</View>
				</Popover>
				<Toast ref={toast=>{
                       this.toast=toast
                    }}/>
			</View>
		)
	}
}