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

import Home from '../pages/home/Home';
import Community from '../pages/community/Community';
import My from '../pages/my/My';

import * as font from '../constants/WHCFont';

const Tabbar = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => {
                return(
                <Image
                    source = {require('../images/home_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    },
    Community: {
        screen: Community,
        navigationOptions: {
            tabBarLabel: '社区',
            tabBarIcon: ({tintColor}) => {
                return (
                <Image
                    source = {require('../images/community_normal_icon.png')}
                    style = {{
                        width: 20,
                        height: 20,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => {
                return (
                <Image
                    source = {require('../images/my_normal_icon.png')}
                    style = {{
                        width: 25,
                        height: 25,
                        tintColor: tintColor,
                    }}></Image>
            )},
        },
    }}, {
	initialRouteName:'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
	lazy:false,
	backBehavior:'none',
    tabBarOptions: {
    	// ios or android
        style: {
            height: 49,
        },
        activeTintColor: font.themeColor,

	    // ios
        inactiveTintColor:font.themeBlack,
        inactiveBackgroundColor:'white',
        activeBackgroundColor: '#fff',

	    // android
	    showIcon:true,
	    iconStyle:{
            margin:0,
	    },
	    indicatorStyle:{height:0},
    },
});



export default Tabbar;
