import React, {Component} from 'react';
import {View,StatusBar} from 'react-native'
import AppNavigation from "./containers/Navigation";
export default class App extends Component<{}> {
	render() {
		return (
				<AppNavigation/>
		);
	}
}
