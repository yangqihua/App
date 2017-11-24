/**
 *
 * Copyright 2017-present whcapp
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * https://github.com/netyouli/whcapp
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {
	Image,

} from 'react-native';

import HomeBack from '../pages/homeback/Home';
import My from '../pages/my/My';


import Home from '../pages/home/Home';
import Recommend from '../pages/home/Recommend';
import Top from '../pages/home/Top';
import Me from '../pages/home/Me';

import * as font from '../constants/WHCFont';
import * as color from '../utils/theme';

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
                    }}></Image>
				)
			},
		},
	},
	Recommend: {
		screen: Recommend,
		navigationOptions: {
			tabBarLabel: '每周推荐',
			tabBarIcon: ({tintColor}) => {
				return (
					<Image
						source={require('../../res/img/home/recommend.png')}
						style={{
                        width: 24,
                        height: 24,
                        tintColor: tintColor,
                    }}></Image>
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
                    }}></Image>
				)
			},
		},
	},
	Me: {
		screen: My,
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
                    }}></Image>
				)
			},
		},
	}
}, {
	initialRouteName: 'Home',
	tabBarPosition: 'bottom',
	swipeEnabled: false,
	animationEnabled: false,
	lazy: false,
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
		labelStyle:{margin: 0,fontSize:12},

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
