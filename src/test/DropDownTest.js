/**
 * Created by yangqihua on 2017/12/19.
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
import Popover from '../components/Popover'
import Toast, {DURATION} from 'react-native-easy-toast';
var spinnerTextArray = ['综合', '每周']
//Popover开源地址：https://www.npmjs.com/package/react-native-popover
export default class DropDownTest extends Component {

	// static navigationOptions = {
	// 	header: null,
	// }


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
		this.refs.spinner.measure((ox, oy, width, height, px, py) => {
			console.log("ox, oy, width, height, px, py:",ox, oy, width, height, px, py)
			this.setState({
				isVisible: true,
				spinnerRect: {x: px, y: py-68, width: width, height: height}
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
	//ref使用参考http://blog.csdn.net/jiangbo_phd/article/details/51758148
	render() {
		return <View style={{flex:1,alignItems:'center'}}>
			<TouchableOpacity
				ref='spinner'
				style={{flexDirection:'row',alignItems:'center',marginTop:200}}
				underlayColor='transparent'
				onPress={()=>this.showSpinner()}>
				<Text>
					点击可以弹出下拉菜单
				</Text>
				<Image source={require('../images/dropdown/dropdown_arrow.png')}/>
			</TouchableOpacity>
			<Popover
				//设置可见性
				isVisible={this.state.isVisible}
				//设置下拉位置
				fromRect={this.state.spinnerRect}
				placement="bottom"
				//点击下拉框外范围关闭下拉框
				onClose={()=>this.closeSpinner()}
				//设置内容样式
				contentStyle={{opacity:0.9,backgroundColor:'#fff'}}
				style={{backgroundColor: 'red'}}>
				<View style={{alignItems: 'center'}}>
					{spinnerTextArray.map((result, i, arr) => {
						return <TouchableHighlight key={i} onPress={()=>this.onItemClick(arr[i])}
						                           underlayColor='transparent'>
							<Text
								style={{fontSize: 18,color:'#3b333b', padding: 8, fontWeight: '400'}}>
								{arr[i]}
							</Text>
						</TouchableHighlight>
					})
					}
				</View>
			</Popover>
			<Toast ref={toast=>{
                       this.toast=toast
                    }}/>
		</View>
	}
}