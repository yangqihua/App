import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
} from 'react-native';

import * as font from '../../constants/WHCFont';

class MyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const click = this.props.click;
        return (
            <TouchableHighlight onPress = {click}>
                <View style = {styles.header}>
                    <Image style = {styles.userImg} source = {require('../../images/tmp_user_icon3.png')}/>
                    <View style = {styles.userNameView}>
                        <Text style = {styles.titleText} numberOfLines = {1}>{'杨启华'}</Text>
                        <Text style = {styles.detailText} numberOfLines = {1}>{'18428360735'}</Text>
                    </View>
                    <Image style = {styles.arrowImg} source = {require('../../images/right_arrow_icon.png')}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    userImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    userNameView: {
        marginLeft: 15,
        flexDirection: 'column',
        flexGrow: 1,
        height: 50,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: font.themeBlack,
        flexGrow: 1,
    },
    detailText: {
        fontSize: 14,
        color: 'gray',
    },
    arrowImg: {
        width: 18,
        height: 18,
        marginLeft: 15,
    },
});

export default MyHeader;
