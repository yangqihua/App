/**
 * Created by yangqihua on 2017/12/12.
 */
import React, {Component} from  'react';
import {
	Animated,
	Easing,
	View,
	StyleSheet,
	Text, TouchableHighlight
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'

class AnimatedPage extends Component {

	static navigationOptions = {
		title: '动画测试',
	}

	constructor(props) {
		super(props);
		this.state = {
			fadeInOpacity: new Animated.Value(0), // 初始值
			anim: [1, 2, 3].map(() => new Animated.Value(0)) // 初始化3个值
		};
	}

	componentDidMount() {
		this.renderSimperAnim();
	}

	onPress() {
		this.refs.toast.show("点击了:");
	}

	renderSimper() {
		return (
			<View>
				<Animated.View style={[styles.backgroundImage, {
				opacity: this.state.fadeInOpacity
			}]}>
					<TouchableHighlight onPress={()=>this.onPress()} underlayColor='#f0f0f0' style={{marginTop:180}}>
						<Text style={styles.text}>悄悄的，我出现了</Text>
					</TouchableHighlight>

				</Animated.View>
				<Toast ref="toast"/>
			</View>
		);
	}

	renderSimperAnim() {
		Animated.timing(this.state.fadeInOpacity, {
			toValue: 1, // 目标值
			duration: 2500, // 动画时间
			easing: Easing.linear // 缓动函数
		}).start();
	}

	renderComplexAnim() {
		Animated.sequence([
				Animated.stagger(1000, this.state.anim.map(left => {
					return Animated.timing(left, {
						toValue: 1,
					});
				}).concat(
					this.state.anim.map(left => {
						return Animated.timing(left, {
							toValue: 0,
						});
					})
				)), // 三个view滚到右边再还原，每个动作间隔200ms
				Animated.delay(400), // 延迟400ms，配合sequence使用
				Animated.timing(this.state.anim[0], {
					toValue: 1
				}),
				Animated.timing(this.state.anim[1], {
					toValue: -1
				}),
				Animated.timing(this.state.anim[2], {
					toValue: 0.5
				}),
				Animated.delay(400),
				Animated.parallel(this.state.anim.map((anim) => Animated.timing(anim, {
						toValue: 0
					}))
				) // 同时回到原位置
			]
		).start();
	}

	renderComplex() {
		return
		let views = this.state.anim.map(function (value, i) {
			return (
				<View>
					<Animated.View
						key={i}
						style={[styles.demo, styles['demo' + i], {
		                    left: value.interpolate({
		                        inputRange: [0,1],
		                        outputRange: [0,200]
		                    })
		                }]}>
						<Text style={styles.text} onPress={()=>this.pressText(i)}>我是第{i + 1}个View</Text>

					</Animated.View>
					<Text style={styles.text} onPress={()=>this.pressText(i)}>点击这里</Text>
				</View>
			);
		});
		return (
			<View style={styles.container}>
				<Text onPress={()=>this.pressText("13")}>sequence/delay/stagger/parallel演示</Text>
				{views}
			</View>
		);
	}

	render() {
		return this.renderSimper()
	}
}

let styles = StyleSheet.create({
	demo: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
	text: {
		fontSize: 30
	},
	backgroundImage: {
		position: 'absolute',
		backgroundColor: 'transparent',
		overflow: 'hidden',
		top: 0,
		width:200,
		height:400,
	},
});

export default AnimatedPage;