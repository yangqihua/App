import {
	Platform,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Launch from '../pages/launch/Launch';
import Tabbar from './Tabbar';
import Blank from '../pages/blank/Blank';
import Webv from '../pages/webview/Webv';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import * as color from '../utils/Theme';

import GoodsDetails from '../pages/goods/Details';

const AppNavigation = StackNavigator(
	{
		Launch: {
			screen: Launch,
		},
		Tabbar: {
			screen: Tabbar,
		},
		GoodsDetails: {
			screen: GoodsDetails,
		},
		Blank: {
			screen: Blank,
		},
		Webv: {
			screen: Webv,
		},
	},
	{
		initialRouteName: 'Launch', // 默认显示界面
		navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
			headerBackTitle: '返回',  // 左上角返回键文字
			headerStyle: {
				height: 48,
				backgroundColor: color.themeRed,
				elevation: 0,
				borderBottomWidth: 0
			},
			headerTitleStyle: {
				fontSize: 18,
				color: 'mintcream',
				alignSelf: 'center'
			},
			// headerRight:{},
			gesturesEnabled: true,
			// gestureResponseDistance:{horizontal:25,vertical:0},
		},
		// mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
		headerMode: 'screen', // 导航栏的显示模式, float: 有渐变透明效果, screen: 无透明效果, none: 隐藏导航栏
		transitionConfig: () => ({
			// 只要修改最后的forVertical就可以实现不同的动画了。
			screenInterpolator: CardStackStyleInterpolator.forHorizontal,
		}),
		onTransitionStart: () => {
			console.log('导航栏切换开始');
		},  // 回调
		onTransitionEnd: () => {
			console.log('导航栏切换结束');
		}  // 回调

	}
);
export default AppNavigation;
