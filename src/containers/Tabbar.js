
import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {
	Image,PixelRatio

} from 'react-native';

import HomeBack from '../pages/homeback/Home';
import My from '../pages/my/My';


import Home from '../pages/home/home/Home';
import Moments from '../pages/home/moments/Moments';
import Top from '../pages/home/top/Top';
import Me from '../pages/home/Me';

import * as font from '../constants/WHCFont';
import * as color from '../utils/Theme';

const Tabbar = TabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: '首页',
			tabBarIcon: ({tintColor}) => {
				return (
					<Image
						source={require('../../res/img/home/home.png')}
						style={{
                        width: 24,
                        height: 24,
                        tintColor: tintColor,
                    }}/>
				)
			},
		},
	},
	Top: {
		screen: Top,
		navigationOptions: {
			tabBarLabel: '榜单',
			tabBarIcon: ({tintColor}) => {
				return (
					<Image
						source={require('../../res/img/home/top.png')}
						style={{
                        width: 24,
                        height: 24,
                        tintColor: tintColor,
                    }}/>
				)
			},
		},
	},
	Moments: {
		screen: Moments,
		navigationOptions: {
			tabBarLabel: '动态',
			tabBarIcon: ({tintColor}) => {
				return (
					<Image
						source={require('../../res/img/home/recommend.png')}
						style={{
                        width: 24,
                        height: 24,
                        tintColor: tintColor,
                    }}/>
				)
			},
		},
	},
	Me: {
		screen: Me,
		navigationOptions: {
			tabBarLabel: '我的',
			tabBarIcon: ({tintColor}) => {
				return (
					<Image
						source={require('../../res/img/home/me.png')}
						style={{
                        width: 24,
                        height: 24,
                        tintColor: tintColor,
                    }}/>
				)
			},
		},
	}
}, {
	initialRouteName: 'Moments',
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	animationEnabled: false,
	lazy: true,
	backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
	tabBarOptions: {
		// ios or android
		style: {
			height: 50,
			backgroundColor:color.themeWhite,
			borderTopWidth:1,
			borderTopColor:color.themeLine,
		},
		activeTintColor: color.themeRed, // label和icon的前景色 活跃状态下（选中）。
		inactiveTintColor: color.themeGray, // label和icon的前景色 不活跃状态下(未选中)。
		labelStyle:{margin: 0,fontSize:10},

		// ios
		inactiveBackgroundColor: color.themeWhite,
		activeBackgroundColor: color.themeWhite,

		// android
		showIcon: true,
		pressColor:color.themeRed,
		iconStyle: {margin: 0,},  // 比iOS多了一个属性
		indicatorStyle: {height: 0}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
	},
});


export default Tabbar;
